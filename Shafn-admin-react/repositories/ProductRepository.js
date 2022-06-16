import Router from "next/router";
import { notification } from "antd";
import { WPDomain, oathInfo, serializeQuery } from "./Repository";
import FileRepository from "./FileRepository";

import axios from "axios";

class ProductRepository {
  constructor(callback) {
    this.callback = callback;
  }

  getConfig() {
    const auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    return config;
  }

  async getProducts(payload) {
    const endpoint = payload
      ? `${WPDomain}/wp-json/dokan/v1/products?${serializeQuery({
          ...payload,
          ...oathInfo,
        })}`
      : `${WPDomain}/wp-json/dokan/v1/products`;
    const config = this.getConfig();

    const response = axios.get(endpoint, config).then((res) => {
      if (res.data && res.data.length > 0) {
        const data = {
          items: res.data,
          totalItems: res.headers["x-wp-total"],
          totalPages: res.headers["x-wp-totalpages"],
        };
        return data;
      } else return null;
    });

    return response;
  }

  async getProductByID(id) {
    const config = this.getConfig();

    const response = await axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/${id}`, config)
      .then((res) => res.data);

    return response;
  }

  async uploadProduct(product) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/`;
    const config = this.getConfig();

    const response = await axios.post(endpoint, product, config);

    return response;
  }

  async updateProduct(id, product) {
    const endpoint = `${WPDomain}/wp-json/dokan/v1/products/${id}`;
    const config = this.getConfig();

    const response = await axios.put(endpoint, product, config);

    return response;
  }

  async getUserAttributes() {
    const config = this.getConfig();

    const attributes = await axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/attributes`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    let values = [];

    for (const attribute of Array.from(attributes)) {
      await axios
        .get(
          `${WPDomain}/wp-json/dokan/v1/products/attributes/${attribute.id}/terms`,
          config
        )
        .then((res) => {
          values.push(res.data);
        })
        .catch((err) => {
          return;
        });
    }

    const userAttributes = Array.from(attributes).map((attribute, index) => ({
      id: attribute.id,
      name: attribute.name,
      values: values[index],
    }));

    return userAttributes;
  }

  async saveAttributes(productID, productAttributes) {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    // Update product type and attributes
    let attributes = productAttributes.map((attribute, index) => ({
      id: index,
      name: attribute.name,
      options: attribute.options,
      visible: attribute.visible,
      variation: attribute.variation,
    }));

    let product = await axios
      .put(
        `${WPDomain}/wp-json/dokan/v1/products/${productID}`,
        { type: "variable", attributes },
        config
      )
      .catch((err) => console.log(err));

    // Update all variation 'attributes' property

    let variations = await this.getVariations(productID);

    const updateVariationAttributes = (variation) => {
      let newAttributes = productAttributes
        .filter((attribute) => attribute.variation)
        .map((attribute) => {
          let prevAttribute = variation.attributes.find(
            (attr) => attr.name === attribute.name
          );
          let newAttribute = {
            name: attribute.name,
            option: prevAttribute !== undefined ? prevAttribute.option : "",
          };

          return newAttribute;
        });

      return {
        ...variation,
        attributes: newAttributes,
      };
    };

    variations = variations.map(updateVariationAttributes);

    // Update variations
    let newVariations = [];

    for (const variation of Array.from(variations)) {
      await axios
        .put(
          `${WPDomain}/wp-json/wc/v3/products/${productID}/variations/${variation.id}`,
          { attributes: variation.attributes },
          config
        )
        .then((res) => {
          newVariations.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return { attributes: product.data.attributes, newVariations };

    // Save/Update user attributes

    // let userAttributes = await this.getUserAttributes();

    // console.log("Old Attributes: ", userAttributes);

    // for (const attribute of Array.from(productAttributes)) {
    //   let currentAttr = userAttributes.find(
    //     (attr) => attr.name.toLowerCase() === attribute.name.toLowerCase()
    //   );
    //   if (currentAttr !== undefined) {
    //     for (const value of Array.from(attribute.value)) {
    //       let isValueAdded = currentAttr.values.includes(value);
    //       if (!isValueAdded) {
    //         await axios.post(
    //           `${WPDomain}/wp-json/dokan/v1/products/attributes/${currentAttr.id}/terms`,
    //           { name: value },
    //           config
    //         );
    //       }
    //     }
    //   } else {
    //     await axios
    //       .post(
    //         `${WPDomain}/wp-json/dokan/v1/products/attributes`,
    //         { name: attribute.name },
    //         config
    //       )
    //       .then((res) => {
    //         attribute.values.forEach((value) => {
    //           axios.post(
    //             `${WPDomain}/wp-json/dokan/v1/products/attributes/${res.data.id}/terms`,
    //             { name: value },
    //             config
    //           );
    //         });
    //       });
    //   }
    // }

    // let userAttr = await this.getUserAttributes();

    // console.log("New Attributes: ", userAttr);
  }

  async getVariations(productID) {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    let response = axios
      .get(`${WPDomain}/wp-json/wc/v3/products/${productID}/variations`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    return response;
  }

  async createVariations(productID, attributePairs) {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    let variations = [];

    for (const attributePair of Array.from(attributePairs)) {
      await axios
        .post(
          `${WPDomain}/wp-json/wc/v3/products/${productID}/variations`,
          { attributes: attributePair },
          config
        )
        .then((res) => {
          variations.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return variations;
  }

  async deleteVariation(productID, variationID) {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    let response = axios
      .delete(
        `${WPDomain}/wp-json/wc/v3/products/${productID}/variations/${variationID}`,
        config
      )
      .then((res) => res)
      .catch((err) => console.log(err));

    return response;
  }

  async saveVariations(productID, variations) {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    let productVariations = [];

    const updateVariation = (variation, image) => {
      let in_stock =
        variation.in_stock === true || variation.in_stock === "true";

      // Manage_stock data type is boolean but defau;t value is string "parant"
      let manage_stock =
        typeof variation.manage_stock === "string"
          ? false
          : variation.manage_stock;

      let stock_quantity = !in_stock ? 0 : Number(variation.stock_quantity);

      let price = variation.price || variation.regular_price;

      const variationData = {
        ...variation,
        in_stock,
        manage_stock,
        stock_quantity,
        price,
        image,
      };

      axios
        .put(
          `${WPDomain}/wp-json/wc/v3/products/${productID}/variations/${variation.id}`,
          variationData,
          config
        )
        .then((res) => {
          productVariations.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    for (const variation of Array.from(variations)) {
      // Upload Image
      if (typeof variation.image.src === "string") {
        updateVariation(variation, variation.image);
      } else {
        let formData = new FormData();

        formData.append("file", variation.image.src);

        await axios
          .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
          .then((res) => {
            let image = { src: res.data.source_url };

            updateVariation(variation, image);
          })
          .catch((err) => {
            arr.length = index + 1;
            notification["error"]({
              message:
                "Some images did not upload!. Check your data connection and try again.",
            });

            setUploading({
              status: "",
              progress: 0,
            });
          });
      }
    }

    let variationsIdList = productVariations.map((variation) => variation.id);
    let product = await axios
      .put(
        `${WPDomain}/wp-json/dokan/v1/products/${productID}`,
        { variations: variationsIdList },
        config
      )
      .catch((err) => console.log(err));

    return product.data.variations;
  }

  async getCategories() {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/wc/v3/products/categories`, config)
      .then((res) => res.data)
      .catch((err) => {
        return;
      });

    return response;
  }

  async getTags() {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/wc/v3/products/tags`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    return response;
  }

  async addTag(name) {
    const adminLogin = {
      username: process.env.username,
      password: process.env.password,
    };

    let admin = await axios.post(
      `${WPDomain}/wp-json/jwt-auth/v1/token`,
      adminLogin
    );

    let config = {
      headers: {
        Authorization: `Bearer ${admin.data.token}`,
      },
    };

    const response = axios
      .post(
        `${WPDomain}/wp-json/wc/v3/products/tags`,
        {
          name,
        },
        config
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    return response;
  }
}

export default new ProductRepository();
