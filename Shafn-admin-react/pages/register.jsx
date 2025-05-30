import { Form, Input, notification, Spin } from "antd";
import { useState } from "react";
import HomepageLayout from "@/components/layouts/HomePageLayout";
import AuthRepository from "@/repositories/AuthRepository";
import SettingsRepository from "@/repositories/SettingsRepository";
import Router from "next/router";
import ReactHtmlParser from "react-html-parser";
import WPVerification from "@/components/shared/widgets/WPVerification";
import UserRepository from "@/repositories/UserRepository";
import OAuth from "~/components/partials/OAuth";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [vendor, setVendor] = useState({
    username: "",
    email: "",
    password: "",
    store: "",
    first_name: "",
    last_name: "",
    role: "seller",
    roles:["seller"]
  });
  const [otp, setOtp] = useState({
    code: "",
    createdAt: 0,
    expiresAt: 0,
    allowResendAt: 0,
  });

  const handleInputChange = (e) => {
    setVendor((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyEmail = async () => {
    setIsLoading(true);

    try {
      const response = await AuthRepository.verifyEmail({
        name: vendor.username,
        email: vendor.email,
      });

      setOtp({
        code: response.data.code,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
        allowResendAt: Date.now() + 120000,
      });

      notification["info"]({
        message: "Email verification code sent",
      });
    } catch (error) {
      notification["error"]({
        message: "Unable to send verification code",
        description: "Please check your network connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegistration = async (type = "form", oauth) => {
    setIsLoading(true);

    let _vendor = type == "form" ? vendor : oauth

    delete _vendor.store_name;

    if (!isLoading) {
      try {
        const _admin = {
          username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        };

        const _user = {
          username: _vendor.email,
          password: _vendor.password,
        };

        // Login Admin
        const admin = await AuthRepository.login(_admin);

        // Register vendor with admin token
        const {data:newVendor} = await AuthRepository.register(_vendor, admin.token);

        // Login vendor
        const vendorData = await AuthRepository.login(_user);

        const { encrypt } = require("@/utilities/helperFunctions");

        const encryptedToken = encrypt(vendorData.token);

        localStorage.setItem("auth_token", encryptedToken);


        try {
          await SettingsRepository.updateStore(newVendor.id,{
            store_name: _vendor.store,
            store: _vendor.store,
          });
        } catch (error) {
          console.log("Error updating store name");
          console.log("error:",error);
          // console.log("response:",error.response);
          // console.log("data:",error.response.data);
          notification["error"]({
            message: "Unable to register store name",
            description: "This can be registered in the settings page",
          });
        }

        // TO-DO: Store vendor data in redux

        notification["success"]({
          message: "Registration Successful!",
        });

        Router.push("/dashboard");
      } catch (error) {
        console.log(error);
        notification["error"]({
          message: "Unable to register user",
          description:
            error.response === undefined
              ? ReactHtmlParser(String(error))
              : ReactHtmlParser(error.response.data.message),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <HomepageLayout title="Register" page="accounts">
      <div className="account-container">
        <div className="logo">
          <img src={"/img/logo_light.png"} alt="logo" />
        </div>

        {!otp.code ? (
          <Form onFinish={!isLoading && verifyEmail}>
            <p className="title mb-2" style={{ paddingBottom: 10 }}>
              Register An Account
            </p>
            <div className="form-group">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your preferred username",
                  },
                ]}
              >
                <Input
                  name="username"
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  value={vendor.username}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email",
                  },
                ]}
              >
                <Input
                  name="email"
                  className="form-control"
                  type="email"
                  placeholder="Email address"
                  value={vendor.email}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                    ),
                    message:
                      "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters include #, ?, !, @, $, %, ^, &, *, -)",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={vendor.password}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  name="store"
                  className="form-control"
                  type="text"
                  placeholder="Store name"
                  value={vendor.store}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your first name",
                  },
                ]}
              >
                <Input
                  name="first_name"
                  className="form-control"
                  type="text"
                  placeholder="First name"
                  value={vendor.first_name}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your last name",
                  },
                ]}
              >
                <Input
                  name="last_name"
                  className="form-control"
                  type="text"
                  placeholder="Last name"
                  value={vendor.last_name}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <button
                type="submit"
                className="register-btn"
                disabled={isLoading}
              >
                {isLoading ? <Spin /> : "Register"}
              </button>

              <p>
                Already have an account?
                <a
                  href="/login"
                  style={{
                    fontStyle: "italic",
                    color: "#29AAE1",
                    marginLeft: 2,
                  }}
                >
                  Login
                </a>
              </p>
              <OAuth onSuccess={(newVendor)=>{
                handleRegistration("oauth",newVendor)
              }}/>
            </div>
          </Form>
        ) : (
          <WPVerification
            email={vendor.email}
            otp={otp}
            isLoading={isLoading}
            verifyEmail={verifyEmail}
            handleRegistration={handleRegistration}
          />
        )}
      </div>
    </HomepageLayout>
  );
}
