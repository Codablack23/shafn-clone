import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Router from "next/router"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { useDispatch } from "react-redux"
import { notification, Progress, Spin } from "antd"
import { toggleDrawerMenu } from "~/store/app/action"
import SettingsRepository from "~/repositories/SettingsRepository"
import ProductRepository from "~/repositories/ProductRepository"
import ReactHtmlParser from "react-html-parser"
import Select from "react-select"
import "react-image-lightbox/style.css"
import "suneditor/dist/css/suneditor.min.css"
import ImageSelectTiles from "~/components/elements/products/ImageSelectTiles"

import { CustomModal } from "~/components/elements/custom/index"
import FileRepository from "~/repositories/FileRepository"
import { generateSlug } from "~/utilities/helperFunctions"
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

let short_buttonList = [
  [
    "undo",
    "redo",
    "font",
    "blockquote",
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "fontColor",
    "hiliteColor",
    "textStyle",
    "fullScreen",
  ],
]

let buttonList = [
  [
    "undo",
    "redo",
    "font",
    "fontSize",
    "formatBlock",
    "paragraphStyle",
    "blockquote",
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "fontColor",
    "hiliteColor",
    "textStyle",
    "removeFormat",
    "outdent",
    "indent",
    "align",
    "horizontalRule",
    "list",
    "lineHeight",
    "fullScreen",
  ],
]

const CreateProductPage = () => {
  const dispatch = useDispatch()

  const [categories, setCategories] = useState([])
  const [tagOptions, setTagOptions] = useState([])

  const [name, setName] = useState("")
  const [regularPrice, setRegularPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [qty, setQty] = useState("")
  const [sku, setSku] = useState("")
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const [images, setImages] = useState([])
  const [isPriceValid, setIsPriceValid] = useState(true)
  const [showNewTagInputField, setShowNewTagInputField] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleInputChange = (e) => {
    const name = e.target.name
    const val = e.target.value
    if (name === "regular_price" && !isNaN(val)) {
      setRegularPrice(val)
    }

    if (name === "sale_price" && !isNaN(val)) {
      if (Number(val) >= Number(regularPrice)) {
        setIsPriceValid(false)
        setTimeout(() => {
          setIsPriceValid(true)
        }, 4000)
      } else {
        setSalePrice(val)
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(val))) {
      setQty(Number(val))
    }
  }

  const addTag = async () => {
    setShowNewTagInputField(false)
    try {
      const tag = await ProductRepository.addTag(newTag)

      const tagOption = { value: tag.id, label: tag.name }

      setTagOptions((tagOptions) => [...tagOptions, tagOption])
    } catch (err) {
      notification["error"]({
        message: "Failed To Add Tag",
        description:
          err.response === undefined ? String(err) : err.response.data.message,
      })
    }
  }

  const validateInputs = () => {
    if (!name) return "Product Name is required!"
    if (!regularPrice) return "Regular Price is required!"
    if (Number(salePrice) > Number(regularPrice)) {
      setIsPriceValid(false)
      setTimeout(() => {
        setIsPriceValid(true)
      }, 4000)
      return "Discounted Price must be less than the Sale Price"
    }
    if (category === "") return "Category is required!"
    if (Number(qty) <= 0) return "Sale Quantity must be greater than 0"
    if (!shortDescription) return "Short Description is required!"

    const isPrimaryImageSelected = images.map((img) => img.id).includes("img-1")

    if (!isPrimaryImageSelected) return "Primary Image is required!"

    return "VALID"
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const result = validateInputs()

    if (result === "VALID") {
      setIsUploading(true)

      const slug = generateSlug(name)

      const product = {
        name,
        slug,
        type: "simple",
        regular_price: regularPrice.trim(),
        sale_price: salePrice.trim(),
        short_description: shortDescription.trim(),
        description: description.trim(),
        categories: category,
        stock_quantity: qty,
        sku,
        tags,
        manage_stock: true,
      }

      // Get image file objects from images array
      const imageFiles = images.map((img) => img.file)
      const totalProgress = images.length * 100
      let currentProgress = 0
      let currentIndex = 0
      let minCurrentProgress = currentIndex * 100

      const handleImageUploadProgress = (index, _progress) => {
        // Check if next image is being uploaded
        if (index > currentIndex) {
          currentIndex = index
          minCurrentProgress = index * 100
        }
        currentProgress = minCurrentProgress + _progress

        const progress = (currentProgress / totalProgress) * 100
        setProgress(progress.toFixed(2))
      }

      const _images = await FileRepository.uploadImages(
        imageFiles,
        handleImageUploadProgress
      )

      if (progress !== images.length * 100) setProgress(100) // To disable progress bar

      // Only proceed if all images successfully uploaded
      if (_images.length === images.length) {
        try {
          const _product = { ...product, images: _images }

          await ProductRepository.uploadProduct(_product)

          notification["success"]({
            message: "Product Uploaded Successfully",
          })

          setTimeout(() => {
            Router.reload(window.location.pathname)
          }, 1500)
        } catch (error) {
          notification["error"]({
            message: "Product failed to upload",
            description: "Please check your network connection and try again",
          })
        }
      }

      setIsUploading(false)
    } else {
      notification["error"]({
        message: result,
      })
    }
  }

  const getStorename = async () => {
    const store = await SettingsRepository.getStore()

    if (!store.store_name) {
      notification["error"]({
        message: "You must have a Store Name to upload a product.",
      })
      setTimeout(() => Router.push("/settings"), 2000)
    }
  }

  const getCategories = async () => {
    const categories = await ProductRepository.getCategories()

    setCategories(categories)
  }

  const getTags = async () => {
    const tags = await ProductRepository.getTags()

    let tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }))
    setTagOptions(tagOptions)
  }

  useEffect(() => {
    dispatch(toggleDrawerMenu(false))

    getStorename()
    getCategories()
    getTags()
  }, [])

  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard
        title="Create Product"
        description="ShafN Create New Product"
      />
      <section className="ps-new-item">
        <form
          className="ps-form ps-form--new-product"
          action=""
          method="get"
          onSubmit={handleOnSubmit}
        >
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>General</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        Product Name<sup>*</sup>
                      </label>
                      <input
                        name="name"
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Regular Price<sup>*</sup>
                      </label>
                      <input
                        name="regular_price"
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={regularPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Discounted Price<sup>*</sup>
                      </label>
                      <input
                        name="sale_price"
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={salePrice}
                        onChange={handleInputChange}
                      />
                      <p style={{ color: "red" }} hidden={isPriceValid}>
                        Discounted Price must be less than the Sale Price
                      </p>
                    </div>
                    <div className="form-group form-group--select">
                      <label>
                        Category<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          name="categories"
                          className="ps-select"
                          title="Status"
                          defaultValue={category}
                          onChange={(e) =>
                            setCategory([{ id: e.target.value }])
                          }
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {ReactHtmlParser(category.name)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Sale Quantity<sup>*</sup>
                      </label>
                      <input
                        name="stock_quantity"
                        className="form-control"
                        type="text"
                        placeholder=""
                        required
                        value={qty}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Short Description<sup>*</sup>
                      </label>
                      <SunEditor
                        height="100px"
                        onChange={(val) => setShortDescription(val)}
                        setOptions={{
                          buttonList: short_buttonList,
                          maxCharCount: 100,
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>
                      <SunEditor
                        height="200px"
                        onChange={(val) => setDescription(val)}
                        setOptions={{
                          buttonList,
                        }}
                      />
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="pt-3 product-img-container">
                    <ImageSelectTiles
                      numOfTiles={9}
                      onSelect={(file) =>
                        setImages((current) =>
                          file.id === "img-1"
                            ? [file, ...current]
                            : [...current, file]
                        )
                      }
                      onDelete={(id) =>
                        setImages((current) =>
                          current.filter((img) => img.id !== id)
                        )
                      }
                    />
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Inventory</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        SKU<sup>*</sup>
                      </label>
                      <input
                        name="sku"
                        className="form-control"
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Tags<sup>*</sup>
                      </label>

                      <Select
                        isMulti
                        name="tags"
                        placeholder="Select product tags"
                        options={tagOptions}
                        onChange={(options) => {
                          let tags = options.map((option) => ({
                            id: option.value,
                          }))
                          setTags(tags)
                        }}
                      />

                      <button
                        className="ps-btn mt-4"
                        onClick={() => setShowNewTagInputField(true)}
                      >
                        Add New
                      </button>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="/">
              Back
            </a>
            <button className="ps-btn ps-btn--gray">Cancel</button>
            <button
              disabled={isUploading}
              type="submit"
              className="ps-btn"
              onClick={handleOnSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      {/* Products Viewer */}
      <CustomModal isOpen={isUploading}>
        <div className="row">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-6 mt-5">
            <div className="mt-5">
              <Spin size="large" />
              {progress !== images.length * 100 && (
                <>
                  <Progress type="line" percent={progress} />
                  <span>{`${progress}%`}</span>
                  <p>Uploading images</p>
                </>
              )}
            </div>
          </div>
          <div className="col-12 col-md-3"></div>
        </div>
      </CustomModal>
      {/* New Tag Input Field */}
      <CustomModal isOpen={showNewTagInputField}>
        <div className="row">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-6">
            <div className="form-group bg-white p-5 new-tag-dialog">
              <label className="">
                New Tag<sup>*</sup>
              </label>
              <input
                name="new tag"
                className="form-control"
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <br />

              <div class="d-flex w-100 justify-content-around">
                <button
                  className="ps-btn"
                  onClick={() => setShowNewTagInputField(false)}
                >
                  Cancel
                </button>

                <button className="ps-btn ps-btn--gray" onClick={addTag}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3"></div>
        </div>
      </CustomModal>
    </ContainerDefault>
  )
}
export default CreateProductPage
