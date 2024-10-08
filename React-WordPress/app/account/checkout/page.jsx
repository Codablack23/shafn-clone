"use client";
import React, { useEffect, useState } from "react";
import { getCart } from "~/store/cart/action";
import { useDispatch, connect } from "react-redux";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPFormCheckout from "~/wp-components/shared/forms/WPFormCheckout";
import { scrollPageToTop } from "~/utilities/common-helpers";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WPPaymentRepository from "~/repositories/WP/WPPaymentRepository";
import { Spin } from "antd";
import { useAppSelector } from "@/redux-store/hooks";
import useAuth from "@/redux-store/hooks/useAuth";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
).catch((error) => {
    console.log("error loading stripe");
    console.error(error);
    return;
});

export default function CheckoutPage (){
    // const dispatch = useDispatch();
    const {authState:auth} = useAuth()
    const {amount} = useAppSelector(state=>state.checkoutItems)
    const [loading,setLoading] = useState(true)
    const [paymentIntent, setPaymentIntent] = useState(null);

    const createPaymentIntent = async (user_email) => {
        const products = checkoutItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            images: item.images,
            quantity: item.quantity,
        }));
        const payload = {
            products,
            user_email,
            amount: amount * 100,
        };

        try {
            setLoading(true);
            const { data } = await WPPaymentRepository.createOrderSession(
                payload
            );
            setLoading(false);
            console.log(data);
            setPaymentIntent(data);

        } catch (error) {
            console.error(error);
            return;
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        // dispatch(getCart());
        if (auth.isLoggedIn && Number(amount) > 0) {
            createPaymentIntent(auth.email);
        }
    }, [auth]);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret: paymentIntent?.clientSecret,
        appearance,
    };

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Checkout">
                <div className="ps-page--simple">
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__content">
                                {
                                loading
                                ?<Spin />
                                :paymentIntent ? (
                                    <Elements
                                        options={options}
                                        stripe={stripePromise}>
                                        <WPFormCheckout
                                            {...props}
                                            order_session_id={
                                                paymentIntent.order_session_id
                                            }
                                            paymentIntentId={paymentIntent.id}
                                        />
                                    </Elements>
                                )
                                :null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

