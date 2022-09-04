import { Form, Input, notification, Spin, Divider } from "antd"
import { useState } from "react"
import HomepageLayout from "~/components/layouts/HomePageLayout"
import OAuth from "~/components/partials/OAuth"

export default function Login() {
  const [isPassword, setIsPassword] = useState(true)
  const handleShowPassword = (e) => {
    setIsPassword((prev) => !prev)
    e.target.classList.toggle("bi-eye-fill")
    e.target.classList.toggle("bi-eye-slash-fill")
  }
  return (
    <HomepageLayout title={"login"} page={"accounts"}>
      <div className="account-container">
        <div className="logo">
          <img src={"/img/logo_light.png"} alt="logo" />
        </div>

        <Form>
          <p className="title mb-2">Sign in</p>
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
                autoFocus
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
                    "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                },
              ]}
            >
              <div className="input-container">
                <input
                  type={isPassword ? "password" : "text"}
                  placeholder="Password"
                />
                <span style={{ cursor: "pointer", width: "9%" }}>
                  <i
                    className="bi bi-eye-fill"
                    style={{ fontSize: "18px" }}
                    onClick={handleShowPassword}
                  ></i>
                </span>
              </div>
            </Form.Item>

            <button className="register-btn">Login</button>

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
            <OAuth onSuccess={(user) => console.log(user)} />
          </div>
        </Form>
      </div>
    </HomepageLayout>
  )
}
