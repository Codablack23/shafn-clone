import React, { useEffect, useLayoutEffect, useState } from "react";
import { getCart } from "~/store/cart/action";
import { useDispatch } from "react-redux";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPFormCheckout from "~/wp-components/shared/forms/WPFormCheckout";
import { scrollPageToTop } from "~/utilities/common-helpers";
import Router from "next/router";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const [auth, setAuth] = useState(null);
    useLayoutEffect(() => {
        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

        setAuth(auth);

        if (!auth.isLoggedIn) {
            Router.push("/account/login");
        }
    }, []);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Checkout">
                <div className="ps-page--simple">
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            {/* <div className="ps-section__header">
                            <h1>Checkout Information</h1>
                        </div> */}
                            <div className="ps-section__content">
                                {auth?.isLoggedIn && <WPFormCheckout />}
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

export default CheckoutPage;
