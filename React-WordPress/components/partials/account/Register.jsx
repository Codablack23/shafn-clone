import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input } from 'antd';
import { login } from '../../../store/auth/action';
import { useDispatch } from 'react-redux';
import WPAuthRepository from '~/repositories/WP/WPAuthRepository';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';

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

    const handleSubmit = async () => {
        setIsLoading(true);

        let user = {
            username,
            email,
            password,
        };

        if (isVendor) {
            user = {
                ...user,
                first_name: firstname,
                last_name: lastname,
                roles: ['seller'],
            };
        } else {
            user = {
                ...user,
                roles: ['customer'],
            };
        }

        const storeData = {
            store_name: storename,
        };

        const dispatchLogin = () => {
            dispatch(login());
        };

        WPAuthRepository.register(
            user,
            storeData,
            isVendor,
            dispatchLogin,
            setIsLoading
        );
    };

    // useEffect(() => {
    //     const start = () => {
    //         gapi.client.init({
    //             clientId: process.env.google_clientID,
    //             scope: '',
    //         });
    //     };

    //     gapi.load('client:auth2', start);
    // });

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleSubmit}>
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
                                    }}>
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
                            <ul className="social-links">
                                <GoogleLogin
                                    clientId={process.env.google_clientID}
                                    render={() => (
                                        <li>
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
                                    // onSuccess={(res) =>
                                    //     console.log('Success: ', res)
                                    // }
                                    // onFailure={(res) =>
                                    //     console.log('Failure: ', res)
                                    // }
                                    cookiePolicy={'single_host_origin'}
                                />

                                <FacebookLogin
                                    appId={process.env.fb_appID}
                                    // autoLoad={true}
                                    fields="name,email,picture"
                                    onClick={(res) => {
                                        console.log('FB_Click: ');
                                        console.log(res);
                                    }}
                                    callback={(res) => {
                                        console.log('FB_Result: ');
                                        console.log(res);
                                    }}
                                    render={(renderProps) => (
                                        <li>
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
                            </ul>

                            {/* <p>Connect with:</p> */}
                            {/* <ul className="ps-list--social">
                                <li>
                                    <a className="facebook" href="#">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="google" href="#">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" href="#">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="instagram" href="#">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
