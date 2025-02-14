import { WPDomain } from "./Repository"
import axios from "axios"

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
};

const oathInfo = {
  consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY
      ? process.env.NEXT_PUBLIC_CONSUMER_KEY
      : process.env.CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET
      ? process.env.NEXT_PUBLIC_CONSUMER_SECRET
      : process.env.CONSUMER_SECRET,
};

class UserRepository {
  constructor(callback) {
    this.callback = callback
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token")

    const { decrypt } = require("@/utilities/helperFunctions")

    const config = {
      headers: {
        Authorization: `Bearer ${decrypt(auth_token)}`,
      },
    }

    return config
  }

  async getUser() {
   try {
    const endpoint = `${WPDomain}/wp-json/wp/v2/users/me`
    const config = this.getConfig()
    const { data: response } = await axios.get(endpoint, config)

    return response
   } catch (error) {
    return null;
   }
  }

  async getUsers() {
    const enpoint = `/wp-json/wp/v2/users/?${serializeQuery({
        ...oathInfo,
    })}`;
    // const config = this.getConfig()
    const reponse = await axios.get(`${WPDomain}/${enpoint}`).then(
        (response) => response.data
    );

    return reponse;
 }

  async getUserById(id) {
    const enpoint = `/wp-json/wc/v3/customers/${id}?${serializeQuery({
        ...oathInfo,
    })}`;
    const reponse = await axios.get(`${WPDomain}/${enpoint}`).then(
        (response) => response.data
    );

    return reponse;
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
