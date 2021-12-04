import React, { useEffect } from "react";
import Router from "next/router";

const Token = ({ token }) => {
  useEffect(() => {
    localStorage.setItem("auth_token", token);
    Router.push("/");
  }, []);
  return <></>;
};

Token.getInitialProps = async ({ query }) => {
  let token = query.token;

  return { token };
};

export default Token;
