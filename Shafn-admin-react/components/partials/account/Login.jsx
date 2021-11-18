import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";

import { Form, Input, notification } from "antd";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFeatureWillUpdate = () => {
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  };

  const handleLoginSubmit = () => {
    setIsLoading(true);

    let loginData = {
      username: email,
      password,
    };

    // Get auth token
    axios
      .post("https://shafn.com/wp-json/jwt-auth/v1/token", loginData)
      .then((res) => {
        localStorage.setItem("auth_token", res.data.token);
        Router.push("/");
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          alert(err);
        } else {
          alert(err.response.data.message);
        }

        setIsLoading(false);
      });
  };

  return (
    <div className="ps-my-account" style={{ paddingTop: 100 }}>
      <div className="container">
        <Form
          className="ps-form--account"
          onFinish={!isLoading && handleLoginSubmit}
        >
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/account/register">
                <a>Register</a>
              </Link>
            </li>
          </ul>
          <div
            className="ps-tab active"
            id="sign-in"
            style={{ boxShadow: "0px 0px 10px #cdcdcd" }}
          >
            <div className="ps-form__content">
              <h5>Log In Your Account</h5>
              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="form-group form-forgot">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <div className="ps-checkbox">
                  <input
                    className="form-control"
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                  />
                  <label htmlFor="remember-me">Rememeber me</label>
                </div>
              </div>
              <div className="form-group submit">
                <button type="submit" className="ps-btn ps-btn--fullwidth">
                  {isLoading ? (
                    <img
                      src={require("../../../public/img/Interwind-loader.svg")}
                      alt="Loading..."
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              <p>Connect with:</p>
              <ul className="ps-list--social">
                <li>
                  <a
                    className="facebook"
                    href="#"
                    onClick={handleFeatureWillUpdate}
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="google"
                    href="#"
                    onClick={handleFeatureWillUpdate}
                  >
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="#"
                    onClick={handleFeatureWillUpdate}
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    href="#"
                    onClick={handleFeatureWillUpdate}
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
