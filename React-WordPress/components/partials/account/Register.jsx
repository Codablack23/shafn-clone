import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { Form, Input, notification } from 'antd';
import { login } from '../../../store/auth/action';
import { connect, useDispatch } from 'react-redux';
import { WPDomain } from '~/repositories/WP/WPRepository';

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

    const handleSubmit = () => {
        setIsLoading(true);
        const adLog = {
            username:process.env.AD_LOG_USERNAME,
            password:process.env.AD_LOG_PASSWORD
        }

        let regData;

        if (isVendor) {
            regData = {
                username,
                email,
                password,
                first_name: firstname,
                last_name: lastname,
                roles: ['seller'],
            };
        } else {
            regData = {
                username,
                email,
                password,
                roles: ['customer'],
            };
        }

        const storeData = {
            store_name: storename,
        };

        let adminToken;

        // Get admin token
        axios
            .post(`${WPDomain}/wp-json/jwt-auth/v1/token`, adLog)
            .then((res) => {
                adminToken = res.data.token;

                // Register user
                axios
                    .post(`${WPDomain}/wp-json/wp/v2/users`, regData, {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                        },
                    })
                    .then((res) => {
                        const userLog = {
                            username: email,
                            password,
                        };

                        // Get user token
                        axios
                            .post(
                                `${WPDomain}/wp-json/jwt-auth/v1/token`,
                                userLog,
                                {
                                    headers: {
                                        Authorization: `Bearer ${adminToken}`,
                                    },
                                }
                            )
                            .then((res) => {
                                const userToken = res.data.token;

                                if (isVendor) {
                                    // Update store data
                                    axios
                                        .put(
                                            `${WPDomain}/wp-json/dokan/v1/settings`,
                                            storeData,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${userToken}`,
                                                },
                                            }
                                        )
                                        .then((res) => {
                                            notification['success']({
                                                message:
                                                    'Registration Successful!',
                                            });
                                            window.location.assign(
                                                `http://localhost:5500/${userToken}`
                                            );
                                            setIsLoading(false);
                                        })
                                        .catch((err) => {
                                            errResponse(err);
                                        });
                                } else {
                                    localStorage.setItem(
                                        'auth_token',
                                        userToken
                                    );
                                    dispatch(login());
                                    Router.push('/');
                                    setIsLoading(false);
                                }
                            })
                            .catch((err) => {
                                errResponse(err);
                            });
                    })
                    .catch((err) => {
                        errResponse(err);
                    });
            })
            .catch((err) => {
                errResponse(err);
            });
    };

    const errResponse = (err) => {
        if (err.response === undefined) {
            notification['error']({
                message: 'Registration Failed',
                description: String(err),
            });
        } else {
            notification['error']({
                message: 'Registration Failed',
                description: err.response.data.message,
            });
        }
        setIsLoading(false);
    };
    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleSubmit}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/register">
                                <a>Register</a>
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

                            <div className="form-group">
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
                            </div>

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
                                    className="ps-btn ps-btn--fullwidth">
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
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
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
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             email: '',
//             password: '',
//         };
//     }

//     handleOnChange = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         this.setState({ [name]: value });
//     };

//     handleSubmit = () => {
//         window.location.assign('http://localhost:5500');
//     };

//     render() {
//         return (
//             <div className="ps-my-account">
//                 <div className="container">
//                     <Form
//                         className="ps-form--account"
//                         onFinish={this.handleSubmit}>
//                         <ul className="ps-tab-list">
//                             <li>
//                                 <Link href="/account/login">
//                                     <a>Login</a>
//                                 </Link>
//                             </li>
//                             <li className="active">
//                                 <Link href="/account/register">
//                                     <a>Register</a>
//                                 </Link>
//                             </li>
//                         </ul>
//                         <div className="ps-tab active" id="register">
//                             <div className="ps-form__content">
//                                 <h5>Register An Account</h5>
//                                 <div className="form-group">
//                                     <Form.Item
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message:
//                                                     'Please input your username',
//                                             },
//                                         ]}>
//                                         <Input
//                                             name="username"
//                                             className="form-control"
//                                             type="text"
//                                             placeholder="Username"
//                                             value={this.state.email}
//                                             onChange={this.handleOnChange}
//                                         />
//                                     </Form.Item>
//                                 </div>
//                                 <div className="form-group">
//                                     <Form.Item
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 type: 'email',
//                                                 message:
//                                                     'Please input a valid email!',
//                                             },
//                                         ]}>
//                                         <Input
//                                             name="email"
//                                             className="form-control"
//                                             type="email"
//                                             placeholder="Email address"
//                                             value={this.state.email}
//                                             onChange={this.handleOnChange}
//                                         />
//                                     </Form.Item>
//                                 </div>
//                                 <div className="form-group form-forgot">
//                                     <Form.Item
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message:
//                                                     'Password input your password',
//                                             },
//                                         ]}>
//                                         <Input
//                                             name="password"
//                                             className="form-control"
//                                             type="password"
//                                             placeholder="Password..."
//                                             value={this.state.password}
//                                             onChange={this.handleOnChange}
//                                         />
//                                     </Form.Item>
//                                 </div>
//                                 <div className="form-group submit">
//                                     <button
//                                         type="submit"
//                                         className="ps-btn ps-btn--fullwidth">
//                                         Register
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="ps-form__footer">
//                                 <p>Connect with:</p>
//                                 <ul className="ps-list--social">
//                                     <li>
//                                         <a className="facebook" href="#">
//                                             <i className="fa fa-facebook"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a className="google" href="#">
//                                             <i className="fa fa-google-plus"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a className="twitter" href="#">
//                                             <i className="fa fa-twitter"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a className="instagram" href="#">
//                                             <i className="fa fa-instagram"></i>
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return state.auth;
// };
// export default connect(mapStateToProps)(Register);
