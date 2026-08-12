import { z } from "zod";
import {
  calculateOrderTotal,
  centsToDollarString,
  MAX_QUANTITY_PER_ITEM,
  type OrderTotal,
} from "../../shared/pricing";
import { jsonResponse, paypalRequest, PayPalApiError, type PayPalOrderItem } from "./_shared/paypal";

// Deliberately .strict() at every level: an extra price/amount/total/currency
// field anywhere in the body must fail validation rather than be silently
// dropped, since a client that includes one of those fields is exactly the
// tampering attempt this endpoint exists to reject.
const CreateOrderSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            id: z.string().min(1),
            quantity: z.number().int().min(1).max(MAX_QUANTITY_PER_ITEM),
          })
          .strict()
      )
      .min(1),
  })
  .strict();

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

  const parsed = CreateOrderSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonResponse(400, { error: "Invalid request." });
  }

  let orderTotal: OrderTotal;
  try {
    orderTotal = calculateOrderTotal(parsed.data.items);
  } catch {
    return jsonResponse(400, { error: "Invalid request." });
  }

  const items: PayPalOrderItem[] = orderTotal.items.map((line) => ({
    name: line.name.slice(0, 127),
    sku: line.id,
    quantity: String(line.quantity),
    unit_amount: {
      currency_code: orderTotal.currency,
      value: centsToDollarString(line.unitPriceCents),
    },
    category: "PHYSICAL_GOODS",
  }));

  try {
    const order = await paypalRequest<{ id: string }>("/v2/checkout/orders", {
      method: "POST",
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: orderTotal.currency,
              value: centsToDollarString(orderTotal.totalCents),
              breakdown: {
                item_total: {
                  currency_code: orderTotal.currency,
                  value: centsToDollarString(orderTotal.subtotalCents),
                },
                tax_total: {
                  currency_code: orderTotal.currency,
                  value: centsToDollarString(orderTotal.taxCents),
                },
                shipping: {
                  currency_code: orderTotal.currency,
                  value: centsToDollarString(orderTotal.shippingCents),
                },
              },
            },
            items,
          },
        ],
      },
    });

    return jsonResponse(200, { orderId: order.id });
  } catch (error) {
    if (error instanceof PayPalApiError) {
      console.error("create-paypal-order: PayPal request failed", error.status, error.body);
    } else {
      console.error("create-paypal-order: unexpected error", error);
    }
    return jsonResponse(502, { error: "Unable to start payment. Please try again." });
  }
};
