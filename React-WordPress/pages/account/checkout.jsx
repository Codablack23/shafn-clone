import React, { useEffect } from "react";
import { getCart } from "~/store/cart/action";
import { connect, useDispatch, useSelector } from "react-redux";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPFormCheckout from "~/wp-components/shared/forms/WPFormCheckout";
import { scrollPageToTop } from "~/utilities/common-helpers";
import Router from "next/router";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    if (!auth.isLoggedIn) {
        Router.push("/account/login");
    }

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
                                {auth.isLoggedIn && <WPFormCheckout />}
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

export default CheckoutPage;
