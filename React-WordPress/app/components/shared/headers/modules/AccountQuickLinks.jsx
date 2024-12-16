import React from "react";
import Link from "next/link";
import useAuth from "@/redux-store/hooks/useAuth";
import { useRouter } from "next/navigation";
// import { logOut } from "../../../../store/auth/action";


 export default function AccountQuickLinks(props) {
    const {logoutUser} = useAuth()
    const router = useRouter()

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser()
        router.push("/");
    };
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
        const { isLoggedIn } = props;
        if (isLoggedIn === true) {
            return (
                <div className="ps-block--user-account mt-3">
                    <Link legacyBehavior href="/account/user-information">
                        <span
                            className="w3-hover-lightgrey"
                            style={{
                                cursor: "pointer",
                            }}>
                            <i
                                className="bi bi-person"
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
                                    <Link legacyBehavior href={link.url}>
                                        <a>{link.text}</a>
                                    </Link>
                                </li>
                            ))}
                            <li className="ps-block__footer">
                                <a
                                    href="#"
                                    onClick={handleLogout}>
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
                        <Link legacyBehavior href="/account/login">
                            <span
                                className="w3-hover-lightgrey"
                                style={{
                                    cursor: "pointer",
                                }}>
                                <i
                                    className="bi bi-person"
                                    style={{
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        color: "#2A3147",
                                    }}></i>
                            </span>
                        </Link>
                        {/* <Link legacyBehavior href="/account/register">
                            <a>Register</a>
                        </Link> */}
                    </div>
                </div>
            );
        }

}

