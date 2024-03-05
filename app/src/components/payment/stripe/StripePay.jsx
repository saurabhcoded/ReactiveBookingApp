import React from "react";
import Payment from "./Payment";

export const StripePay = () => {
  const [stripePromise, setStripePromise] = React.useState(null);

  React.useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  return (
    <div>
      <Payment stripePromise={stripePromise} />
    </div>
  );
};
