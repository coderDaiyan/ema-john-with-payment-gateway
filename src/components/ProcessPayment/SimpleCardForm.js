import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import swal from "sweetalert";
import "./CardForm.css";

const SimpleCardForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      paymentError && swal("Oh noes!", paymentError, "error");
    } else {
      setPaymentError(null);
      !paymentError && swal("YAY!", "Payment Successful", "success");
      handlePayment(paymentMethod.id);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="hidden" name="token" />
      <div class="group">
        <label>
          <CardElement className="field" />
        </label>
      </div>
      <button className="stripe-btn" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default SimpleCardForm;
