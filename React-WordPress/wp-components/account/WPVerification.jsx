import { useState } from "react";
import { notification, Spin } from "antd";
import OtpInput from "react-otp-input";

export default function WPVerification({
    email,
    otp,
    isLoading,
    verifyEmail,
    handleRegistration,
}) {
    const [code, setCode] = useState("");

    function censorEmail(email) {
        const atPart = email.slice(email.indexOf("@"));
        const restpart = email.slice(0, email.indexOf("@"));
        const restPartArr = restpart.split("");
        const censoredArr = restPartArr.map((item, index, arr) => {
            if (
                arr.length - 1 == index ||
                arr.length - 2 == index ||
                arr.length - 3 == index ||
                arr.length - 4 == index
            ) {
                return "*";
            } else {
                return item;
            }
        });
        return censoredArr.join("").toString() + atPart;
    }

    const verifyOTP = () => {
        console.log("Verifying OTP...");
        if (otp.expiresAt < Date.now()) {
            notification["error"]({
                message: "OTP has expired! Request a new otp",
            });
        } else if (otp.code && code === otp.code) {
            handleRegistration();
        } else {
            notification["error"]({
                message: "Invalid OTP!",
            });
        }
    };

    return (
        <div className="ps__verify-widget w3-card">
            <h3 className="ps__icon">
                <i className="bi bi-shield-lock"></i>
            </h3>
            <h3 className="ps__title">Authenticate your Account</h3>
            <p className="ps__desc">
                Protecting your account is our top priority. Please confirm your
                account by entering the code sent to{" "}
                <span>{censorEmail(email ? email : "")}</span>
            </p>
            <form className="ps__code-form">
                <OtpInput
                    value={code}
                    onChange={setCode}
                    numInputs={6}
                    separator={<span>-</span>}
                    shouldAutoFocus
                    isInputNum
                />
            </form>
            <br />
            <div className="ps__footer">
                <div>
                    <p>it may take a while to recieve your code</p>
                    <p>
                        Haven't recieved it?{" "}
                        <a
                            className="ps__resend-link"
                            onClick={() => verifyEmail()}>
                            Resend a new code
                        </a>
                    </p>
                </div>
                <button
                    type="button"
                    className="ps__submit-btn"
                    onClick={verifyOTP}
                    disabled={isLoading}>
                    {isLoading ? <Spin /> : "Submit"}
                </button>
            </div>
        </div>
    );
}
