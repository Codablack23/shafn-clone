import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";

import axios from "axios";
import { Form, Input } from "antd";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [storename, setStorename] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const adLog = {
      username: "floppiessofficial@gmail.com",
      password: "ShafN2021",
    };

    const regData = {
      username,
      email,
      password,
      first_name: firstname,
      last_name: lastname,
      roles: ["seller"],
    };

    const storeData = {
      store_name: storename,
    };

    let adminToken;

    // Get admin token
    axios
      .post("https://shafn.com/wp-json/jwt-auth/v1/token", adLog)
      .then((res) => {
        adminToken = res.data.token;

        // Register user
        axios
          .post("https://shafn.com/wp-json/wp/v2/users", regData, {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          })
          .then((res) => {
            const userLog = {
              username: email,
              password,
            };

            // Get user token
            axios
              .post("https://shafn.com/wp-json/jwt-auth/v1/token", userLog, {
                headers: {
                  Authorization: `Bearer ${adminToken}`,
                },
              })
              .then((res) => {
                const userToken = res.data.token;
                localStorage.setItem("auth_token", userToken);

                // Update store data
                axios
                  .put(
                    "https://shafn.com/wp-json/dokan/v1/settings",
                    storeData,
                    {
                      headers: {
                        Authorization: `Bearer ${userToken}`,
                      },
                    }
                  )
                  .then((res) => {
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
              })
              .catch((err) => {
                if (err.response === undefined) {
                  alert(err);
                } else {
                  alert(err.response.data.message);
                }
                setIsLoading(false);
              });
          })
          .catch((err) => {
            if (err.response === undefined) {
              alert(err);
            } else {
              alert(err.response.data.message);
            }
            setIsLoading(false);
          });
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
          onFinish={!isLoading && handleSubmit}
        >
          <ul className="ps-tab-list">
            <li>
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
            <li className="active">
              <Link href="/account/register">
                <a>Register</a>
              </Link>
            </li>
          </ul>
          <div
            className="ps-tab active"
            id="register"
            style={{ boxShadow: "0px 0px 10px #cdcdcd" }}
          >
            <div className="ps-form__content">
              <h5>Register An Account</h5>

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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="email"
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
                      pattern: new RegExp(
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                      ),
                      message:
                        "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character(allowed characters => #, ?, !, @, $, %, ^, &, *, -)",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item
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
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item
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
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item
                  name="text"
                  rules={[
                    {
                      required: true,
                      message: "Please input your preferred store name",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Store Name"
                    value={storename}
                    onChange={(e) => setStorename(e.target.value)}
                  />
                </Form.Item>
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
                    "Register"
                  )}
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              <p>Connect with:</p>
              <ul className="ps-list--social">
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="google" href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
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

export default Register;
