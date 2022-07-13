import { useCookies } from 'react-cookie';

const HideCookiePolicy = () => {
    const cookiePopUp = document.getElementById('cookie-popup');
    const cookieWidget = document.getElementById('cookieWidget');
    console.log(cookiePopUp);
    if (cookiePopUp.style.opacity === '1') {
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
        setCookies('ShafN-cookie-policy', status, {
            path: '/',
            secure: true,
        });
        HideCookiePolicy();
    }

    return (
        <div>
            <div className="ps__cookie-popup" id="cookie-popup">
                <span className="close" onClick={HideCookiePolicy}>
                    <i className="bi bi-x-lg"></i>
                </span>
                <h4 className="title">This website uses cookies</h4>
                <p>
                    We use cookies to operate this website improve usability and
                    personalize your experience, feel free to make a choice to
                    accept or reject.
                </p>
                <button
                    className="accept"
                    onClick={() => CreateCookie('accepted')}>
                    Accept all cookies
                </button>
                <button
                    className="reject"
                    onClick={() => CreateCookie('rejected')}>
                    Reject all cookies
                </button>
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
