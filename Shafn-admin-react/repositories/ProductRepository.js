import { notification } from "antd"
import { WPDomain, oathInfo, serializeQuery } from "./Repository"
import FileRepository from "./FileRepository"

import axios from "axios"
import UserRepository from "./UserRepository"

class ProductRepository {
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

  async createVariation(productId, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productId}/variations`
    const config = this.getConfig()

    const { data: response } = await axios.post(endpoint, payload, config)

    return response
  }

  async createVariations(productId, attributePairs) {
    let variations = []

    for (const attributePair of Array.from(attributePairs)) {
      try {
        let payload = {
          attributes: attributePair,
        }
        let variation = await this.createVariation(productId, payload)

        variations.push(variation)
      } catch (error) {
        console.log("!!! CREATING VARIATIONS FAILED !!!")
        console.log(error)
      }
    }

    return variations
  }

  async _updateVariation(productId, variationId, payload) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productId}/variations/${variationId}`
    const config = this.getConfig()

    const { data: response } = await axios.put(endpoint, payload, config)

    return response
  }

  async deleteVariation(productID, variationID) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${productID}/variations/${variationID}`
    const config = this.getConfig()

    const response = await axios.delete(endpoint, config)

    return response
  }

  async saveVariations(productID, variations) {
    let productVariations = []

    const updateVariation = async (variation, image) => {
      let in_stock =
        variation.in_stock === true || variation.in_stock === "true"

      // Manage_stock data type is boolean but defau;t value is string "parant"
      let manage_stock =
        typeof variation.manage_stock === "string"
          ? false
          : variation.manage_stock

      let stock_quantity = !in_stock ? 0 : Number(variation.stock_quantity)

      let price = variation.price || variation.regular_price

      const variationData = {
        ...variation,
        in_stock,
        manage_stock,
        stock_quantity,
        price,
        image,
      }

      const productVariation = await this._updateVariation(
        productID,
        variation.id,
        variationData
      )

      productVariations.push(productVariation)
    }

    for (const variation of Array.from(variations)) {
      // Upload Image
      if (typeof variation.image.src === "string") {
        await updateVariation(variation, variation.image)
      } else {
        try {
          const image = await FileRepository.uploadImage(variation.image.src)
          updateVariation(variation, { src: image })
        } catch (error) {
          notification["error"]({
            message:
              "Some images did not upload!. Check your data connection and try again.",
          })
        }
      }
    }

    const variationsIdList = productVariations.map((variation) => variation.id)
    const product = await this.updateProduct(productID, {
      variations: variationsIdList,
    })

    return product.variations
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
