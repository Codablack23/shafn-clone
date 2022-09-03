import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { logOut } from "../../../../store/auth/action";
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logOut());
        Router.push("/");
    };

    render() {
        const accountLinks = [
            {
                text: "Account Information",
                url: "/account/user-information",
            },
            {
                text: "Address",
                url: "/account/addresses",
            },
            {
                text: "Orders",
                url: "/account/orders",
            },
        ];
        const { isLoggedIn } = this.props;
        if (isLoggedIn === true) {
            return (
                <div className="ps-block--user-account mt-3">
                    <Link href="/account/user-information">
                        <span
                            className="w3-hover-lightgrey"
                            style={{
                                cursor: "pointer",
                            }}>
                            <i
                                className="icon-user"
                                style={{
                                    fontSize: "22px",
                                    cursor: "pointer",
                                    color: "#2A3147",
                                }}></i>
                        </span>
                    </Link>
                    <div className="ps-block__content">
                        <ul className="ps-list--arrow">
                            {accountLinks.map((link) => (
                                <li key={link.text}>
                                    <Link href={link.url}>
                                        <a>{link.text}</a>
                                    </Link>
                                </li>
                            ))}
                            <li className="ps-block__footer">
                                <a
                                    href="#"
                                    onClick={this.handleLogout.bind(this)}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ps-block--user-header mt-3">
                    <div className="ps-block__right">
                        <Link href="/account/login">
                            <span
                                className="w3-hover-lightgrey"
                                style={{
                                    cursor: "pointer",
                                }}>
                                <i
                                    className="icon-user"
                                    style={{
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        color: "#2A3147",
                                    }}></i>
                            </span>
                        </Link>
                        {/* <Link href="/account/register">
                            <a>Register</a>
                        </Link> */}
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
