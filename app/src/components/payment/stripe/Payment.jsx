import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Typography } from "@mui/material";

function Payment(props) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent")
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, []);

  return (
    <>
      <Typography>Payment</Typography>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
