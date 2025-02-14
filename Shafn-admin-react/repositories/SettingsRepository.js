import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "./Repository";
import axios from "axios";

class SettingsRepository {
  constructor(callback) {
    this.callback = callback;
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token");

    const { decrypt } = require("@/utilities/helperFunctions");

    const config = {
      headers: {
        Authorization: `Bearer ${decrypt(auth_token)}`,
      },
    };

    return config;
  }

  async getStore() {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/settings`;
    const config = this.getConfig();

    const { data: response } = await axios.get(endpoint, config);

    return response;
  }

  async getStoreById(id) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/stores/${id}`;
    const config = this.getConfig();

    const { data: response } = await axios.get(endpoint, config);

    return response;
  }

  async updateStore(id, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/stores/${id}`;
    const config = this.getConfig();

    const { data: response } = await axios.put(endpoint, payload, config);

    return response;
  }
}

export default new SettingsRepository();
