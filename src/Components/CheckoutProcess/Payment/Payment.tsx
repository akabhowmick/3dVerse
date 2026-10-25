import { MouseEvent, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "./ButtonWrapper.js";
import { useCartContext } from "../../../providers/CartProvider.js";
import { Button } from "@mui/material";
import { paypalClientId } from "../../../utils/config";
import "../Checkout/Checkout.css";
import Swal from "sweetalert2";
import type { CaptureSummary } from "../../../../shared/pricing";

export const Payment = ({
  handleNext,
  onCaptureSuccess,
}: {
  handleNext: () => void;
  onCaptureSuccess: (summary: CaptureSummary) => void;
}) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { cartItems, finalTotal } = useCartContext();
  const currency = "USD";

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (paymentSuccess) {
      handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Payment failed!",
      });
    }
  };

  return (
    <div>
      <div className="payment-info">
        <h2 className="page-title">Payment</h2>
        <p className="payment-estimated-total">Estimated total: ${finalTotal.toFixed(2)}</p>
        <div className="paypal-buttons">
          <h3>Complete the payment!</h3>
          <p className="policy-note">
            By paying, you agree to our <a href="/terms">Terms of Service</a> and{" "}
            <a href="/shipping-returns">Shipping &amp; Returns</a> policy. Custom pieces can&rsquo;t
            be returned, but production defects are replaced free. See our{" "}
            <a href="/privacy">Privacy Policy</a> for how we use your information.
          </p>
          <PayPalScriptProvider
            options={{
              clientId: paypalClientId,
              components: "buttons",
              currency: "USD",
            }}
          >
            <ButtonWrapper
              cartItems={cartItems}
              currency={currency}
              showSpinner={true}
              setPaymentSuccess={() => setPaymentSuccess(true)}
              onCaptureSuccess={onCaptureSuccess}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleNextClick(e)}
      >
        Next
      </Button>
    </div>
  );
};
