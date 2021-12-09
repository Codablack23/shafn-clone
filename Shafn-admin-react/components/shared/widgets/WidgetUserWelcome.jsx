import React, { useState, useEffect } from "react";
import Router from "next/router";

import axios from "axios";

const WidgetUserWelcome = () => {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Get store name
    let auth_token = localStorage.getItem("auth_token");

    // Get store name
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
        window.location.assign("http://localhost:3000/account/login");
      });

    // Get profile picture
    axios
      .get("https://shafn.com/wp-json/wp/v2/users/me", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        setAvatarUrl(res.data.avatar_urls[48]);
      })
      .catch((err) => {
        return;
      });
  }, []);

  // /img/user/admin.jpg
  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{name || "Vendor"}</a>
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
