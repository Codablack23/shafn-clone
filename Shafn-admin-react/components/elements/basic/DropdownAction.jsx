import React from "react";
import { Dropdown, Menu, notification } from "antd";
import axios from "axios";
import Router from "next/router";

const DropdownAction = ({ productID }) => {
  const goToEditPage = () => {
    Router.push(`/products/edit-product/${productID}`);
  };

  const deleteProduct = (id) => {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    axios
      .delete(`https://shafn.com/wp-json/dokan/v1/products/${id}`, config)
      .then((res) => {
        notification["success"]({
          message: "Product Deleted!",
        });
        window.location.reload();
      })
      .catch((err) => {
        notification["error"]({
          message: "Failed to delete this product",
          description: "Check your data connection and try again.",
        });
      });
  };
  const menuView = (
    <Menu>
      <Menu.Item key={0}>
        <a className="dropdown-item" href="#" onClick={goToEditPage}>
          <i className="icon-pencil mr-2"></i>
          Edit
        </a>
      </Menu.Item>
      <Menu.Item key={0}>
        <a
          className="dropdown-item"
          href="#"
          onClick={deleteProduct.bind(this, productID)}
        >
          <i className="icon-trash2 mr-2"></i>
          Delete
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menuView} className="ps-dropdown">
      <a onClick={(e) => e.preventDefault()} className="ps-dropdown__toggle">
        <i className="icon-ellipsis"></i>
      </a>
    </Dropdown>
  );
};

export default DropdownAction;
