import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "./Repository";
import axios from "axios";

class OrdersRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getOrders() {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/dokan/v1/orders/`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    return response;
  }
}

export default new OrdersRepository();
