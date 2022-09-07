import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import { scrollPageToTop } from "~/utilities/common-helpers";

import WPLayout from "~/wp-components/layouts/WPLayout";
import Orders from "~/components/partials/account/Orders";

const MyOrders = () => {
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.isLoggedIn) {
            Router.push("/account/login");
        }
    }, []);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout>
                <div className="ps-page--my-account">
                    <Orders />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyOrders;
