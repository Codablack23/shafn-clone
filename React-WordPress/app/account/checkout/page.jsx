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

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
).catch((error) => {
    console.log("error loading stripe");
    console.error(error);
    return;
});

const CheckoutPage = (props) => {
    const dispatch = useDispatch();

    const [paymentIntent, setPaymentIntent] = useState(null);

    const createPaymentIntent = async (user_email) => {
        const products = props.checkoutItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            images: item.images,
            quantity: item.quantity,
        }));
        const payload = {
            products,
            user_email,
            amount: Math.floor(Number(props.amount) * 100),
        };

        try {
            const { data } = await WPPaymentRepository.createOrderSession(
                payload
            );

            setPaymentIntent(data);
        } catch (error) {
            console.log("error creating order session");
            console.error(error);
            return;
        }
    };

    useEffect(() => {
        dispatch(getCart());

        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

        if (auth.isLoggedIn && Number(props.amount) > 0) {
            createPaymentIntent(auth.email);
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
                                            order_session_id={
                                                paymentIntent.order_session_id
                                            }
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
