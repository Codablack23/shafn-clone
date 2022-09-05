import { WPDomain } from "./Repository"
import axios from "axios"

class ReportsRepository {
  constructor(callback) {
    this.callback = callback
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token")

    const { decrypt } = require("~/utilities/helperFunctions")

    const config = {
      headers: {
        Authorization: `Bearer ${decrypt(auth_token)}`,
      },
    }

    return config
  }

  async getReportOverview() {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/reports/summary`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }
}

export default new ReportsRepository()
