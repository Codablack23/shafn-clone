"use client";
import React, { useEffect } from "react";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPFormCheckout from "~/wp-components/shared/forms/WPFormCheckout";
import { scrollPageToTop } from "~/utilities/common-helpers";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/redux-store/hooks";
import CheckoutForm from "./components/CheckoutForm";
import { useRouter } from "next/navigation";




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutPage (){
    const router = useRouter();
    const { amount} = useAppSelector((state) => state.checkoutItems);
    const auth = useAppSelector(state=>state.auth)

    useEffect(() => {
        if(!auth.isLoggedIn) router.push("/account/login/?next=account/checkout")
    },[])

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Checkout">
                <div className="ps-page--simple">
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__content">
                                {<Elements
                                    options={{
                                        mode: "payment",
                                        amount: amount ? amount * 100:1000,
                                        currency: "usd",
                                    }}
                                    stripe={stripePromise}>
                                        <CheckoutForm/>
                                    </Elements>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

