import React from "react";
import Link from "next/link";

const TableOrdersItems = ({ orders, page }) => {
  let tableItemsView;

  if (orders && orders.items.length > 0) {
    tableItemsView = orders.items.map((item, index) => {
      let status;

      if (item.status === "completed" || item.status === "refunded") {
        status = <span className="ps-fullfillment success">{item.status}</span>;
      } else if (item.status === "failed" || item.status === "cancelled") {
        status = <span className="ps-fullfillment danger">{item.status}</span>;
      } else {
        status = <span className="ps-fullfillment warning">{item.status}</span>;
      }

      return (
        <Link href="/orders/[oid]" as={`/orders/${item.id}`}>
          <tr key={item.id}>
            <td>
              <strong>{index + 1 + 10 * (page - 1)}</strong>
            </td>
            <td>{status}</td>
            <td>
              <strong>{item.total}</strong>
            </td>

            <td>
              <p>
                {item.billing.first_name} {item.billing.last_name},{" "}
                {item.billing.address_1}, {item.billing.city}{" "}
                {item.billing.state} {item.billing.postcode},{" "}
                {item.billing.country}
              </p>
              {/* <p>via {item.payment_method_title}</p> */}
            </td>
            <td>
              <strong>{new Date(item.date_created).toDateString()}</strong>
            </td>
          </tr>
        </Link>
      );
    });
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
          </tr>
        </thead>
        <tbody>{tableItemsView}</tbody>
      </table>
    </div>
  );
};

export default TableOrdersItems;
