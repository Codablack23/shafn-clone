import React from 'react';
import { notification } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

const OAuth = ({ onSuccess }) => {
    const handleOAth = (id, email, firstname = '', lastname = '') => {
        if (email) {
            onSuccess({ id, email, firstname, lastname });
        } else {
            notification['error']({
                message: 'Login failed!',
                description:
                    'Could not retrieve email from provider. Please fill the form to complete registration.',
            });
        }
    };

    return (
        <ul className="social-links">
            <GoogleLogin
                clientId={process.env.google_clientID}
                jsSrc="https://accounts.google.com/gsi/client"
                uxMode="redirect"
                onSuccess={(res) => {
                    const user = res.profileObj;
                    handleOAth(
                        user.googleId,
                        user.email,
                        user.givenName,
                        user.familyName
                    );
                }}
                onFailure={(error) => {
                    notification['error']({
                        message: 'Google login failed!',
                        description:
                            'Please check your network connectivity and try again!',
                    });
                }}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                    <li onClick={renderProps.onClick}>
                        <a className="google handles" href="#">
                            <span>
                                <img
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                    src="/icons/google.svg"
                                />
                            </span>
                            <span>Continue With Google</span>
                        </a>
                    </li>
                )}
            />

            <FacebookLogin
                appId={process.env.fb_appID}
                fields="name,email,picture"
                scope="email"
                callback={(res) => handleOAth(res.id, res?.email)}
                onFailure={(error) => {
                    notification['error']({
                        message: 'Facebook login failed!',
                        description:
                            'Please check your network connectivity and try again!',
                    });
                }}
                render={(renderProps) => (
                    <li onClick={renderProps.onClick}>
                        <a className="facebook handles" href="#">
                            <span>
                                <i className="fa fa-facebook w3-text-blue"></i>
                            </span>
                            <span>Continue With Facebook</span>
                        </a>
                    </li>
                )}
            />
        </ul>
    );
};

export default OAuth;
