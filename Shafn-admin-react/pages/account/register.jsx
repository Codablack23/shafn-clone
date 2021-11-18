import React from "react";
import Head from "next/head";
import Register from "~/components/partials/account/Register";

const RegisterPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Register an account",
    },
  ];

  return (
    <div className="ps-page--my-account">
      <Head>
        <title>{process.env.title} | Register</title>
      </Head>
      <Register />
    </div>
  );
};

export default RegisterPage;
