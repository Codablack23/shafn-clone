import React, { useEffect, useState } from "react";
import { getCart } from "~/store/cart/action";
import { useDispatch, connect } from "react-redux";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPFormCheckout from "~/wp-components/shared/forms/WPFormCheckout";
import { scrollPageToTop } from "~/utilities/common-helpers";
import Router from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WPPaymentRepository from "~/repositories/WP/WPPaymentRepository";
import { Spin } from "antd";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = (props) => {
    const dispatch = useDispatch();

    const [paymentIntent, setPaymentIntent] = useState(null);

    const createPaymentIntent = async () => {
        const TX_FEE = 20;
        const data = await WPPaymentRepository.createPaymentIntent({
            amount: Math.floor(Number(props.amount) + TX_FEE) * 100,
        });

        setPaymentIntent(data);
    };

    useEffect(() => {
        dispatch(getCart());

        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

        if (auth.isLoggedIn) {
            createPaymentIntent();
        }
    }, [dispatch]);

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
                                {paymentIntent ? (
                                    <Elements
                                        options={options}
                                        stripe={stripePromise}>
                                        <WPFormCheckout
                                            {...props}
                                            paymentIntentId={paymentIntent.id}
                                        />
                                    </Elements>
                                ) : (
                                    <Spin />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        ...state.checkoutItems,
    };
};

export default connect(mapStateToProps)(CheckoutPage);
