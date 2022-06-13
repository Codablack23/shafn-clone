import React, { useState } from 'react';
import Link from 'next/link';
import { login } from '../../../store/auth/action';
import WPAuthRepository from '~/repositories/WP/WPAuthRepository';
import OAuth from './modules/OAuth';
import ReactHtmlParser from 'react-html-parser';

import { Form, Input, notification } from 'antd';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const [passVisibility, setPassVisibility] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function togglePasswordVisibilty() {
        let e = document.querySelector('.passVis');
        e.classList.toggle('bi-eye-fill');
        e.classList.toggle('bi-eye-slash-fill');
        setPassVisibility((prev) => !prev);
    }

    const handleLogin = async (type = 'form', oauth) => {
        setIsLoading(true);

        if (!isLoading) {
            let user = {
                username: email,
                password,
            };

            if (type === 'oauth') {
                user = {
                    username: oauth.email,
                    password: oauth.password,
                };
            }

            try {
                const _user = await WPAuthRepository.login(user);

                const role = _user.user_role[0].toLowerCase();

                if (role === 'customer') {
                    dispatch(
                        login({ email: _user.user_email, token: _user.token })
                    );
                    Router.push('/');
                }

                if (role === 'seller') {
                    window.location.assign(
                        `http://localhost:5500/${_user.token}`
                    );
                }
                setIsLoading(false);
            } catch (error) {
                handleError(error, 'Login Failed!');
            }
        }
    };

    const handleError = (error, message) => {
        notification['error']({
            message,
            description:
                error.response === undefined
                    ? ReactHtmlParser(String(error))
                    : ReactHtmlParser(error.response.data.message),
        });

        setIsLoading(false);
    };

    return (
        <div className="ps-my-account" style={{ paddingTop: 10 }}>
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active m-auto" style={style.head}>
                            <Link href="/account/login">
                               <img src="/static/img/logo_light.png" className='img-fluid' alt="" />
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
                                    <div className="form-control align-items-center d-flex justify-content-between">
                                        <input
                                            name="password"
                                            type={`${
                                                passVisibility
                                                    ? 'test'
                                                    : 'password'
                                            }`}
                                            placeholder="Password..."
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibilty}
                                            style={{
                                                border: 'none',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                background: 'none',
                                            }}>
                                            <i
                                                className="passVis bi bi-eye-fill"
                                                style={{
                                                    fontSize: '20px',
                                                }}></i>
                                        </button>
                                    </div>
                                </Form.Item>
                            </div>
                            <div className="form-group d-flex justify-content-between align-items-center">
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
                                <Link href={'/'}>
                                    <a>Forgot Password</a>
                                </Link>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    style={{
                                        borderRadius: '15px',
                                    }}
                                    disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Continue'}
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <div className="or">
                                <hr />
                                <p>OR</p>
                                <hr />
                            </div>
                            <OAuth
                                onSuccess={(user) =>
                                    handleLogin('oauth', {
                                        email: user.email,
                                        password: user.id,
                                    })
                                }
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
const style = {
    head:{
     maxWidth:"150px"
    }
 }