import React, { useState, useEffect } from "react";
import Link from "next/link";
import FormHeaderSearch from "~/components/shared/forms/FormHeaderSearch";
import { useSelector } from "react-redux";
import axios from "axios";
import { MAIN_DOMAIN, WPDomain } from "~/repositories/Repository";


const HeaderDashboard = ({
  title = "Dashboard",
  description = "Everything here",
}) => {
  const store_name = useSelector((state) => state.profile.name);
  const [id, setId] = useState("");

  // const query = `${store_name.toLowerCase().replace(/ /g, "-")}-${id}`.trim();
  
  const query = "/storepage/"; 



  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");

    if(auth_token){
      const { decrypt } = require("~/utilities/helperFunctions");

      const config = {
        headers: {
          Authorization: `Bearer ${decrypt(auth_token)}`,
        },
      };
    }

    // axios
    //   .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
    //   .then((res) => {
    //     setId(res.data.id);
    //   })
    //   .catch((err) => {
    //     return;
    //   });
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
        {
          // <Link
          //   href={`${MAIN_DOMAIN}/store/[pid]`}
          //   as={`${MAIN_DOMAIN}/store/${query}`}
          // >
             <Link
                href={query} 
             >
            <a className="header__site-link">
              <span>View your store</span>
              <i className="icon-exit-right"></i>
            </a>
          </Link>
        }
      </div>
    </header>
  );
};

export default HeaderDashboard;
