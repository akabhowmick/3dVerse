import { z } from "zod";
import {
  calculateOrderTotal,
  centsToDollarString,
  type CaptureSummary,
  type OrderTotal,
} from "../../shared/pricing";
import { jsonResponse, paypalRequest, PayPalApiError, type PayPalOrder } from "./_shared/paypal";

const CaptureOrderSchema = z.object({ orderId: z.string().min(1) }).strict();

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." }, { Allow: "POST" });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid request." });
  }

  const parsed = CaptureOrderSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonResponse(400, { error: "Invalid request." });
  }
  const { orderId } = parsed.data;

  let order: PayPalOrder;
  try {
    order = await paypalRequest<PayPalOrder>(`/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
      method: "GET",
    });
  } catch (error) {
    logPaypalError("order lookup", error);
    return jsonResponse(502, { error: "Unable to verify payment. Please try again." });
  }

  // Reconstruct the order's items from PayPal's own stored data (sku +
  // quantity, set at create time) and recompute the authoritative total
  // ourselves -- there is no order database, so PayPal's stored order is the
  // only durable record between create and capture.
  const purchaseUnit = order.purchase_units[0];
  const orderItems = (purchaseUnit?.items ?? []).map((item) => ({
    id: item.sku,
    quantity: Number(item.quantity),
  }));

  let authoritative: OrderTotal;
  try {
    authoritative = calculateOrderTotal(orderItems);
  } catch (error) {
    console.error("capture-paypal-order: could not recompute total for order", orderId, error);
    return jsonResponse(409, { error: "Order could not be verified." });
  }

  const expectedValue = centsToDollarString(authoritative.totalCents);
  const amountMatches =
    purchaseUnit?.amount?.value === expectedValue &&
    purchaseUnit?.amount?.currency_code === authoritative.currency;

  if (!amountMatches) {
    console.error(
      "capture-paypal-order: amount mismatch, refusing to capture.",
      "orderId:",
      orderId,
      "paypalAmount:",
      purchaseUnit?.amount,
      "expected:",
      { value: expectedValue, currency_code: authoritative.currency }
    );
    return jsonResponse(409, { error: "Order could not be verified." });
  }

  if (order.status === "COMPLETED") {
    return jsonResponse(200, buildSummary(order, authoritative));
  }

  try {
    const captured = await paypalRequest<PayPalOrder>(
      `/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
      {
        method: "POST",
        body: {},
        // Derived deterministically from orderId so a retried or
        // double-submitted capture reuses the same idempotency key instead
        // of charging the customer twice.
        headers: { "PayPal-Request-Id": `capture-${orderId}` },
      }
    );
    return jsonResponse(200, buildSummary(captured, authoritative));
  } catch (error) {
    if (error instanceof PayPalApiError && isAlreadyCaptured(error)) {
      return jsonResponse(200, buildSummary(order, authoritative));
    }
    logPaypalError("capture", error);
    return jsonResponse(502, { error: "Payment could not be completed. Please try again." });
  }
};

function isAlreadyCaptured(error: PayPalApiError): boolean {
  const body = error.body as { details?: Array<{ issue?: string }> } | null;
  return Boolean(body?.details?.some((detail) => detail.issue === "ORDER_ALREADY_CAPTURED"));
}

function buildSummary(order: PayPalOrder, authoritative: OrderTotal): CaptureSummary {
  return {
    orderId: order.id,
    status: order.status,
    ...authoritative,
  };
}

function logPaypalError(context: string, error: unknown) {
  if (error instanceof PayPalApiError) {
    console.error(`capture-paypal-order: ${context} failed`, error.status, error.body);
  } else {
    console.error(`capture-paypal-order: ${context} failed`, error);
  }
}
