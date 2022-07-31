import { WPDomain, oathInfo, serializeQuery } from "./Repository"
import axios from "axios"

class OrdersRepository {
  constructor(callback) {
    this.callback = callback
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token")
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }

    return config
  }

  async getOrders(payload) {
    const endpoint = payload
      ? `${WPDomain}/wp-json/dokan/v1/orders?${serializeQuery({
          ...payload,
          ...oathInfo,
        })}`
      : `${WPDomain}/wp-json/dokan/v1/orders`
    const config = this.getConfig()

    const response = axios.get(endpoint, config).then((res) => {
      if (res.data && res.data.length > 0) {
        const data = {
          items: res.data,
          totalItems: res.headers["x-wp-total"],
          totalPages: res.headers["x-wp-totalpages"],
        }
        return data
      } else return null
    })

    return response
  }
}

export default new OrdersRepository()
