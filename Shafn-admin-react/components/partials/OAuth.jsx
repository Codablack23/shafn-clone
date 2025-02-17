import React, { useEffect } from "react";
import { notification } from "antd";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import FirebaseAuthProvider from "~/repositories/FirebaseAuthRepository";

const OAuth = ({ onSuccess }) => {
  const handleOnSuccess = (id, email, firstname = "", lastname = "") => {
    if (email) {
      onSuccess({ id, email, firstname, lastname });
    } else {
      notification["error"]({
        message: "Login failed!",
        description:
          "Could not retrieve email from provider. Please fill the form to complete registration.",
      });
    }
  };

  useEffect(() => {
    const { gapi, loadAuth2 } = require("gapi-script");
    const loadGoogleAuth = async () => {
      await loadAuth2(gapi, process.env.NEXT_PUBLIC_GOOGLE_CLIENTID, "");
    };

    loadGoogleAuth();
  }, []);


  const handleClick = async () => {
    const {user,error} = await FirebaseAuthProvider.googleSignIn()
    const username = user.email.slice(0, user.email.indexOf("@"))
    const [first_name,last_name]  = user.displayName.split(" ")

    if(!error){
      onSuccess({
        username,
        email: user.email,
        password: user.uid,
        store: user.displayName,
        first_name,
        last_name,
        role: "seller",
        roles:["seller"]
      })
      return;
    }
    notification.error({
      message: "Google Sign in Failed",
      description: error,
    })
  }

  return (
    <>
      <button className="oauth-btn" type="button" onClick={handleClick} style={{cursor:"pointer"}}>
            <p>
              <span></span>
              <span>Continue with Google</span>
            </p>
        </button>
      {/* <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}
        jsSrc="https://accounts.google.com/gsi/client"
        uxMode="redirect"
        onSuccess={(res) => {
          const user = res.profileObj;
          handleOnSuccess(
            user.googleId,
            user.email,
            user.givenName,
            user.familyName
          );
        }}
        onFailure={({ error }) => {
          if (error !== "popup_closed_by_user") {
            notification["error"]({
              message: "Google login failed!",
              description:
                "Please check your network connectivity and try again!",
            });
          }
        }}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button className="oauth-btn">
            <p>
              <span></span>
              <span>Continue with Google</span>
            </p>
          </button>
        )}
      /> */}

      {/* <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APPID}
        fields="name,email,picture"
        scope="email"
        callback={(res) => {
          handleOnSuccess(res.id, res?.email);
        }}
        onFailure={(error) => {
          notification["error"]({
            message: "Facebook login failed!",
            description:
              "Please check your network connectivity and try again!",
          });
        }}
        render={(renderProps) => (
          <button className="oauth-btn" onClick={renderProps.onClick}>
            <p>
              <span></span>
              <span>Continue with Facebook</span>
            </p>
          </button>
        )}
      /> */}
    </>
  );
};

export default OAuth;
