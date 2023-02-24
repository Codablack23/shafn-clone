import React from "react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";

import DropdownAction from "~/components/elements/basic/DropdownAction";
import { MAIN_DOMAIN } from "~/repositories/Repository";

const TableProjectItems = ({ products, page }) => {
  let tableItems;

  if (products && Number(products.totalItems) > 0) {
    tableItems = products.items.map((item, index) => {
      let status;
      let badgeView;
      if (item.status === "publish") {
        status = <span className="ps-badge success">Online</span>;
      } else {
        status = <span className="ps-badge gray">{item.status}</span>;
      }

      if (item.in_stock) {
        badgeView = <span className="ps-badge success">Stock</span>;
      } else {
        badgeView = <span className="ps-badge gray">Out of stock</span>;
      }

      return (
        <Link href={`${MAIN_DOMAIN}/product/${item.slug}-${item.id}`}>
          <tr key={item.id}>
            <td>{index + 1 + 10 * (page - 1)}</td>
            <td>
              <strong>{item.name}</strong>
            </td>
            <td>{status}</td>
            <td>{item.sku}</td>
            <td>{badgeView}</td>
            <td>
              <strong>{item.price}</strong>
            </td>
            <td>
              {item.categories.map((category) => (
                <span key={category.name}>
                  {ReactHtmlParser(category.name)}
                </span>
              ))}
            </td>
            <td>{new Date(item.date_created).toDateString()}</td>
            <td>
              <DropdownAction productID={item.id} />
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
            <th>Name</th>
            <th>Status</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
};

export default TableProjectItems;
