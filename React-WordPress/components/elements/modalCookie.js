import Link from "next/link";
import { useCookies } from "react-cookie";

const HideCookiePolicy = () => {
    const cookiePopUp = document.getElementById("cookie-popup");
    const cookieWidget = document.getElementById("cookieWidget");
    console.log(cookiePopUp.style.opacity);
    if (cookiePopUp.style.opacity === "1") {
        cookiePopUp.style.opacity = 0;
        cookiePopUp.style.zIndex = -1;
        cookieWidget.style.opacity = 1;
        cookieWidget.style.zIndex = 1000;
    } else {
        cookiePopUp.style.opacity = 1;
        cookiePopUp.style.zIndex = 1000;
        cookieWidget.style.opacity = 0;
        cookieWidget.style.zIndex = -1;
    }
};

export default function ModalCookie() {
    const [cookies, setCookies] = useCookies();
    function CreateCookie(status) {
        HideCookiePolicy();
        setCookies("ShafN-cookie-policy", status, {
            path: "/",
            secure: true,
        });
    }
    console.log(cookies);

    return (
        <div>
            <div className="ps__cookie-popup" id="cookie-popup">
                <span className="close" onClick={HideCookiePolicy}>
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
                <button onClick={HideCookiePolicy}>
                    <i className="bi bi-bell"></i>
                    <sub></sub>
                </button>
            </div>
        </div>
    );
}
