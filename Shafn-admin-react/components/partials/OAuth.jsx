import React, { useEffect } from "react"
import { notification } from "antd"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { GoogleLogin } from "react-google-login"

const OAuth = ({ onSuccess }) => {
  const handleOnSuccess = (id, email, firstname = "", lastname = "") => {
    if (email) {
      onSuccess({ id, email, firstname, lastname })
    } else {
      notification["error"]({
        message: "Login failed!",
        description:
          "Could not retrieve email from provider. Please fill the form to complete registration.",
      })
    }
  }

  useEffect(() => {
    const { gapi, loadAuth2 } = require("gapi-script")
    const loadGoogleAuth = async () => {
      await loadAuth2(gapi, process.env.google_clientID, "")
    }

    loadGoogleAuth()
  }, [])

  return (
    <>
      <GoogleLogin
        clientId={process.env.google_clientID}
        jsSrc="https://accounts.google.com/gsi/client"
        uxMode="redirect"
        onSuccess={(res) => {
          const user = res.profileObj
          handleOnSuccess(
            user.googleId,
            user.email,
            user.givenName,
            user.familyName
          )
        }}
        onFailure={({ error }) => {
          if (error !== "popup_closed_by_user") {
            notification["error"]({
              message: "Google login failed!",
              description:
                "Please check your network connectivity and try again!",
            })
          }
        }}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button className="oauth-btn" onClick={renderProps.onClick}>
            <p>
              <span></span>
              <span>Continue with Google</span>
            </p>
          </button>
        )}
      />

      <FacebookLogin
        appId={process.env.fb_appID}
        fields="name,email,picture"
        scope="email"
        callback={(res) => {
          handleOnSuccess(res.id, res?.email)
        }}
        onFailure={(error) => {
          notification["error"]({
            message: "Facebook login failed!",
            description:
              "Please check your network connectivity and try again!",
          })
        }}
        render={(renderProps) => (
          <button className="oauth-btn" onClick={renderProps.onClick}>
            <p>
              <span></span>
              <span>Continue with Facebook</span>
            </p>
          </button>
        )}
      />
    </>
  )
}

export default OAuth
