import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Address from "./modules/Address";

import { logOut } from "~/store/auth/action";

const accountLinks = [
    {
        text: "Account Information",
        url: "/account/user-information",
        icon: "icon-user",
    },
    {
        text: "Address",
        url: "/account/addresses",
        icon: "icon-map-marker",
        active: true,
    },
    {
        text: "Orders",
        url: "/account/orders",
        icon: "icon-map-marker",
    },
];

function Addresses() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
        Router.push("/");
    };

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    {/* <img src="/static/img/users/3.jpg" /> */}
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
                                                <Link legacyBehavior href={link.url}>
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
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Billing address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                <Address
                                                    customer={auth.billing}
                                                    isBilling={true}
                                                />
                                                <Link legacyBehavior href="/account/edit-billing-address">
                                                    <a>Edit</a>
                                                </Link>
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Shipping address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                <Address
                                                    customer={auth.shipping}
                                                    isBilling={false}
                                                />
                                                <Link legacyBehavior href="/account/edit-shipping-address">
                                                    <a>Edit</a>
                                                </Link>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Addresses;
