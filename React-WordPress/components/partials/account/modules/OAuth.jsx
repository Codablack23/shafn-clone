import React, { useEffect } from "react";
import { notification } from "antd";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

const OAuth = ({ onSuccess }) => {
    const handleOnSuccess = (id, email, firstname = "", lastname = "") => {
        if (email) {
            onSuccess({ id, email, firstname, lastname });
        } else {
            notification["error"]({
                message: "Login failed!",
                description:
                    "Could not retrieve email from provider. Please fill the form to complete registration.",
            });
        }
    };

    useEffect(() => {
        const { gapi, loadAuth2 } = require("gapi-script");
        const loadGoogleAuth = async () => {
            await loadAuth2(gapi, process.env.NEXT_PUBLIC_GOOGLE_CLIENTID, "");
        };

        loadGoogleAuth();
    }, []);

    return (
        <ul className="social-links">
            <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}
                jsSrc="https://accounts.google.com/gsi/client"
                uxMode="redirect"
                onSuccess={(res) => {
                    const user = res.profileObj;
                    handleOnSuccess(
                        user.googleId,
                        user.email,
                        user.givenName,
                        user.familyName
                    );
                }}
                onFailure={({ error }) => {
                    if (error !== "popup_closed_by_user") {
                        notification["error"]({
                            message: "Google login failed!",
                            description:
                                "Please check your network connectivity and try again!",
                        });
                    }
                }}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                    <li
                        onClick={renderProps.onClick}
                        style={{ cursor: "pointer" }}>
                        <a className="google handles">
                            <span>
                                <img
                                    style={{
                                        objectFit: "contain",
                                    }}
                                    src="/icons/google.svg"
                                />
                            </span>
                            <span>Continue With Google</span>
                        </a>
                    </li>
                )}
            />

            {/* <FacebookLogin
                appId={process.env.FACEBOOK_APPID}
                fields="name,email,picture"
                scope="email"
                callback={(res) => {
                    handleOnSuccess(res.id, res?.email);
                }}
                onFailure={(error) => {
                    notification["error"]({
                        message: "Facebook login failed!",
                        description:
                            "Please check your network connectivity and try again!",
                    });
                }}
                render={(renderProps) => (
                    <li
                        onClick={renderProps.onClick}
                        style={{ cursor: "pointer" }}>
                        <a className="facebook handles">
                            <span>
                                <i className="fa fa-facebook w3-text-blue"></i>
                            </span>
                            <span>Continue With Facebook</span>
                        </a>
                    </li>
                )}
            /> */}
        </ul>
    );
};

export default OAuth;
