import Router from "next/router"
import { notification } from "antd"
import { WPDomain } from "./Repository"
import axios from "axios"

class UserRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getUser() {
    const endpoint = `${WPDomain}/wp-json/wp/v2/users/me`
    const auth_token = localStorage.getItem("auth_token")
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }
    const response = await axios.get(endpoint, config).then((res) => res.data)

    return response
  }

  async getAuthToken(user) {
    const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token`
    const response = await axios.post(endpoint, user).then((res) => res.data)

    return response
  }
}

export default new UserRepository()
