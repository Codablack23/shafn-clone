import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import EditBillingAddress from "~/components/partials/account/EditBillingAddress";
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
                    <EditBillingAddress />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
