import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { login } from '../../../store/auth/action';
import WPAuthRepository from '~/repositories/WP/WPAuthRepository';
import OAuth from './modules/OAuth';

import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

function Login() {
    
    const dispatch = useDispatch();
    const [passVisibility,setPassVisibility] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function togglePasswordVisibilty(){
        let e = document.querySelector('.passVis')
        e.classList.toggle("bi-eye-fill")
        e.classList.toggle("bi-eye-slash-fill")
        setPassVisibility(prev=>!prev)
     }

    const handleLogin = (type = 'form', oauth) => {
        setIsLoading(true);

        if (!isLoading) {
            let loginData = {
                username: email,
                password,
            };

            if (type === 'oauth') {
                loginData = {
                    username: oauth.email,
                    password: oauth.password,
                };
            }

            const dispatchLogin = (user) => {
                dispatch(login(user));
            };

            WPAuthRepository.login(loginData, dispatchLogin, setIsLoading);
        }
    };

    return (
        <div className="ps-my-account" style={{ paddingTop: 10 }}>
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleLogin}>
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
                                  <div className="form-control align-items-center d-flex justify-content-between">
                                  <input
                                        name="password"
                                        type={`${passVisibility?"test":"password"}`}
                                        placeholder="Password..."
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        style={{
                                            border:"none",
                                            outline:"none"
                                        }}
                                    />
                                    <button
                                    type='button'
                                    onClick={togglePasswordVisibilty}
                                      style={{
                                        border:"none",
                                        outline:"none",
                                        cursor:"pointer",
                                        background:"none"
                                    }}>
                                        <i className="passVis bi bi-eye-fill" style={{fontSize:"20px"}}></i>
                                    </button>
                                  </div>
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
                                    }}
                                    disabled={isLoading}>
                                    {isLoading ? (
                                        <img
                                            src='/static/img/Interwind-loader.svg'
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
