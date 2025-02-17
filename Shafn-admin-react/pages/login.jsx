import React from "react";
import { Form, Input, Checkbox, notification, Spin, Divider } from "antd";
import { useState } from "react";
import HomepageLayout from "@/components/layouts/HomePageLayout";
import OAuth from "@/components/partials/OAuth";
import Router from "next/router";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import AuthRepository from "@/repositories/AuthRepository";
import UserRepository from "@/repositories/UserRepository";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [vendor, setVendor] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setVendor((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (type = "form", oauth) => {
    if (
      auth.email &&
      (auth.email.toLowerCase() === email ||
        auth.email.toLowerCase() === oauth?.email) &&
      auth.isLoggedIn
    ) {
      notification["info"]({
        message: "Already logged in",
      });
    } else if (!isLoading) {
      setIsLoading(true);

      let _vendor = { username: vendor.email, password: vendor.password };

      if (type === "oauth") {
        _vendor = {
          username: oauth.email,
          password: oauth.password,
        };
      }

      try {
        const userData = await AuthRepository.login(_vendor);
        const _user = await UserRepository.getUserById(userData.id)


        const role = _user.role.toLowerCase();

        if (role === "seller" || role === "administrator") {
          const { encrypt } = require("@/utilities/helperFunctions");

          const encryptedToken = encrypt(userData.token);

          localStorage.setItem("auth_token", encryptedToken);
          // TO-DO: Store vendor data in redux
          Router.push("/dashboard");
        } else {
          notification["error"]({
            message: "Not a vendor account",
          });
        }
      } catch (error) {
        console.log(error);

        notification["error"]({
          message: "Unable to login user",
          description:
            error.response === undefined
              ? ReactHtmlParser(String(error))
              : error.response.data !== undefined
              ? ReactHtmlParser(error.response.data.message)
              : error.message
              ? ReactHtmlParser(error.message)
              : null,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  /*
    Password RegEx:
    pattern: new RegExp(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                  ),
  */

  return (
    <HomepageLayout title={"login"} page={"accounts"}>
      <div className="account-container">
        <div className="logo">
          <img src={"/img/logo_light.png"} alt="logo" />
        </div>

        <Form onFinish={!isLoading && handleLogin}>
          <p className="title mb-2" style={{ paddingBottom: 10 }}>
            Sign in
          </p>
          <div className="form-group">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                name="email"
                className="form-control"
                type="text"
                aria-label="Email address"
                aria-required="true"
                placeholder="Email address"
                value={vendor.email}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message:
                    "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                },
              ]}
            >
              <Input.Password
                name="password"
                className="form-control"
                placeholder="Password"
                aria-label="Email address"
                aria-required="true"
                value={vendor.password}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? <Spin /> : "Continue"}
            </button>

            <p>
              Don't have an account?
              <a
                href="/register"
                style={{
                  fontStyle: "italic",
                  color: "#29AAE1",
                  marginLeft: 2,
                }}
              >
                Register
              </a>
            </p>

            <Divider>OR</Divider>
            <OAuth onSuccess={(vendor)=>handleLogin("oauth",vendor)} />
          </div>
        </Form>
      </div>
    </HomepageLayout>
  );
}
