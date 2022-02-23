import React, { useState, useEffect } from "react";
import axios from "axios";

import DropdownAction from "~/components/elements/basic/DropdownAction";
import { WPDomain } from "~/repositories/Repository";
import ProductRepository from "~/repositories/ProductRepository";

const TableProjectItems = () => {
  const [productItems, setProductItems] = useState(null);

  let tableItems;

  if (productItems) {
    tableItems = productItems.map((item, index) => {
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
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            <a href="#">
              <strong>{item.name}</strong>
            </a>
          </td>
          <td>{status}</td>
          <td>{item.sku}</td>
          <td>{badgeView}</td>
          <td>
            <strong>{item.price}</strong>
          </td>
          <td>
            <p className="ps-item-categories">
              {item.categories.map((category) => (
                <a href="#" key={category.name}>
                  {category.name}
                </a>
              ))}
            </p>
          </td>
          <td>{item.date_created}</td>
          <td>
            <DropdownAction productID={item.id} />
          </td>
        </tr>
      );
    });
  }

  useEffect(() => {
    const getProducts = async () => {
      const products = await ProductRepository.getProducts();
      setProductItems(products);
    };

    getProducts();
  }, []);
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
