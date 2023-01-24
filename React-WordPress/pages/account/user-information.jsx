import React, { useLayoutEffect } from "react";
import { useSelector, connect } from "react-redux";
import Router from "next/router";
import UserInformation from "~/components/partials/account/UserInformation";
import WPLayout from "~/wp-components/layouts/WPLayout";
import { scrollPageToTop } from "~/utilities/common-helpers";

const UserInformationPage = (props) => {
    const { auth } = props;

    useLayoutEffect(() => {
        console.log(auth.isLoggedIn);
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

export default connect((state) => state)(UserInformationPage);
