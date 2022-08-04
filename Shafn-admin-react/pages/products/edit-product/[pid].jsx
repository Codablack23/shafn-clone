import React, { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Router from "next/router"
import { useDispatch } from "react-redux"
import { notification, Progress, Spin } from "antd"
import ReactHtmlParser from "react-html-parser"
import Select from "react-select"

import { toggleDrawerMenu } from "~/store/app/action"
import FileRepository from "~/repositories/FileRepository"
import ProductRepository from "~/repositories/ProductRepository"
import ImageSelectTiles from "~/components/elements/products/ImageSelectTiles"
// import ProductAttributes from "~/components/elements/products/ProductAttributes"
// import ProductVariations from "~/components/elements/products/ProductVariations"
import { CustomModal } from "~/components/elements/custom/index"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { generateSlug } from "~/utilities/helperFunctions"

import "suneditor/dist/css/suneditor.min.css"
import "react-image-lightbox/style.css"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

const ProductAttributes = dynamic(
  () => import("~/components/elements/products/ProductAttributes"),
  { suspense: true }
)
const ProductVariations = dynamic(
  () => import("~/components/elements/products/ProductVariations"),
  { suspense: true }
)

const short_buttonList = [
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

const buttonList = [
  [
    ...short_buttonList[0],
    "fontSize",
    "formatBlock",
    "paragraphStyle",
    "removeFormat",
    "outdent",
    "indent",
    "align",
    "horizontalRule",
    "list",
    "lineHeight",
  ],
]

const EditProductPage = ({ pid }) => {
  const dispatch = useDispatch()

  const [product, setProduct] = useState({
    name: "",
    attributes: [],
    variations: [],
    price: "",
    regular_price: "",
    sale_price: "",
    short_description: "",
    description: "",
    categories: "",
    stock_quantity: 0,
    sku: "",
    in_stock: false,
    downloadable: false,
    virtual: false,
    images: [],
    manage_stock: false,
    sold_individually: false,
    type: "simple",
    tags: [],
  })

  const [categories, setCategories] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [newTag, setNewTag] = useState("")
  const [attributes, setAttributes] = useState([])
  const [variations, setVariations] = useState([])

  const [images, setImages] = useState([])
  const [currentImages, setCurrentImages] = useState([])

  const [showNewTagInputField, setShowNewTagInputField] = useState(false)
  const [isPriceValid, setIsPriceValid] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    let checkedFormNames = [
      "regular_price",
      "sale_price",
      "stock_quantity",
      "downloadable",
      "virtual",
      "manage_stock",
      "sold_individually",
      "categories",
      "tags",
    ]
    if (name === "regular_price" && !isNaN(value)) {
      setProduct((product) => ({ ...product, [name]: value }))
    }

    if (name === "sale_price" && !isNaN(value)) {
      if (Number(value) >= Number(product.regular_price)) {
        setIsPriceValid(false)
        setTimeout(() => {
          setIsPriceValid(true)
        }, 4000)
      } else {
        setProduct((product) => ({
          ...product,
          [name]: value,
          sale_price: value,
        }))
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(value))) {
      setProduct((product) => ({ ...product, [name]: value }))
    }

    if (
      name === "downloadable" ||
      name === "virtual" ||
      name === "manage_stock" ||
      name === "sold_individually"
    ) {
      setProduct((product) => ({ ...product, [name]: !product[name] }))
    }

    if (name === "categories") {
      setProduct((product) => ({ ...product, [name]: [{ id: value }] }))
    }

    if (name === "tags") {
      let tags = value.map((tag) => ({ id: tag.value }))
      setProduct((product) => ({ ...product, [name]: tags }))
    }

    if (!checkedFormNames.includes(name)) {
      setProduct((product) => ({ ...product, [name]: value }))
    }
  }

  const addTag = async () => {
    try {
      let tag = await ProductRepository.addTag(newTag)

      let tagOption = { value: tag.id, label: tag.name }

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
    if (!product.name) return "Product Name is required!"
    if (!product.regular_price) return "Sale Price is required!"
    if (Number(product.sale_price) > Number(product.regular_price)) {
      setIsPriceValid(false)
      setTimeout(() => {
        setIsPriceValid(true)
      }, 4000)
      return "Discounted Price must be less than the Sale Price"
    }
    if (product.category === "") return "Category is required!"

    let isProductInStock =
      product.in_stock === true || product.in_stock === "true"
    if (isProductInStock && Number(product.stock_quantity) <= 0)
      return "Sale Quantity must be greater than 0"
    if (!product.short_description) return "Short Description is required!"

    let isPrimaryImageSelected = images.map((el) => el.id).includes("img-1")
    if (!isPrimaryImageSelected) return "Primary Image is required!"

    return "VALID"
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const result = validateInputs()

    if (result === "VALID") {
      setIsUploading(true)

      const slug = generateSlug(product.name)

      const in_stock = product.in_stock === true || product.in_stock === "true"

      const stock_quantity = !in_stock ? 0 : Number(product.stock_quantity)

      const attributes =
        product.type === "variable"
          ? product.attributes.map((attribute) => ({
              name: attribute.name,
              options: attribute.options,
              visible: attribute.visible,
              variation: attribute.variation,
            }))
          : []

      const tags = product.tags.map((tag) => ({ id: tag.id }))

      const productData = {
        ...product,
        slug,
        images,
        in_stock,
        stock_quantity,
        attributes,
        tags,
      }

      // Get image file objects from images array
      const imageFiles = images.map((img) => img.file)

      const totalProgress = imageFiles.length * 100
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
        if (currentProgress === totalProgress) {
          console.log("Progress completed!")
        }
      }

      const _images = await FileRepository.uploadImages(
        imageFiles,
        handleImageUploadProgress
      )

      if (_images.length === imageFiles.length) {
        try {
          const _product = { ...productData, images: _images }

          await ProductRepository.updateProduct(pid, _product)

          notification["success"]({
            message: "Product Updated Successfully",
          })

          setTimeout(() => {
            Router.reload(window.location.pathname)
          }, 1500)
        } catch (error) {
          notification["error"]({
            message: "Product failed to update",
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

  const getProduct = async () => {
    try {
      const product = await ProductRepository.getProductByID(pid)

      const categories = await ProductRepository.getCategories()

      const tags = await ProductRepository.getTags()

      const tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }))

      const modifiedAttributes = product.attributes.map((attribute, index) => ({
        ...attribute,
        id: index,
        type: "select",
        error: "",
      }))

      const images = Array.from(product.images).map((img, index) => ({
        id: `img-${index + 1}`,
        file: img.src,
      }))

      const currentImages = Array.from(product.images).map((img, index) => ({
        id: `img-${index + 1}`,
        url: img.src,
      }))

      setProduct(product)
      setAttributes(modifiedAttributes)
      setImages(images)
      setCurrentImages(currentImages)
      setCategories(categories)
      setTagOptions(tagOptions)
    } catch (err) {
      notification["error"]({
        message: "Unable to get product",
        description: "Check your data connection and try again.",
      })
    }
  }

  useEffect(() => {
    getProduct()

    dispatch(toggleDrawerMenu(false))
  }, [])

  return (
    <ContainerDefault title="Edit product">
      <HeaderDashboard title="Edit Product" description="ShafN Edit Product " />

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
                        placeholder="Enter product name..."
                        value={product.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group form-group--select">
                      <label>
                        Type<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          name="type"
                          className="ps-select"
                          title="type"
                          value={product.type}
                          onChange={handleInputChange}
                        >
                          <option value="simple">Simple</option>
                          <option value="variable">Variable</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={product.downloadable}
                          className="form-control"
                          type="checkbox"
                          id="downloadable"
                          name="downloadable"
                          onChange={handleInputChange}
                        />
                        <label className="text-black" htmlFor="downloadable">
                          Downloadable
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={product.virtual}
                          className="form-control"
                          type="checkbox"
                          id="virtual"
                          name="virtual"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="virtual" className="text-black">
                          Virtual
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Regular Price<sup>*</sup>
                      </label>
                      <input
                        name="regular_price"
                        className="form-control"
                        type="text"
                        value={product.regular_price}
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
                        value={product.sale_price}
                        onChange={handleInputChange}
                      />
                      <p className="text-danger" hidden={isPriceValid}>
                        Discounted price must be less than the Regular price
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
                          title="Category"
                          value={product.categories && product.categories[0].id}
                          onChange={handleInputChange}
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
                        required
                        value={product.stock_quantity}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Short Description<sup>*</sup>
                      </label>

                      {product.short_description && (
                        <SunEditor
                          height="100px"
                          defaultValue={product.short_description}
                          setOptions={{
                            buttonList: short_buttonList,
                            maxCharCount: 100,
                          }}
                          onChange={(value) =>
                            handleInputChange({
                              target: {
                                name: "short_description",
                                value,
                              },
                            })
                          }
                        />
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>

                      {product.short_description && (
                        <SunEditor
                          height="200px"
                          defaultValue={product.description}
                          setOptions={{
                            buttonList,
                          }}
                          onChange={(value) =>
                            handleInputChange({
                              target: {
                                name: "description",
                                value,
                              },
                            })
                          }
                        />
                      )}
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
                      defaultImages={currentImages}
                      onSelect={(img) =>
                        setImages((current) =>
                          img.id === "img-1"
                            ? [img, ...current]
                            : [...current, img]
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
                        placeholder=""
                        value={product.sku}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group form-group--select">
                      <label>
                        Stock Status<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          name="in_stock"
                          className="ps-select"
                          title="Status"
                          value={String(product.in_stock)}
                          onChange={handleInputChange}
                        >
                          <option value="true">In Stock</option>
                          <option value="false">Out of Stock</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={product.manage_stock}
                          className="form-control"
                          type="checkbox"
                          id="manage_stock"
                          name="manage_stock"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="manage_stock" className="text-black">
                          Enable product stock management
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={product.sold_individually}
                          className="form-control"
                          type="checkbox"
                          id="sold_individually"
                          name="sold_individually"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="sold_individually"
                          className="text-black"
                        >
                          Allow only one quantity of this product to be bought
                          in a single order
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Tags<sup>*</sup>
                      </label>

                      <Select
                        isMulti
                        name="tags"
                        placeholder="Select product tags"
                        defaultValue={product.tags.map((tag) => ({
                          value: tag.id,
                          label: tag.name,
                        }))}
                        options={tagOptions}
                        onChange={(value) =>
                          handleInputChange({
                            target: {
                              name: "tags",
                              value,
                            },
                          })
                        }
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

            {product.type === "variable" ? (
              <Suspense fallback={<Spin />}>
                <div>
                  <figure className="ps-block--form-box">
                    <figcaption>Attributes and Variations</figcaption>
                    <div className="ps-block__content">
                      <ProductAttributes
                        productId={pid}
                        attributes={attributes}
                        onAttributeChange={setAttributes}
                        onVariationChange={setVariations}
                        onProductChange={setProduct}
                      />
                      {product.attributes.length > 0 ? (
                        <ProductVariations
                          productId={pid}
                          productAttributes={product.attributes}
                          variations={variations}
                          onVariationChange={setVariations}
                          onProductChange={setProduct}
                        />
                      ) : null}
                    </div>
                  </figure>
                </div>
              </Suspense>
            ) : null}
          </div>

          <div className="ps-form__bottom">
            <button
              disabled={isUploading}
              type="submit"
              className="ps-btn"
              onClick={handleOnSubmit}
            >
              Update
            </button>
          </div>
        </form>

        <CustomModal isOpen={isUploading}>
          <div className="row">
            <div className="col-12 col-md-3"></div>
            <div className="col-12 col-md-6 mt-5">
              <div className="mt-5">
                <Spin size="large" />
                {progress !== images.length * 100 && (
                  <>
                    <Progress type="line" percent={progress} />
                    {`${progress}%`}
                    <p>Uploading new images</p>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-md-3"></div>
          </div>
        </CustomModal>
      </section>

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

EditProductPage.getInitialProps = async ({ query }) => {
  return { pid: query.pid }
}

export default EditProductPage
