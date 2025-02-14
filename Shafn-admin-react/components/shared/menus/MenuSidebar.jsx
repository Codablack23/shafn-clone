import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "antd";

const MenuSidebar = () => {
  const router = useRouter();
  const [logoutModalOpen,setModalLogoutOpen] = useState(false);

  const openLogoutModal = ()=> setModalLogoutOpen(true);
  const closeLogoutModal = ()=>setModalLogoutOpen(false);

  const logout = () => {
    localStorage.removeItem("auth_token");
    window.location.assign(`/login`);
  };

  const menuItems = [
    {
      text: "Dashboard",
      url: "/dashboard",
      icon: "icon-home",
    },
    {
      text: "Products",
      url: "/products",
      icon: "icon-database",
    },
    {
      text: "Orders",
      url: "/orders",
      icon: "icon-bag2",
    },
    // {
    //   text: "Withdraw",
    //   url: "/withdraw",
    //   icon: "icon-users2",
    // },
    // {
    //   text: "Categories",
    //   url: "/categories",
    //   icon: "icon-database",
    // },
    {
      text: "Settings",
      url: "/settings",
      icon: "icon-cog",
    },
    {
      text: "My Store",
      url: "/store",
      icon: "bi bi-shop",
    },
  ];

  return (
    <>
    <Modal visible={logoutModalOpen} onCancel={closeLogoutModal} footer={null} closeIcon={null}>
      <div className="logout-confirmation">
        <p className="title">Are you sure you want to Logout</p>
         <div className="action">
            <button onClick={closeLogoutModal}>Cancel</button>
            <button onClick={logout}>Continue</button>
         </div>
      </div>
    </Modal>
    <ul className="menu">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={router.pathname === item.url ? "active" : ""}
        >
          <Link href={item.url}>
            <a className="w3-text-orange">
              <i className={item.icon}></i>
              {item.text}
            </a>
          </Link>
        </li>
      ))}
      <li onClick={openLogoutModal}>
        <a>
          <i className="icon-exit"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
    </>
  );
};

export default MenuSidebar;
