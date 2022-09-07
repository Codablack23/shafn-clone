import Link from "next/link";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const ShowCookiePolicy = () => {
    const cookiePopUp = document.getElementById("cookie-popup");
    const cookieWidget = document.getElementById("cookieWidget");

    cookiePopUp.style.opacity = 1;
    cookiePopUp.style.zIndex = 1000;
    cookieWidget.style.opacity = 0;
    cookieWidget.style.zIndex = -1;
};

const HideCookiePolicy = () => {
    const cookiePopUp = document.getElementById("cookie-popup");
    const cookieWidget = document.getElementById("cookieWidget");

    cookiePopUp.style.opacity = 0;
    cookiePopUp.style.zIndex = -1;
    cookieWidget.style.opacity = 1;
    cookieWidget.style.zIndex = 1000;
};

const ToggleCookiePolicy = () => {
    const cookiePopUp = document.getElementById("cookie-popup");

    if (cookiePopUp.style.opacity == 0) {
        ShowCookiePolicy();
    } else {
        HideCookiePolicy();
    }
};

const RemoveCookiePolicy = () => {
    const cookiePopUp = document.getElementById("cookie-popup");
    const cookieWidget = document.getElementById("cookieWidget");

    cookiePopUp.style.opacity = 0;
    cookiePopUp.style.zIndex = -1;
    cookieWidget.style.opacity = 0;
    cookieWidget.style.zIndex = -1;
};

export default function ModalCookie() {
    const [cookies, setCookies] = useCookies();
    function CreateCookie(status) {
        RemoveCookiePolicy();
        setCookies("ShafN-cookie-policy", status, {
            path: "/",
            secure: true,
        });
    }

    useEffect(() => {
        if (cookies["ShafN-cookie-policy"] === "accepted") {
            RemoveCookiePolicy();
        } else {
            ShowCookiePolicy();
        }
    }, []);
    return (
        <div>
            <div className="ps__cookie-popup" id="cookie-popup">
                <span className="close" onClick={ToggleCookiePolicy}>
                    <i className="bi bi-x-lg"></i>
                </span>
                <h4 className="title">This website uses cookies</h4>
                <p>
                    We use cookies to operate this website improve usability and
                    keep track of your products to personalize your experience,
                </p>
                <button
                    className="accept"
                    onClick={() => CreateCookie("accepted")}>
                    Accept all cookies
                </button>
                <Link href={"/privacy-policy"}>
                    <button className="reject">View Our Cookie Policy</button>
                </Link>
            </div>
            <div className="ps__cookie-popup-widget" id="cookieWidget">
                <button onClick={ToggleCookiePolicy}>
                    <i className="bi bi-bell"></i>
                    <sub></sub>
                </button>
            </div>
        </div>
    );
}
