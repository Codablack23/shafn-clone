import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Spin } from "antd"
import axios from "axios"
import DropdownAction from "~/components/elements/basic/DropdownAction"
import { WPDomain } from "~/repositories/Repository"
import OrdersRepository from "~/repositories/OrdersRepository"

const TableOrderSummary = () => {
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(true)

  let tableItemsView

  if (orders && orders.items) {
    tableItemsView = orders.items.map((item) => {
      let status, fullfillmentView
      const menuView = (
        <Menu>
          <Menu.Item key={0}>
            <a className="dropdown-item" href="#">
              Edit
            </a>
          </Menu.Item>
          <Menu.Item key={0}>
            <a className="dropdown-item" href="#">
              <i className="icon-t"></i>
              Delete
            </a>
          </Menu.Item>
        </Menu>
      )
      // if (item.status === "completed") {
      //   status = <span className="ps-badge success">Paid</span>;
      // } else {
      //   status = <span className="ps-badge gray">Unpaid</span>;
      // }

      if (item.status === "completed" || item.status === "refunded") {
        status = <span className="ps-fullfillment success">{item.status}</span>
      } else if (item.status === "failed" || item.status === "cancelled") {
        status = <span className="ps-fullfillment danger">{item.status}</span>
      } else {
        status = <span className="ps-fullfillment warning">{item.status}</span>
      }

      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <strong>{item.total}</strong>
          </td>
          <td>{status}</td>
          <td>
            <Link href="/orders/order-detail">
              <a>
                <strong>{item.customer_id}</strong>
              </a>
            </Link>
          </td>
          <td>
            <strong>{new Date(item.date_created).toDateString()}</strong>
          </td>

          <td>
            <DropdownAction />
          </td>
        </tr>
      )
    })
  }

  const getOrders = async () => {
    const params = {
      page: 1,
      per_page: 5,
    }

    try {
      const orders = await OrdersRepository.getOrders(params)
      setOrders(orders)
    } catch (error) {
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  if (loading) {
    return <Spin />
  } else if (orders && orders.totalItems === "0") {
    return <p>No orders yet</p>
  } else {
    return (
      <div className="table-responsive">
        <table className="table ps-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableItemsView}</tbody>
        </table>
      </div>
    )
  }
}

export default TableOrderSummary
