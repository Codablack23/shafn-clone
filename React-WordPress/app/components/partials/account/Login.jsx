"use client";
import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import WPAuthRepository from "~/repositories/WP/WPAuthRepository";
import WPCustomerRepository from "~/repositories/WP/WPCustomerRepository";
// import OAuth from "./modules/OAuth";

import { Form, Input, notification, Spin } from "antd";
import { useAppSelector,useAppDispatch } from "@/redux-store/hooks";

function Login() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (
            (auth.email || auth.username) &&
            (auth.email.toLowerCase() === email.toLowerCase() ||
                auth.username.toLowerCase() === email.toLowerCase()) &&
            auth.isLoggedIn
        ) {
            notification["info"]({
                message: "Already logged in",
            });
        } else if (!isLoading) {
            setIsLoading(true);

            let user = {
                username: email,
                password,
            };

            try {
                const _user = await WPAuthRepository.login(user);

                const role = _user.user_role[0].toLowerCase();

                if (role === "customer") {
                    const customer = await WPCustomerRepository.getCustomer(
                        _user.user_id
                    );
                    // Router.push("/");
                    console.log(user);
                } else {
                    notification["error"]({
                        message: "Not a customer account",
                    });
                }
            } catch (error) {
                console.log(error);
                notification["error"]({
                    message: "Unable to login user",
                    description:error.response || error.response.data || error.message
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="ps-my-account" style={{ paddingTop: 10 }}>
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active m-auto" style={style.head}>
                            <Link legacyBehavior href="/account/login">
                                <img
                                    src="/static/img/logo_light.png"
                                    className="img-fluid"
                                    alt=""
                                />
                            </Link>
                        </li>
                    </ul>
                    <div
                        className="ps-tab active"
                        id="sign-in"
                        style={{ boxShadow: "0px 0px 10px #cdcdcd" }}>
                        <div className="ps-form__content">
                            <h5>Sign In</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="text"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email",
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        aria-label="Username or Email address"
                                        aria-required="true"
                                        placeholder="Username or Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoFocus
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
                                                "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                                        },
                                    ]}>
                                    <Input.Password
                                        className="form-control align-items-center d-flex justify-content-between"
                                        name="password"
                                        aria-label="Password"
                                        aria-required="true"
                                        placeholder="Password..."
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
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
                                {/* <Link legacyBehavior href={"/"}>
                                    <a
                                        style={{
                                            color: "#378fd3",
                                            fontWeight: "bold",
                                        }}>
                                        Forgot Password
                                    </a>
                                </Link> */}
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    style={{
                                        borderRadius: "15px",
                                    }}
                                    disabled={isLoading}>
                                    {isLoading ? <Spin /> : "Continue"}
                                </button>
                            </div>

                            <p>
                                Don't have an account?
                                <a
                                    href="/account/register"
                                    style={{
                                        fontStyle: "italic",
                                        color: "#29AAE1",
                                        marginLeft: 2,
                                    }}>
                                    Register
                                </a>
                            </p>
                        </div>
                        {/* <div className="ps-form__footer">
                            <div className="or">
                                <hr />
                                <p>OR</p>
                                <hr />
                            </div>
                            <OAuth
                                onSuccess={(user) =>
                                    handleLogin("oauth", {
                                        email: user.email,
                                        password: user.id,
                                    })
                                }
                            />
                        </div> */}
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
const style = {
    head: {
        maxWidth: "130px",
    },
};
