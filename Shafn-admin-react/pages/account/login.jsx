import React from "react";
import Head from "next/head";
import Login from "~/components/partials/account/Login";

const LoginPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Login",
    },
  ];
  return (
    <div className="ps-page--my-account">
      <Head>
        <title>{process.env.title} | Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
