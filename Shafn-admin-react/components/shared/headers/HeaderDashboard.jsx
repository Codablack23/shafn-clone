import React, { useState, useEffect } from "react";
import Link from "next/link";
import FormHeaderSearch from "~/components/shared/forms/FormHeaderSearch";
import { useSelector } from "react-redux";
import axios from "axios";
import { WPDomain } from "~/repositories/Repository";

const HeaderDashboard = ({
  title = "Dashboard",
  description = "Everything here",
}) => {
  const store_name = useSelector((state) => state.profile.name);
  const [id, setId] = useState("");

  let query = `${store_name.toLowerCase().replace(/ /g, "-")}-${id}`.trim();

  useEffect(() => {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    axios
      .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
      .then((res) => {
        setId(res.data.id);
      })
      .catch((err) => {
        return;
      });
  }, []);
  return (
    <header className="header--dashboard">
      <div className="header__left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header__center">
        <FormHeaderSearch />
      </div>
      <div className="header__right">
        {id && (
          <Link
            href="http://localhost:3000/store/[pid]"
            as={`http://localhost:3000/store/${query}`}
          >
            <a className="header__site-link">
              <span>View your store</span>
              <i className="icon-exit-right"></i>
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
