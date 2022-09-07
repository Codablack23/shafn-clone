import { WPDomain, oathInfo, serializeQuery } from "./Repository"
import axios from "axios"

class DataRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getCountries() {
    const endpoint = `${WPDomain}/wp-json/wc/v3/data/countries?${serializeQuery(
      {
        ...oathInfo,
      }
    )}`

    const response = axios.get(endpoint).then((res) => res.data)

    return response
  }
}

export default new DataRepository()
