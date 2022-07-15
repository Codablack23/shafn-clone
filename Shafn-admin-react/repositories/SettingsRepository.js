import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "./Repository";
import axios from "axios";

class SettingsRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getStore() {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/settings`;
    const auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
    const response = await axios.get(endpoint, config).then((res) => res.data);

    return response;
  }

  async getStoreById(id) {
    const auth_token = localStorage.getItem("auth_token");
    const endpoint = `${WPDomain}/wp-json/dokan/v1/stores/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = await axios.get(endpoint, config).then((res) => res.data);

    return response;
  }

  async updateStore(id, payload) {
    const auth_token = localStorage.getItem("auth_token");
    const endpoint = `${WPDomain}/wp-json/dokan/v1/stores/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = await axios
      .put(endpoint, payload, config)
      .then((res) => res.data);

    return response;
  }
}

export default new SettingsRepository();
