import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "~/store/auth/action";
import FormEditBillingAddress from "./modules/FormEditBillingAddress";

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
];
function EditBillingAddress() {
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
                            <FormEditBillingAddress />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditBillingAddress;
