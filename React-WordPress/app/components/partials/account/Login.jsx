"use client";
import React, { useState } from "react";
import Link from "next/link";
import WPAuthRepository from "@/repositories/WP/WPAuthRepository";
import WPCustomerRepository from "@/repositories/WP/WPCustomerRepository";
// import OAuth from "./modules/OAuth";

import { Form, Input, notification, Spin } from "antd";
import { useAppSelector,useAppDispatch } from "@/redux-store/hooks";
import { AxiosError } from "axios";
import useAuth from "@/redux-store/hooks/useAuth";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function Login() {
    const router = useRouter()
    const params = useSearchParams()
    const {loginUser,authState:auth} = useAuth()
    const [notificationApi,contextHolder] = notification.useNotification()

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
                const _admin = {
                    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
                    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
                };

                const _user = await WPAuthRepository.login(_admin);

                const customers = await WPCustomerRepository.getCustomers();
                const customer = customers.find((item)=>item.email === _user.user_email);
                if(!customer){
                    const CustomerError = new Error("customer does not exist please check your details")
                    throw new CustomerError
                }
                const role = customer.role

                if (role !== "customer") {
                    const CustomerError = new Error("The account details you provided is not a customer account please check the details and try again")
                    throw new CustomerError
                }

                loginUser(customer)
                const redirectURL = params.get("next")
                if(redirectURL) return router.push(redirectURL)
                router.push("/")
            } catch (error) {
                console.log({error})
                if(error instanceof AxiosError){
                    return notificationApi.error({
                        message: "Unable to login user",
                        description:error.response.data.message || "Sorry an error occurred please try again later"
                    });
                }
                notificationApi.error({
                    message: "Unable to login user",
                    description:error.message || "Sorry an error occurred please try again later"
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
        {contextHolder}
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
        </>
    );
}

export default Login;
const style = {
    head: {
        maxWidth: "130px",
    },
};
