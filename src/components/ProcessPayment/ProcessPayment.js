import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import SimpleCardForm from "./SimpleCardForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Ie10mDWOUucKSNMrDXbOP1RPgKmqH8EHCg0c0EDzaZfmOob62iOkUJCETtFjZ4xd4nJXCUtj53E8leCEVSqacEE00j6uSPWKb"
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default ProcessPayment;
