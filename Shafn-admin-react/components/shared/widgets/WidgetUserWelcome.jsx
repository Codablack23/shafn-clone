import React, { useState, useEffect } from "react";
import Router from "next/router";

import axios from "axios";

const WidgetUserWelcome = () => {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
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

    // Get user id
    axios
      .get("https://shafn.com/wp-json/wp/v2/users/me", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        // Get user profile picture
        axios
          .get(`https://shafn.com/wp-json/dokan/v1/stores/${res.data.id}`, {
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          })
          .then((res) => {
            setAvatarUrl(res.data.gravatar);
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={avatarUrl.toString()} alt="" style={styles.img} />
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

const styles = {
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
};

export default WidgetUserWelcome;
