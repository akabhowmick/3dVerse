import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import type { Product } from "../../../Types/interfaces";
import type { CaptureSummary } from "../../../../shared/pricing";
const style = { layout: "vertical" };

const GENERIC_PAYMENT_ERROR =
  "We couldn't process your payment. Please try again, or contact us if the problem continues.";

const showPaymentError = (text: string = GENERIC_PAYMENT_ERROR) => {
  Swal.fire({ icon: "error", title: "Payment failed", text });
};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({
  cartItems,
  currency,
  showSpinner,
  setPaymentSuccess,
  onCaptureSuccess,
}: {
  cartItems: Product[];
  currency: string;
  showSpinner: boolean;
  setPaymentSuccess: (value: boolean) => void;
  onCaptureSuccess: (summary: CaptureSummary) => void;
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // options and dispatch are intentionally omitted: including options would
    // create an infinite loop, since dispatch("resetOptions") replaces options.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        disabled={false}
        forceReRender={[currency, style]}
        fundingSource={undefined}
        createOrder={async () => {
          const items = cartItems
            .filter((item): item is Product & { skuId: string } => typeof item.skuId === "string")
            .map((item) => ({ id: item.skuId, quantity: item.quantity }));

          let response: Response;
          try {
            response = await fetch("/.netlify/functions/create-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items }),
            });
          } catch {
            showPaymentError("We couldn't reach the payment server. Please check your connection and try again.");
            throw new Error("create-order-network-error");
          }

          if (!response.ok) {
            showPaymentError();
            throw new Error("create-order-failed");
          }

          const data = (await response.json()) as { orderId: string };
          return data.orderId;
        }}
        onApprove={async (data) => {
          let response: Response;
          try {
            response = await fetch("/.netlify/functions/capture-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
          } catch {
            showPaymentError("We couldn't reach the payment server. Please check your connection and try again.");
            return;
          }

          if (!response.ok) {
            showPaymentError();
            return;
          }

          const summary = (await response.json()) as CaptureSummary;
          onCaptureSuccess(summary);
          setPaymentSuccess(true);
        }}
        onCancel={() => {
          Swal.fire({
            icon: "info",
            title: "Payment cancelled",
            text: "Your payment was cancelled. No charge was made.",
          });
        }}
        onError={() => {
          showPaymentError();
        }}
      />
    </>
  );
};

export default ButtonWrapper;
