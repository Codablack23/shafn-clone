import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "./Repository";
import axios from "axios";

class ProductRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getProducts() {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    return response;
  }

  async getProductByID(id) {
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/${id}`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        notification["error"]({
          message: "Unable To Get Products",
          description: "Check your data connection and try again.",
        });
        return null;
      });

    return response;
  }

  async createProduct(payload) {
    let auth_token = localStorage.getItem("auth_token");
    const uploadProgress = (progressEvent, status) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      payload.setUploading({
        status,
        progress: percent,
      });
    };

    const uploadImages = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress(progressEvent, "Uploading Images");
        },
      };

      let images = [];
      let imgFiles = payload.imageFiles.map((img) => img.file);

      imgFiles.forEach((file, index, arr) => {
        let formData = new FormData();

        formData.append("file", file);

        axios
          .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
          .then((res) => {
            images.push({ src: res.data.source_url, position: index });

            if (images.length === payload.imageFiles.length) {
              uploadProduct(images);
            }
          })
          .catch((err) => {
            arr.length = index + 1;
            notification["error"]({
              message:
                "Some images did not upload!. Check your data connection and try again.",
            });

            payload.setUploading({
              status: "",
              progress: 0,
            });
          });
      });
    };

    uploadImages();

    const uploadProduct = (images) => {
      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress(progressEvent, "Uploading Product");
        },
      };

      const productData = {
        ...payload.product,
        images,
      };

      // Upload Product
      axios
        .post(`${WPDomain}/wp-json/dokan/v1/products/`, productData, config)
        .then((res) => {
          notification["success"]({
            message: "Product Uploaded Successfully",
          });

          setTimeout(() => {
            Router.reload(window.location.pathname);
          }, 1500);
        })
        .catch((err) => {
          notification["error"]({
            message: "Product Upload Failed",
            description:
              err.response === undefined
                ? "Check your data connection and try again."
                : err.response.data.message,
          });

          payload.setUploading({
            status: "",
            progress: 0,
          });
        });
    };
  }

  async editProduct(id, imageFiles, product, setUploading) {
    let auth_token = localStorage.getItem("auth_token");

    const uploadProgress = (progressEvent, status) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setUploading({
        status,
        progress: percent,
      });
    };

    const uploadImages = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress(progressEvent, "Uploading Images");
        },
      };

      let images = [];
      let imgFiles = imageFiles.map((img) => img.file);

      imgFiles.forEach((file, index, arr) => {
        // Check if it's an already uploaded image

        if (typeof file === "string") {
          images.push({ src: file, position: index });
          if (images.length === imageFiles.length) {
            uploadProduct(images);
          }
        } else {
          let formData = new FormData();

          formData.append("file", file);

          axios
            .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
            .then((res) => {
              images.push({ src: res.data.source_url, position: index });

              if (images.length === imageFiles.length) {
                uploadProduct(images);
              }
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
      });
    };

    uploadImages();

    const uploadProduct = (images) => {
      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress(progressEvent, "Uploading Product");
        },
      };

      let slug = `${product.name
        .replace(/[^a-zA-Z0-9-_]/g, " ")
        .replace(/  +/g, " ")
        .split(" ")
        .join("-")}`.trim();

      let in_stock = product.in_stock === true || product.in_stock === "true";

      const productData = {
        ...product,
        slug,
        images,
        in_stock,
        price: product.price || product.regular_price,
        stock_quantity: !in_stock ? 0 : Number(product.stock_quantity),
        // attributes,
        // variations: variations.map((v) => v.id),
      };

      axios
        .put(`${WPDomain}/wp-json/dokan/v1/products/${id}`, productData, config)
        .then((res) => {
          notification["success"]({
            message: "Product Updated Successfully",
          });
          Router.push("/products");
        })
        .catch((err) => {
          notification["error"]({
            message: "Product Upload Failed",
            description: "Check your data connection and try again.",
          });
          setIsUploading(false);
        });
    };
  }

  async getAttributes() {
        let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const attributes = axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/attributes`, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return;
      });

    const values = Array.from(attributes).map(attribute => {
      let terms = this.getAttributeValuesByID(attribute.id).then(res => res.data).catch(err => {
        return
      })

      return terms

    })

    const userAttributes = Array.from(attributes).map((attribute, index) => ({
      name: attribute.name,
      options: values[index]
    }))


    return userAttributes
  }

    async getAttributeValuesByID(id) {
        let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/attributes/${id}/terms`, config)
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
