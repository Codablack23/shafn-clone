import React, { useLayoutEffect } from "react";
import Router from "next/router";
import UserInformation from "~/components/partials/account/UserInformation";
import WPLayout from "~/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "~/utilities/common-helpers";

const UserInformationPage = () => {
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
                    <UserInformation />
                </div>
            </WPLayout>
        </div>
    );
};

export default UserInformationPage;
