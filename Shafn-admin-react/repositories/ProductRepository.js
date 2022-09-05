import { WPDomain, oathInfo, serializeQuery } from "./Repository"

import axios from "axios"
import UserRepository from "./UserRepository"

class ProductRepository {
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

  async getProducts(payload) {
    const endpoint = payload
      ? `${WPDomain}/wp-json/dokan/v1/products?${serializeQuery({
          ...payload,
          ...oathInfo,
        })}`
      : `${WPDomain}/wp-json/dokan/v1/products`
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

  async getProductByID(id) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${id}`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async uploadProduct(payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/`
    const config = this.getConfig()

    const response = await axios.post(endpoint, payload, config)

    return response
  }

  async updateProduct(id, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${id}`
    const config = this.getConfig()

    const { data: response } = await axios.put(endpoint, payload, config)

    return response
  }

  async deleteProduct(id) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${id}`
    const config = this.getConfig()

    const { data: response } = await axios.delete(endpoint, config)

    return response
  }

  async getProductAttributes() {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/attributes`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async getProductAttributeTerms(attributeId) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/attributes/${attributeId}/terms`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async getUserAttributes() {
    const attributes = await this.getProductAttributes()

    let values = []

    for (const attribute of Array.from(attributes)) {
      const terms = await this.getProductAttributeTerms(attribute.id)
      values.push(terms)
    }

    const userAttributes = Array.from(attributes).map((attribute, index) => ({
      id: attribute.id,
      name: attribute.name,
      values: values[index],
    }))

    return userAttributes
  }

  async getVariations(productId) {
    const endpoint = `${WPDomain}/wp-json/wc/v3/products/${productId}/variations`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async getVariationById(productId, variationId) {
    const endpoint = `${WPDomain}/wp-json/wc/v3/products/${productId}/variations/${variationId}`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async createVariation(productId, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productId}/variations`
    const config = this.getConfig()

    const { data: response } = await axios.post(endpoint, payload, config)

    return response
  }

  async createVariations(productId, attributePairs) {
    // console.log("Creating Variations...")

    let variations = []

    for (const attributePair of Array.from(attributePairs)) {
      try {
        let payload = {
          attributes: attributePair,
        }
        let variation = await this.createVariation(productId, payload)

        variations.unshift(variation)
      } catch (error) {
        // console.log("!!! FAILED TO CREATE VARIATIONS !!!")
        // console.log(error)
      }
    }

    // console.log("Created Variations Successfully")

    return variations
  }

  async updateVariation(productId, variationId, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productId}/variations/${variationId}`
    const config = this.getConfig()

    const { data: response } = await axios.put(endpoint, payload, config)

    return response
  }

  async updateVariations(productId, variations) {
    // console.log("Updating Variations...")

    let updatedVariations = []
    for (const variation of Array.from(variations)) {
      try {
        const updatedVariation = await this.updateVariation(
          productId,
          variation.id,
          variation
        )
        updatedVariations.push(updatedVariation)
      } catch (error) {
        // console.log(`!!! FAILED TO UPDATE VARIATION ${variation.id} !!!`)
        // console.log(error)
      }
    }

    // console.log("Updated Variations Successfully")

    return updatedVariations
  }

  async deleteVariation(productID, variationID) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productID}/variations/${variationID}`
    const config = this.getConfig()

    await axios.delete(endpoint, config)
  }

  async deleteVariations(productId, variations) {
    // console.log("Deleting Variations...")

    for (const variation of Array.from(variations)) {
      try {
        await this.deleteVariation(productId, variation.id, variation)
      } catch (error) {
        // console.log(`!!! FAILED TO DELETE VARIATION ${variation.id} !!!`)
        // console.log(error)
      }
    }

    // console.log("Deleted Variations Successfully")
  }

  async getCategories() {
    const endpoint = `${WPDomain}/wp-json/wc/v3/products/categories`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async getTags() {
    const endpoint = `${WPDomain}/wp-json/wc/v3/products/tags`
    const config = this.getConfig()

    const { data: response } = await axios.get(endpoint, config)

    return response
  }

  async addTag(name) {
    const adminLogin = {
      username: process.env.username,
      password: process.env.password,
    }

    const admin = await UserRepository.getAuthToken(adminLogin)

    const config = {
      headers: {
        Authorization: `Bearer ${admin.data.token}`,
      },
    }

    const endpoint = `${WPDomain}/wp-json/wc/v3/products/tags`

    const { data: response } = await axios.post(
      endpoint,
      {
        name,
      },
      config
    )

    return response
  }
}

export default new ProductRepository()
