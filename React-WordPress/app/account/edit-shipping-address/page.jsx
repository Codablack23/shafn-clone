"use client";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import EditShippingAddress from "@/app/components/partials/account/EditShippingAddress";
import { scrollPageToTop } from "@/utilities/common-helpers";

import WPLayout from "@/wp-components/layouts/WPLayout";

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
            <WPLayout>
                <div className="ps-page--my-account">
                    <EditShippingAddress />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
