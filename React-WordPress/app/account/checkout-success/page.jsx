"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WPLayout from "@/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "@/utilities/common-helpers";
import { clearCheckoutItems } from "@/store/checkout-items/action";
import { removeItems } from "@/store/cart/action";
import { loadStripe } from "@stripe/stripe-js";
import { Spin } from "antd";
import { useRouter } from "next/router";

//make this function a default export
//export default function WPProductDetailPage({pid}){


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
).catch((error) => {
    console.log("error loading stripe");
    console.error(error);
    return;
});

export default function CheckoutSuccessPage(){
    const dispatch = useDispatch();

    const [orderNumber, setOrderNumber] = useState("");

    useEffect(() => {
        (async () => {
            const stripe = await stripePromise;
            if (!stripe) {
                return;
            }

            const clientSecret = new URLSearchParams(
                window.location.search
            ).get("payment_intent_client_secret");
            const order_number = new URLSearchParams(
                window.location.search
            ).get("order_number");

            if (!clientSecret) {
                return;
            }

            stripe
                .retrievePaymentIntent(clientSecret)
                .then(({ paymentIntent }) => {
                    switch (paymentIntent.status) {
                        case "succeeded": {
                            let checkoutItems = JSON.parse(
                                JSON.parse(
                                    localStorage.getItem("persist:martfury")
                                ).checkoutItems
                            );
                            setOrderNumber(order_number);
                            dispatch(clearCheckoutItems());
                            dispatch(removeItems(checkoutItems));
                            break;
                        }
                        case "processing":
                            console.log("Your payment is processing.");
                            break;
                        case "requires_payment_method":
                            console.log(
                                "Your payment was not successful, please try again."
                            );
                            break;
                        default:
                            console.log("Something went wrong.");
                            break;
                    }
                });
        })();
    }, [stripePromise]);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Checkout">
                <div className="ps-page--simple">
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Checkout Success</h1>
                                <p>Thank you. Your order has been received</p>
                                <p>
                                    Your order number is
                                    {orderNumber ? (
                                        <strong> {orderNumber}</strong>
                                    ) : (
                                        <Spin style={{ marginLeft: 5 }} />
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

