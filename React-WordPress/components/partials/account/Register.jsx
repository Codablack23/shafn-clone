import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input } from 'antd';
import { login } from '../../../store/auth/action';
import { useDispatch } from 'react-redux';
import WPAuthRepository from '~/repositories/WP/WPAuthRepository';
import OAuth from './modules/OAuth';

function Register() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [storename, setStorename] = useState('');
    const [isVendor, setIsVendor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegistration = (type = 'form', oauth) => {
        setIsLoading(true);

        let user = {
            username,
            email,
            password,
        };

        if (type === 'oauth') {
            user = {
                username: oauth.email,
                email: oauth.email,
                password: oauth.password,
            };
        }

        if (isVendor) {
            if (type === 'oauth') {
                user = {
                    ...user,
                    first_name: oauth.firstname,
                    last_name: oauth.lastname,
                    roles: ['seller'],
                };
            } else {
                user = {
                    ...user,
                    first_name: firstname,
                    last_name: lastname,
                    roles: ['seller'],
                };
            }
        } else {
            user = {
                ...user,
                roles: ['customer'],
            };
        }

        const storeData = {
            store_name: storename,
        };

        if (!isLoading) {
            const dispatchLogin = () => {
                dispatch(login());
            };

            WPAuthRepository.register(
                user,
                storeData,
                dispatchLogin,
                setIsLoading
            );
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleRegistration}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/register">
                                <a>ShafN</a>
                            </Link>
                        </li>
                    </ul>
                    <div
                        className="ps-tab active"
                        id="register"
                        style={{ boxShadow: '0px 0px 10px #cdcdcd' }}>
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>

                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your preferred username',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="email"
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
                                            pattern: new RegExp(
                                                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                                            ),
                                            message:
                                                'Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)',
                                        },
                                    ]}>
                                    <Input
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

                            {/* Extra data from vendors only */}
                            {isVendor && (
                                <>
                                    <div className="form-group">
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your first name',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="First Name"
                                                value={firstname}
                                                onChange={(e) =>
                                                    setFirstname(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your last name',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Last Name"
                                                value={lastname}
                                                onChange={(e) =>
                                                    setLastname(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <Form.Item name="text">
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Store Name"
                                                value={storename}
                                                onChange={(e) =>
                                                    setStorename(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                </>
                            )}

                            {/* <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        checked={!isVendor}
                                        className="form-control"
                                        type="checkbox"
                                        id="vendor"
                                        name="vendor"
                                        onChange={(e) =>
                                            setIsVendor((current) => !current)
                                        }
                                    />
                                    <label htmlFor="vendor">
                                        I am a customer
                                    </label>
                                </div>
                            </div> */}

                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        checked={isVendor}
                                        className="form-control"
                                        type="checkbox"
                                        id="customer"
                                        name="customer"
                                        onChange={(e) =>
                                            setIsVendor((current) => !current)
                                        }
                                    />
                                    <label htmlFor="customer">
                                        I am a vendor
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
                                            src={require('../../../public/static/img/Interwind-loader.svg')}
                                            alt="Loading..."
                                            width={50}
                                            height={30}
                                        />
                                    ) : (
                                        'Register'
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
                                    handleRegistration('oauth', {
                                        email: user.email,
                                        password: user.id,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
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

export default Register;
