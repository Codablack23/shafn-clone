import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "./Repository";
import axios from "axios";

class SettingsRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getStorename() {
    let auth_token = localStorage.getItem("auth_token");
    const response = axios
      .get(`${WPDomain}/wp-json/dokan/v1/settings`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        return res.data.store_name;
      })
      .catch((err) => {
        return;
      });

    return response;
  }
}

export default new SettingsRepository();
