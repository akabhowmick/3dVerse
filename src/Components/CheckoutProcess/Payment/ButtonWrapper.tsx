import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({
  amount,
  currency,
  showSpinner,
  setPaymentSuccess,
}: {
  amount: number;
  currency: string;
  showSpinner: boolean;
  setPaymentSuccess: (value: boolean) => void;
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={async (_data, actions) => {
          const orderId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount.toString(),
                },
              },
            ],
          });
          return orderId;
        }}
        onApprove={async function (data, actions) {
          await actions.order?.capture();
          if (data) {
            setPaymentSuccess(true);
          }
        }}
      />
    </>
  );
};

export default ButtonWrapper;
