import AxiosAPI from "./axiosInstance";

export async function getStripeCheckoutUrl(payload) {
    const response = await AxiosAPI.get("/payment/stripe/checkout");
    console.log("Response", response);
    if (response.data.status === "success") {
        return response.data.data.checkoutUrl;
    }
}