import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, notification, Spin } from "antd";
import { login } from "../../../store/auth/action";
import { useDispatch } from "react-redux";
import WPAuthRepository from "~/repositories/WP/WPAuthRepository";
import WPCustomerRepository from "~/repositories/WP/WPCustomerRepository";
// import WPVendorRepository from "~/repositories/WP/WPVendorRepository";
import OAuth from "./modules/OAuth";
import Router from "next/router";
import ReactHtmlParser from "react-html-parser";
import WPVerification from "~/wp-components/account/WPVerification";

function Register() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState({
        code: "",
        createdAt: 0,
        expiresAt: 0,
        allowResendAt: 0,
    });

    const verifyEmail = async () => {
        setIsLoading(true);

        try {
            const response = await WPAuthRepository.verifyEmail({
                name: username,
                email,
            });

            setOtp({
                code: response.data.code,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
                allowResendAt: Date.now() + 120000,
            });

            notification["info"]({
                message: "Email verification code sent",
            });
        } catch (error) {
            notification["error"]({
                message: "Unable to send verification code",
                description:
                    "Please check your network connection and try again",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegistration = async (type = "form", oauth) => {
        setIsLoading(true);

        let user = {
            username,
            email,
            password,
            role: "customer",
        };

        // Use oauth data if registration is with oauth
        if (type === "oauth") {
            user = {
                username: oauth.email,
                email: oauth.email,
                password: oauth.password,
            };
        }

        if (!isLoading) {
            try {
                const _admin = {
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD,
                };

                const _user = {
                    username: user.email,
                    password: user.password,
                };

                // Login Admin
                const admin = await WPAuthRepository.login(_admin);

                // Register user with admin token
                await WPAuthRepository.register(user, admin.token);

                // Login user
                const loggedUser = await WPAuthRepository.login(_user);

                const customer = await WPCustomerRepository.getCustomer(
                    loggedUser.user_id
                );

                dispatch(login(customer));

                Router.push("/");
                // }

                notification["success"]({
                    message: "Registration Successful!",
                });
            } catch (error) {
                notification["error"]({
                    message: "Unable to register user",
                    description:
                        error.response === undefined
                            ? ReactHtmlParser(String(error))
                            : error.response.data !== undefined
                            ? ReactHtmlParser(error.response.data.message)
                            : error.message
                            ? ReactHtmlParser(error.message)
                            : null,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && verifyEmail}>
                    <ul className="ps-tab-list">
                        <li className="active m-auto" style={style.head}>
                            <Link href="/account/login">
                                <img
                                    src="/static/img/logo_light.png"
                                    className="img-fluid"
                                    alt=""
                                />
                            </Link>
                        </li>
                    </ul>

                    {!otp.code ? (
                        <div
                            className="ps-tab active"
                            id="register"
                            style={{ boxShadow: "0px 0px 10px #cdcdcd" }}>
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>

                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your preferred username",
                                            },
                                        ]}>
                                        <Input
                                            name="username"
                                            className="form-control"
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            autoFocus
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: "email",
                                                message:
                                                    "Please input your email!",
                                            },
                                        ]}>
                                        <Input
                                            name="email"
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

                                <div className="form-group">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                pattern: new RegExp(
                                                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                                                ),
                                                message:
                                                    "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                                            },
                                        ]}>
                                        <Input.Password
                                            className="form-control align-items-center d-flex justify-content-between"
                                            name="password"
                                            placeholder="Password..."
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                        style={{
                                            borderRadius: "15px",
                                        }}
                                        disabled={isLoading}>
                                        {isLoading ? <Spin /> : "Register"}
                                    </button>
                                </div>

                                <p>
                                    Already have an account?
                                    <a
                                        href="/account/login"
                                        style={{
                                            fontStyle: "italic",
                                            color: "#29AAE1",
                                            marginLeft: 2,
                                        }}>
                                        Login
                                    </a>
                                </p>
                            </div>

                            <div className="ps-form__footer">
                                <div className="or">
                                    <hr />
                                    <p>OR</p>
                                    <hr />
                                </div>
                                <OAuth
                                    onSuccess={(user) =>
                                        handleRegistration("oauth", {
                                            email: user.email,
                                            password: user.id,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    ) : null}
                </Form>

                {otp.code ? (
                    <WPVerification
                        email={email}
                        otp={otp}
                        isLoading={isLoading}
                        verifyEmail={verifyEmail}
                        handleRegistration={handleRegistration}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Register;

const style = {
    head: {
        maxWidth: "130px",
    },
};
