import { Form, Input, notification, Spin, Divider } from "antd"
import { useState } from "react"
import HomepageLayout from "~/components/layouts/HomePageLayout"
import { useDispatch } from "react-redux"
import AuthRepository from "~/repositories/AuthRepository"
import SettingsRepository from "~/repositories/SettingsRepository"
import OAuth from "~/components/partials/OAuth"
import Router from "next/router"
import ReactHtmlParser from "react-html-parser"

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [vendor, setVendor] = useState({
    username: "",
    email: "",
    password: "",
    store_name: "",
    first_name: "",
    last_name: "",
    roles: ["seller"],
  })
  const [otp, setOtp] = useState({
    code: "",
    createdAt: 0,
    expiresAt: 0,
    allowResendAt: 0,
  })

  const handleInputChange = (e) => {
    setVendor((current) => ({
      ...current,
      [e.target.name]: [e.target.value],
    }))
  }

  const verifyEmail = async () => {
    setIsLoading(true)

    try {
      console.log("Sending verification code...")
      const response = await AuthRepository.verifyEmail({
        name: vendor.username,
        email: vendor.email,
      })

      setOtp({
        code: response.data.code,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
        allowResendAt: Date.now() + 120000,
      })

      notification["info"]({
        message: "Email verification code sent",
      })
    } catch (error) {
      notification["error"]({
        message: "Unable to send verification code",
        description: "Please check your network connection and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegistration = async (type = "form", oauth) => {
    setIsLoading(true)

    let _vendor = vendor

    delete _vendor.store_name

    if (type === "oauth") {
      _vendor = {
        ..._vendor,
        first_name: oauth.first_name,
        last_name: oauth.last_name,
      }
    }

    if (!isLoading) {
      try {
        const _admin = {
          username: process.env.username,
          password: process.env.password,
        }

        const _user = {
          username: _vendor.email,
          password: _vendor.password,
        }

        // Login Admin
        const admin = await AuthRepository.login(_admin)

        // Register vendor with admin token
        await AuthRepository.register(_vendor, admin.token)

        // Login vendor
        const vendorData = await AuthRepository.login(_user)

        try {
          await SettingsRepository.updateStore(vendorData.id, {
            store_name: vendor.store_name,
          })
        } catch (error) {
          notification["error"]({
            message: "Unable to register store name",
            description: "This can be registered in the settings page",
          })
        }

        // TO-DO: Store vendor data in redux

        notification["success"]({
          message: "Registration Successful!",
        })

        Router.push("/dashboard")
      } catch (error) {
        notification["error"]({
          message: "Unable to register user",
          description:
            error.response === undefined
              ? ReactHtmlParser(String(error))
              : ReactHtmlParser(error.response.data.message),
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <HomepageLayout title="Register" page="accounts">
      <div className="account-container">
        <div className="logo">
          <img src={"/img/logo_light.png"} alt="logo" />
        </div>

        <Form onFinish={!isLoading && verifyEmail}>
          <p className="title mb-2" style={{ paddingBottom: 10 }}>
            Register An Account
          </p>
          <div className="form-group">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your preferred username",
                },
              ]}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Username"
                value={vendor.username}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                className="form-control"
                type="email"
                placeholder="Email address"
                value={vendor.email}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="password"
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
                className="form-control"
                placeholder="Password"
                value={vendor.password}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item name="store_name">
              <Input
                className="form-control"
                type="text"
                placeholder="Store name"
                value={vendor.store_name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name",
                },
              ]}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="First name"
                value={vendor.first_name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name",
                },
              ]}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Last name"
                value={vendor.last_name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <button type="submit" className="register-btn" disabled={isLoading}>
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

            <Divider>OR</Divider>
            <OAuth onSuccess={(user) => console.log(user)} />
          </div>
        </Form>
      </div>
    </HomepageLayout>
  )
}
