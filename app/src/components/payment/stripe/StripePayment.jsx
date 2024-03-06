import AxiosAPI from "@/_services/axiosInstance";
import { Button } from "@mui/material";
import React from "react";

const StripePayment = () => {
  const handleStripePayment = async () => {
    const paymentUrl = await AxiosAPI.get("/payment/createSession");
    console.log("paymentUrl", paymentUrl);
  };
  return (
    <div>
      <Button onClick={handleStripePayment}>Pay with Stripe</Button>
    </div>
  );
};

export default StripePayment;
