import React from "react"
import Link from "next/link"
import { Menu } from "antd"

const TableOrdersItems = ({ orders }) => {
  let tableItemsView

  if (orders && Number(orders.totalItems) > 0) {
    tableItemsView = orders.items.map((item) => {
      let status

      if (item.status === "completed" || item.status === "refunded") {
        status = <span className="ps-fullfillment success">{item.status}</span>
      } else if (item.status === "failed" || item.status === "cancelled") {
        status = <span className="ps-fullfillment danger">{item.status}</span>
      } else {
        status = <span className="ps-fullfillment warning">{item.status}</span>
      }

      return (
        <tr key={item.id}>
          <td>
            <Link href="/orders/[oid]" as={`/orders/${item.id}`}>
              <a>
                <strong>{item.id}</strong>
              </a>
            </Link>
          </td>
          <td>{status}</td>
          <td>
            <strong>{item.total}</strong>
          </td>

          <td>
            <p>
              {item.billing.first_name} {item.billing.last_name},{" "}
              {item.billing.address_1}, {item.billing.city} {item.billing.state}{" "}
              {item.billing.postcode}, {item.billing.country}
            </p>
            <p>via {item.payment_method_title}</p>
          </td>
          <td>
            <strong>{new Date(item.date_created).toDateString()}</strong>
          </td>

          <td>
            <Menu>
              <Menu.Item key={0}>
                <a className="dropdown-item" href="#">
                  <i className="icon-t"></i>
                  Delete
                </a>
              </Menu.Item>
            </Menu>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Billing</th>
            <th>Date</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>{tableItemsView}</tbody>
      </table>
    </div>
  )
}

export default TableOrdersItems
