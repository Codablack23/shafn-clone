import React, { useState, useEffect } from "react";
import Router from "next/router";

import axios from "axios";

const WidgetUserWelcome = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Get store name
    let auth_token = localStorage.getItem("auth_token");
    axios
      .get("https://shafn.com/wp-json/dokan/v1/settings", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        setName(res.data.store_name);
      })
      .catch((err) => {
        Router.push("/account/login");
      });
  }, []);
  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src="/img/user/admin.jpg" alt="" />
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{name}</a>
        </p>
      </div>
      <div className="ps-block__action">
        <a href="#">
          <i className="icon-exit"></i>
        </a>
      </div>
    </div>
  );
};

export default WidgetUserWelcome;
