import React, { useState, useEffect } from "react";
import axios from "axios";

import { WPDomain } from "~/repositories/Repository";

const TableCategoryItems = () => {
  const [categories, setCategories] = useState([]);

  const tableItems = categories.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <strong>{item.name}</strong>
        </td>
        <td>{item.slug}</td>
        <td>
          <div className="dropdown">
            <a
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="icon-ellipsis"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Edit
              </a>
              <a className="dropdown-item" href="#">
                Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    axios
      .get(`${WPDomain}/wp-json/wp/v2/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        return;
      });
  }, []);
  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>Category name</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
};

export default TableCategoryItems;
