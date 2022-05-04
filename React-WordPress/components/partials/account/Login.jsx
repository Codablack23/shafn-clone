import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { login } from '../../../store/auth/action';
import WPAuthRepository from '~/repositories/WP/WPAuthRepository';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { Form, Input, notification } from 'antd';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFeatureWillUpdate = () => {
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);

        let loginData = {
            username: email,
            password,
        };

        const dispatchLogin = () => {
            dispatch(login());
        };

        WPAuthRepository.login(loginData, dispatchLogin, setIsLoading);
    };

    useEffect(() => {
        const { gapi, loadAuth2 } = require('gapi-script');
        const loadGoogleAuth = async () => {
            let auth2 = await loadAuth2(gapi, process.env.google_clientID, '');
        };

        loadGoogleAuth();
    }, []);

    return (
        <div className="ps-my-account" style={{ paddingTop: 10 }}>
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleSubmit}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/login">
                                <a>ShafN</a>
                            </Link>
                        </li>
                    </ul>
                    <div
                        className="ps-tab active"
                        id="sign-in"
                        style={{ boxShadow: '0px 0px 10px #cdcdcd' }}>
                        <div className="ps-form__content">
                            <h5>Sign In</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input
                                        name="password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                    />
                                    <label htmlFor="remember-me">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    style={{
                                        borderRadius: '15px',
                                    }}>
                                    {isLoading ? (
                                        <img
                                            src={require('../../../public/static/img/Interwind-loader.svg')}
                                            alt="Loading..."
                                            width={50}
                                            height={30}
                                        />
                                    ) : (
                                        'Continue'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <div className="or">
                                <hr />
                                <p>OR</p>
                                <hr />
                            </div>
                            <ul className="social-links">
                                <GoogleLogin
                                    clientId={process.env.google_clientID}
                                    jsSrc="https://accounts.google.com/gsi/client"
                                    uxMode="redirect"
                                    onSuccess={(res) => {
                                        console.log('Google_Result: ');
                                        console.log(res.profileObj);
                                    }}
                                    onFailure={(res) => {
                                        console.log('Google_Failure: ');
                                        console.log(res);
                                    }}
                                    cookiePolicy={'single_host_origin'}
                                    render={(renderProps) => (
                                        <li onClick={renderProps.onClick}>
                                            <a
                                                className="google handles"
                                                href="#">
                                                <span>
                                                    <img
                                                        style={{
                                                            objectFit:
                                                                'contain',
                                                        }}
                                                        src="/icons/google.svg"
                                                    />
                                                </span>
                                                <span>
                                                    Continue With Google
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                />

                                <FacebookLogin
                                    appId={process.env.fb_appID}
                                    fields="name,email,picture"
                                    callback={(res) => {
                                        console.log('FB_Result: ');
                                        console.log(res);
                                    }}
                                    render={(renderProps) => (
                                        <li onClick={renderProps.onClick}>
                                            <a
                                                className="facebook handles"
                                                href="#">
                                                <span>
                                                    <i className="fa fa-facebook w3-text-blue"></i>
                                                </span>
                                                <span>
                                                    Continue With Facebook
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                />

                                {/* <li>
                                    <a
                                        className="twitter"
                                        href="#"
                                        onClick={handleFeatureWillUpdate}>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="#"
                                        onClick={handleFeatureWillUpdate}>
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
