import { useState } from "react"
import { notification, Spin } from "antd"
import OtpInput from "react-otp-input"
import styles from '../../../styles/verify.module.css'


export default function WPVerification({
  email,
  otp,
  isLoading,
  verifyEmail,
  handleRegistration,
}) {
  const [code, setCode] = useState("")

  function censorEmail(email) {
    const atPart = email.slice(email.indexOf("@"))
    const restpart = email.slice(0, email.indexOf("@"))
    const restPartArr = restpart.split("")
    const censoredArr = restPartArr.map((item, index, arr) => {
      if (
        arr.length - 1 == index ||
        arr.length - 2 == index ||
        arr.length - 3 == index ||
        arr.length - 4 == index
      ) {
        return "*"
      } else {
        return item
      }
    })
    return censoredArr.join("").toString() + atPart
  }

  const verifyOTP = () => {
    if (otp.expiresAt < Date.now()) {
      notification["error"]({
        message: "OTP has expired! Request a new otp",
      })
    } else if (otp.code && code === otp.code) {
      handleRegistration()
    } else {
      notification["error"]({
        message: "Invalid OTP!",
      })
    }
  }

  return (

      <div className={styles.ps__verify}>
            <h3 className={styles.ps__icon}>
            <i className="bi bi-shield-lock"></i>
                
            </h3>
            <p className={styles.ps__title}>Authenticate your Account</p>
            <p className={styles.ps__desc}>
                Protecting your account is our top priority. Please confirm your
                account by entering the code sent to{" "}
                <span>{censorEmail(email ? email : "")}</span>
            </p>

          <div className={styles.ps__formmain} >

            <form className= {styles.ps__codeform}  >
                <OtpInput
                    value={code}
                    onChange={setCode}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus
                    isInputNum
                />
            </form>

            </div>

            <br />

            <div className={styles.ps__footer}>
                <div>
                    <p>it may take a while to recieve your code</p>
                    <p>
                        Haven't recieved it?{" "}
                        <a
                            className={styles.ps__resendlink}
                            onClick={() => verifyEmail()}>
                            Resend a new code
                        </a>
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.ps__submitbtn}
                    onClick={verifyOTP}
                    disabled={isLoading}>
                    {isLoading ? <Spin /> : "Submit"}
                </button>
            </div>
        
        </div>
   
    
   
  )
}
