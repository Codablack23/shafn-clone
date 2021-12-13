import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { WPDomain } from '~/repositories/WP/WPRepository';

import { Form, Input, notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';

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

    const handleLoginSubmit = () => {
        setIsLoading(true);

        let loginData = {
            username: email,
            password,
        };

        // Get auth token
        axios
            .post(`${WPDomain}/wp-json/jwt-auth/v1/token`, loginData)
            .then((res) => {
                if (res.data.user_role[0] === 'customer') {
                    localStorage.setItem('auth_token', res.data.token);
                    dispatch(login());
                    Router.push('/');
                } else {
                    window.location.assign(
                        `http://localhost:5500/${res.data.token}`
                    );
                }
                setIsLoading(false);
            })
            .catch((err) => {
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
            });
    };

    return (
        <div className="ps-my-account" style={{ paddingTop: 100 }}>
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleLoginSubmit}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                    </ul>
                    <div
                        className="ps-tab active"
                        id="sign-in"
                        style={{ boxShadow: '0px 0px 10px #cdcdcd' }}>
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
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
                                        Rememeber me
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
                                        'Login'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="#"
                                        onClick={handleFeatureWillUpdate}>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="#"
                                        onClick={handleFeatureWillUpdate}>
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
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
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

//     static getDerivedStateFromProps(props) {
//         if (props.isLoggedIn === true) {
//             Router.push('/');
//         }
//         return false;
//     }

//     handleFeatureWillUpdate(e) {
//         e.preventDefault();
//         notification.open({
//             message: 'Opp! Something went wrong.',
//             description: 'This feature has been updated later!',
//             duration: 500,
//         });
//     }

//     handleLoginSubmit = (e) => {
//         this.props.dispatch(login());
//         Router.push('/');
//     };

//     render() {
//         return (
//             <div className="ps-my-account">
//                 <div className="container">
//                     <Form
//                         className="ps-form--account"
//                         onFinish={this.handleLoginSubmit.bind(this)}>
//                         <ul className="ps-tab-list">
//                             <li className="active">
//                                 <Link href="/account/login">
//                                     <a>Login</a>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href="/account/register">
//                                     <a>Register</a>
//                                 </Link>
//                             </li>
//                         </ul>
//                         <div className="ps-tab active" id="sign-in">
//                             <div className="ps-form__content">
//                                 <h5>Log In Your Account</h5>
//                                 <div className="form-group">
//                                     <Form.Item
//                                         name="username"
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message:
//                                                     'Please input your email!',
//                                             },
//                                         ]}>
//                                         <Input
//                                             className="form-control"
//                                             type="text"
//                                             placeholder="Username or email address"
//                                         />
//                                     </Form.Item>
//                                 </div>
//                                 <div className="form-group form-forgot">
//                                     <Form.Item
//                                         name="password"
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message:
//                                                     'Please input your password!',
//                                             },
//                                         ]}>
//                                         <Input
//                                             className="form-control"
//                                             type="password"
//                                             placeholder="Password..."
//                                         />
//                                     </Form.Item>
//                                 </div>
//                                 <div className="form-group">
//                                     <div className="ps-checkbox">
//                                         <input
//                                             className="form-control"
//                                             type="checkbox"
//                                             id="remember-me"
//                                             name="remember-me"
//                                         />
//                                         <label htmlFor="remember-me">
//                                             Rememeber me
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="form-group submit">
//                                     <button
//                                         type="submit"
//                                         className="ps-btn ps-btn--fullwidth">
//                                         Login
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="ps-form__footer">
//                                 <p>Connect with:</p>
//                                 <ul className="ps-list--social">
//                                     <li>
//                                         <a
//                                             className="facebook"
//                                             href="#"
//                                             onClick={(e) =>
//                                                 this.handleFeatureWillUpdate(e)
//                                             }>
//                                             <i className="fa fa-facebook"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a
//                                             className="google"
//                                             href="#"
//                                             onClick={(e) =>
//                                                 this.handleFeatureWillUpdate(e)
//                                             }>
//                                             <i className="fa fa-google-plus"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a
//                                             className="twitter"
//                                             href="#"
//                                             onClick={(e) =>
//                                                 this.handleFeatureWillUpdate(e)
//                                             }>
//                                             <i className="fa fa-twitter"></i>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a
//                                             className="instagram"
//                                             href="#"
//                                             onClick={(e) =>
//                                                 this.handleFeatureWillUpdate(e)
//                                             }>
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
// export default connect(mapStateToProps)(Login);
