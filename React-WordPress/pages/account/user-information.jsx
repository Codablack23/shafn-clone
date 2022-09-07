import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import UserInformation from "~/components/partials/account/UserInformation";
import WPLayout from "~/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "~/utilities/common-helpers";

const UserInformationPage = () => {
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
                    <UserInformation />
                </div>
            </WPLayout>
        </div>
    );
};

export default UserInformationPage;
