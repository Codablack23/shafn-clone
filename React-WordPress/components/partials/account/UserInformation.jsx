import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { Form, Input, notification, Spin } from "antd";
import { logOut, updateAuth } from "../../../store/auth/action";
import WPCustomerRepository from "~/repositories/WP/WPCustomerRepository";
import ReactHtmlParser from "react-html-parser";

const accountLinks = [
    {
        text: "Account Information",
        url: "/account/user-information",
        icon: "icon-user",
        active: true,
    },
    {
        text: "Address",
        url: "/account/addresses",
        icon: "icon-map-marker",
    },
    {
        text: "Orders",
        url: "/account/orders",
        icon: "icon-map-marker",
    },
];

function UserInformation() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [customer, setCustomer] = useState({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
    });
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleInputChange = (e) => {
        setCustomer((current) => ({
            ...current,
            [e.target.name]: e.target.value,
        }));
    };

    const update = async () => {
        if (password.trim()) {
            // Update with password if valid
            if (
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    password
                )
            ) {
                await _update({ ...customer, password });
            } else {
                notification["error"]({
                    message: "Invalid password",
                    description:
                        "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                    duration: 5,
                });
            }
        } else {
            await _update(customer);
        }
    };

    const _update = async (payload) => {
        if (!isUpdating) {
            try {
                setIsUpdating(true);
                const _customer = await WPCustomerRepository.updateCustomer(
                    auth.id,
                    payload
                );

                dispatch(updateAuth(_customer));

                notification["success"]({
                    message: "Update successful",
                });
            } catch (error) {
                notification["error"]({
                    message: "Unable to update account info",
                    description:
                        error.response === undefined
                            ? ReactHtmlParser(String(error))
                            : ReactHtmlParser(error.response.data.message),
                });
            } finally {
                setIsUpdating(false);
            }
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
        Router.push("/");
    };

    const getCustomer = async () => {
        try {
            const _customer = await WPCustomerRepository.getCustomer(auth.id);

            setCustomer({
                email: _customer.email,
                username: _customer.username,
                first_name: _customer.first_name,
                last_name: _customer.last_name,
            });
        } catch (error) {
            notification["error"]({
                message: "Unable to get customer",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.id) {
            getCustomer();
        }
    }, []);

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <figure>
                                        <figcaption>
                                            Hello,{" "}
                                            <strong>
                                                {auth.first_name}{" "}
                                                {auth.last_name}
                                            </strong>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? "active" : ""
                                                }>
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <a onClick={handleLogout}>
                                                <i className="icon-power-switch"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <Form
                                className="ps-form--account-setting"
                                onFinish={!isUpdating && update}>
                                <div className="ps-form__header">
                                    <h3>Account Information</h3>
                                    {isLoading && (
                                        <Spin style={{ marginTop: 10 }} />
                                    )}
                                </div>
                                <div className="ps-form__content">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="Email"
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
                                                        placeholder="Enter your email"
                                                        value={customer.email}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="Username"
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message:
                                                                "Please input your username!",
                                                        },
                                                    ]}>
                                                    <Input
                                                        name="username"
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Enter your username"
                                                        value={
                                                            customer.username
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="First name"
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message:
                                                                "Please input your first name!",
                                                        },
                                                    ]}>
                                                    <Input
                                                        name="first_name"
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        value={
                                                            customer.first_name
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="Last name"
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message:
                                                                "Please input your last name!",
                                                        },
                                                    ]}>
                                                    <Input
                                                        name="last_name"
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Enter your last name"
                                                        value={
                                                            customer.last_name
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Form.Item
                                            label="New Password"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}>
                                            <Input
                                                name="password"
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter new password"
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
                                            className="ps-btn"
                                            disabled={isUpdating}>
                                            {isUpdating ? <Spin /> : "Update"}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserInformation;
