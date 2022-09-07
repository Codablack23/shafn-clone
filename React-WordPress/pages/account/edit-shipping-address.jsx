import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import EditShippingAddress from "~/components/partials/account/EditShippingAddress";
import { scrollPageToTop } from "~/utilities/common-helpers";

import WPLayout from "~/wp-components/layouts/WPLayout";

const MyAccountPage = () => {
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
                    <EditShippingAddress />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
