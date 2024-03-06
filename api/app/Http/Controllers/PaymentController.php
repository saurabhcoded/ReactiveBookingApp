<?php

namespace App\Http\Controllers;

use ErrorException;
use Illuminate\Http\Request;
use Stripe\Stripe;

class PaymentController extends Controller
{
    function __construct()
    {
    }
    // public function createPaymentIntent(){
    public function checkout(Request $request)
    {
        $StripeSecretKey = env('STRIPE_SECRET_KEY');
        \Stripe\Stripe::setApiKey($StripeSecretKey);

        $productname = "Web Development Service";
        $totalprice = 200;
        $two0 = "00";
        $total = "$totalprice$two0";

        $session = \Stripe\Checkout\Session::create([
            'line_items'  => [
                [
                    'price_data' => [
                        'currency'     => 'inr',
                        'product_data' => [
                            "name" => $productname,
                        ],
                        'unit_amount'  => $total,
                    ],
                    'quantity'   => 1,
                ],

            ],
            'mode'        => 'payment',
            'success_url' => "http://localhost:3000/success",
            'cancel_url'  => "http://localhost:3000/cancel",
            "payment_method_configuration" => "pmc_1OrP3ESCczyIOc4wvRHTzxg0"
        ]);

        return apiResponse('Payment Session Created', 'success', 200, ["checkoutUrl" => $session->url]);
    }
}
