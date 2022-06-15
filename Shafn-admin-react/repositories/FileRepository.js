import Router from "next/router";
import { notification } from "antd";
import { WPDomain, oathInfo, serializeQuery } from "./Repository";
import axios from "axios";

class FileRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async uploadImage(_image, uploadProgress) {
    let formData = new FormData();
    formData.append("file", _image);

    const auth_token = localStorage.getItem("auth_token");

    const endpoint = `${WPDomain}/wp-json/wp/v2/media`;

    let config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    if (uploadProgress) {
      config.headers.onUploadProgress = (progressEvent) => {
        uploadProgress(progressEvent, "Uploading Image");
      };
    }

    const image = await axios
      .post(endpoint, formData, config)
      .then((res) => res.data);

    return image;
  }

  async uploadImages(_images, uploadProgress) {
    let images = [];

    for (i = 0; i < _images.length; i++) {
      try {
        const image = await this.uploadImage(_image[i], uploadProgress);

        images.push({ src: image.source_url, position: i });
      } catch (error) {
        notification["error"]({
          message: "Could not upload image",
          description:
            "Some images could not be uploaded. Please check your data connection and try again.",
        });
        break;
      }
    }

    return images;
  }
}

export default new FileRepository();
