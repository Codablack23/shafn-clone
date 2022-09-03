import React from "react"
import { Dropdown, Menu, notification } from "antd"
import Router from "next/router"
import ProductRepository from "~/repositories/ProductRepository"

const DropdownAction = ({ productID }) => {
  const goToEditPage = () => {
    Router.push(`/products/edit-product/${productID}`)
  }

  const deleteProduct = async () => {
    try {
      await ProductRepository.deleteProduct(productID)

      Router.reload(window.location.pathname)
    } catch (error) {
      notification["error"]({
        message: "Unable to delete product",
        description: "Please check your data connection and try again.",
      })
    }
  }
  const menuView = (
    <Menu>
      <Menu.Item key={0}>
        <a className="dropdown-item" href="#" onClick={goToEditPage}>
          <i className="icon-pencil mr-2"></i>
          Edit
        </a>
      </Menu.Item>
      <Menu.Item key={0}>
        <a className="dropdown-item" href="#" onClick={deleteProduct}>
          <i className="icon-trash2 mr-2"></i>
          Delete
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menuView} className="ps-dropdown">
      <a onClick={(e) => e.preventDefault()} className="ps-dropdown__toggle">
        <i className="icon-ellipsis"></i>
      </a>
    </Dropdown>
  )
}

export default DropdownAction
