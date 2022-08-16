import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, notification, Spin } from "antd";
import { login } from "../../../store/auth/action";
import { useDispatch } from "react-redux";
import WPAuthRepository from "~/repositories/WP/WPAuthRepository";
import OAuth from "./modules/OAuth";
import Router from "next/router";
import ReactHtmlParser from "react-html-parser";

function Register() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [storename, setStorename] = useState("");
    const [isVendor, setIsVendor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passVisibility, setPassVisibility] = useState(false);

    function togglePasswordVisibilty() {
        let e = document.querySelector(".passVis");
        e.classList.toggle("bi-eye-fill");
        e.classList.toggle("bi-eye-slash-fill");
        setPassVisibility((prev) => !prev);
    }

    const handleRegistration = async (type = "form", oauth) => {
        setIsLoading(true);

        let user = {
            username,
            email,
            password,
        };

        const storeData = {
            store_name: storename,
        };

        // Use oauth data if registration is with oauth
        if (type === "oauth") {
            user = {
                username: oauth.email,
                email: oauth.email,
                password: oauth.password,
            };
        }

        if (isVendor) {
            if (type === "oauth") {
                // Use data provided by oauth
                user = {
                    ...user,
                    first_name: oauth.firstname,
                    last_name: oauth.lastname,
                    roles: ["seller"],
                };
            } else {
                // Use data provided by form
                user = {
                    ...user,
                    first_name: firstname,
                    last_name: lastname,
                    roles: ["seller"],
                };
            }
        } else {
            // Set customer role if is registering as customer
            user = {
                ...user,
                roles: ["customer"],
            };
        }

        if (!isLoading) {
            try {
                const _admin = {
                    username: process.env.username,
                    password: process.env.password,
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

                if (user.roles[0] === "seller") {
                    try {
                        // Update vendor store name
                        await WPAuthRepository.updateVendorSettings(
                            storeData,
                            loggedUser.token
                        );

                        notification["success"]({
                            message: "Registration Successful!",
                        });

                        setIsLoading(false);
                    } catch (error) {
                        handleError(
                            error,
                            "Could not update store name. Please check your data connection and update it from your dashboard settings."
                        );
                    } finally {
                        const domain =
                            process.env.NODE_ENV === "development"
                                ? "http://localhost:5500"
                                : "https://vendor.shafn.com";
                        // Go to vendor page
                        window.location.assign(
                            `${domain}/dashboard?auth_token=${loggedUser.token}`
                        );
                    }
                } else {
                    notification["success"]({
                        message: "Registration Successful!",
                    });

                    dispatch(
                        login({
                            email: loggedUser.user_email,
                            token: loggedUser.token,
                        })
                    );

                    Router.push("/"); // Go to homepage

                    setIsLoading(false);
                }
            } catch (error) {
                handleError(error, "Registration Failed!");
            }
        }
    };

    const handleError = (error, message) => {
        notification["error"]({
            message,
            description:
                error.response === undefined
                    ? ReactHtmlParser(String(error))
                    : ReactHtmlParser(error.response.data.message),
        });

        setIsLoading(false);
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={!isLoading && handleRegistration}>
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
                                            message: "Please input your email!",
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
                                                "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                                        },
                                    ]}>
                                    <div className="form-control align-items-center d-flex justify-content-between">
                                        <input
                                            name="password"
                                            type={`${
                                                passVisibility
                                                    ? "test"
                                                    : "password"
                                            }`}
                                            placeholder="Password..."
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            style={{
                                                border: "none",
                                                outline: "none",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibilty}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                cursor: "pointer",
                                                background: "none",
                                            }}>
                                            <i
                                                className="passVis bi bi-eye-fill"
                                                style={{
                                                    fontSize: "20px",
                                                }}></i>
                                        </button>
                                    </div>
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
                                                        "Please input your first name",
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
                                                        "Please input your last name",
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
                                        borderRadius: "15px",
                                    }}
                                    disabled={isLoading}>
                                    {isLoading ? <Spin /> : "Register"}
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
                </Form>
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
