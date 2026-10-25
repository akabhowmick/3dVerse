import * as React from "react";
import "./Checkout.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { Shipping } from "../Shipping/Shipping";
import { Payment } from "../Payment/Payment";
import Review from "../Review/Review";
import type { CaptureSummary } from "../../../../shared/pricing";
import { PageHero } from "../../PageHero/PageHero";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  // The confirmation email and the order-summary screen must reflect what
  // the server actually captured, not cart state -- this is set once from
  // the capture function's response and never from anything computed
  // client-side.
  const [orderSummary, setOrderSummary] = React.useState<CaptureSummary | null>(null);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Shipping handleNext={handleNext} />;
      case 1:
        return <Payment handleNext={handleNext} onCaptureSuccess={setOrderSummary} />;
      case 2:
        return <Review orderSummary={orderSummary} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <PageHero kicker="Almost there" title="Checkout" />
      <Container component="div" maxWidth="sm" sx={{ mb: 4 }} id="checkout-container">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 4 } }}>
          <Stepper id="check-out-stepper" activeStep={activeStep} sx={{ pt: 1, pb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your order confirmation, and will send you an update when your
                order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </Paper>
      </Container>
    </>
  );
}
