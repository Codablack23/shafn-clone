import Router from "next/router"
import { notification } from "antd"
import { WPDomain } from "./Repository"
import axios from "axios"

class UserRepository {
  constructor(callback) {
    this.callback = callback
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token")

    const { decrypt } = require("~/utilities/helperfunctions")

    const config = {
      headers: {
        Authorization: `Bearer ${decrypt(auth_token)}`,
      },
    }

    return config
  }

  async getUser() {
    const endpoint = `${WPDomain}/wp-json/wp/v2/users/me`
    const config = this.getConfig()
    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async getAuthToken(user) {
    const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token`
    const { data: response } = await axios.post(endpoint, user)

    return response
  }

  async validateAuthToken(token) {
    const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token/validate`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(config)
    const { data: response } = await axios.post(endpoint, config)

    return response
  }
}

export default new UserRepository()
