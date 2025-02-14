import Router from "next/router"
import { notification } from "antd"
import { WPDomain, oathInfo, serializeQuery } from "./Repository"
import axios from "axios"

class FileRepository {
  constructor(callback) {
    this.callback = callback
  }

  async uploadImage(_image, useProgress) {
    const handleProgressEvent = (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )

      useProgress(percent)
    }

    let formData = new FormData()
    formData.append("file", _image)

    const endpoint = `${WPDomain}/wp-json/wp/v2/media`
    const auth_token = localStorage.getItem("auth_token")

    const { decrypt } = require("@/utilities/helperFunctions")

    const config = {
      headers: {
        Authorization: `Bearer ${decrypt(auth_token)}`,
      },
    }

    // Function caller wants to use upload progress
    if (useProgress) {
      config.onUploadProgress = (progressEvent) => {
        handleProgressEvent(progressEvent)
      }
    }

    const { data: image } = await axios.post(endpoint, formData, config)

    return image
  }

  async uploadImages(_images, useProgress) {
    let images = []

    for (let i = 0; i < _images.length; i++) {
      try {
        // Check if imageSrc is a url or an image file object
        if (typeof _images[i] === "string") {
          images.push({ src: _images[i], position: i })
          useProgress(i, 100)
        } else {
          const image = await this.uploadImage(_images[i], (progress) =>
            useProgress(i, progress)
          )
          images.push({ src: image.source_url, position: i })
        }
      } catch (error) {
        notification["error"]({
          message: "Unable to upload image",
          description:
            "Some images could not be uploaded. Please check your network connection and try again.",
        })
        break
      }
    }

    return images
  }
}

export default new FileRepository()
