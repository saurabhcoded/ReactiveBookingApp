import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import AxiosAPI from "@/_services/axiosInstance";

function Payment(props) {
  let stripePKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    AxiosAPI.get("/payment/create-payment-intent")
      .then((res) => {
        console.log("Response..", res?.data?.data?.clientSecret);
        let ClientSecret = res?.data?.data?.clientSecret;
        if (res.status === "success" && ClientSecret) {
          setClientSecret(res.data.clientSecret);
        }
      })
      .catch((err) => console.error("Error..", err));
  }, []);

  return (
    <>
      <Typography>Payment Page</Typography>
      {clientSecret && (
        <Elements stripe={loadStripe(stripePKey)} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
