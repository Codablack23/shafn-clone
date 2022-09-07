import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Addresses from "~/components/partials/account/Addresses";
import WPLayout from "~/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "~/utilities/common-helpers";

const MyAccountPage = () => {
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.isLoggedIn) {
            Router.push("/account/login");
        }
    }, []);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Address">
                <div className="ps-page--my-account">
                    <Addresses />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
