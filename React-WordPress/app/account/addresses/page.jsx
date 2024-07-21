"use client";

import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Addresses from "~/app/components/partials/account/Addresses";
import WPLayout from "~/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "~/utilities/common-helpers";

const MyAccountPage = () => {
    const auth = useSelector((state) => state.auth);

    useLayoutEffect(() => {
        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

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
