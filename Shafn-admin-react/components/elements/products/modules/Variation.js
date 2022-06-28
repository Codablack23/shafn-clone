import React, { useState } from "react"
import dynamic from "next/dynamic"
import { notification } from "antd"
import ProductRepository from "~/repositories/ProductRepository"
import "suneditor/dist/css/suneditor.min.css"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

let buttonList = [
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

const Variation = ({
  variation,
  productId,
  productAttributes,
  onVariationChange,
  onAttributeChange,
}) => {
  const [selectedImage, setSelectedImage] = useState(variation.image.src)

  const handleInputChange = (e) => {
    let { name, value } = e.target

    let attributeNames = variation.attributes.map((attribute) => attribute.name)
    let formNames = [
      "enabled",
      "downloadable",
      "virtual",
      "manage_stock",
      "regular_price",
      "price",
      "stock_quantity",
      "weight",
      "dimension_length",
      "dimension_width",
      "dimension_height",
    ]

    /* Handle attribute change */
    if (attributeNames.includes(name)) {
      const prevAttributePair = variation.attributes
      let newAttributePair

      const updateAttribute = () => {
        return new Promise((resolve, reject) => {
          onVariationChange((variations) =>
            /* Update attribute */
            variations.map((_variation) => {
              if (_variation.id === variation.id) {
                newAttributePair = variation.attributes.map((attribute) =>
                  attribute.name === name
                    ? { ...attribute, option: value }
                    : attribute
                )

                return {
                  ..._variation,
                  attributes: newAttributePair,
                }
              } else {
                return _variation
              }
            })
          )

          resolve()
        })
      }

      updateAttribute().then(() =>
        onAttributeChange(prevAttributePair, newAttributePair)
      )
    }

    if (
      name === "enabled" ||
      name === "downloadable" ||
      name === "virtual" ||
      name === "manage_stock"
    ) {
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                [name]: !_variation[name],
              }
            : _variation
        )
      )
    }

    if (name === "regular_price" && !isNaN(value)) {
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                [name]: value,
              }
            : _variation
        )
      )
    }

    if (name === "price" && !isNaN(value)) {
      if (Number(value) >= Number(variation.regular_price)) {
        // setIsPriceValid(false);
        // setTimeout(() => {
        //   setIsPriceValid(true);
        // }, 4000);
        alert("Discounted price must be less than the Sale price")
      } else {
        onVariationChange((variations) =>
          variations.map((_variation) =>
            _variation.id === variation.id
              ? {
                  ..._variation,
                  [name]: value,
                }
              : _variation
          )
        )
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(value))) {
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                [name]: value,
              }
            : _variation
        )
      )
    }

    if (name === "weight" && !isNaN(value)) {
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                [name]: value,
              }
            : _variation
        )
      )
    }

    if (name.includes("dimension") && !isNaN(value)) {
      let dimensionProp = name.split("_").pop()
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                dimensions: {
                  ...variation.dimensions,
                  [dimensionProp]: value,
                },
              }
            : _variation
        )
      )
    }

    if (!formNames.includes(name)) {
      onVariationChange((variations) =>
        variations.map((_variation) =>
          _variation.id === variation.id
            ? {
                ..._variation,
                [name]: value,
              }
            : _variation
        )
      )
    }
  }

  const imageHandler = (e) => {
    e.persist()

    let image = e.target.files[0]
    let type = image.type.split("/").pop()
    let allowedTypes = ["jpeg", "jpg", "png", "gif"]

    if (image) {
      if (allowedTypes.includes(type)) {
        let imgUrl = URL.createObjectURL(image)

        /* Add image file object to variation */
        onVariationChange((variations) =>
          variations.map((_variation) =>
            _variation.id === variation.id
              ? {
                  ..._variation,
                  image: {
                    ..._variation.image,
                    src: image,
                  },
                }
              : _variation
          )
        )

        /* Set image preview url to display in UI */
        setSelectedImage(imgUrl)

        URL.revokeObjectURL(image)
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image type must be jpg, png or gif",
        })
      }
    }
  }

  const removeVariation = async () => {
    let response = await ProductRepository.deleteVariation(
      productId,
      variation.id
    )

    if (response) {
      onVariationChange((variations) =>
        variations.filter((_variation) => _variation.id !== variation.id)
      )
    }
  }

  const renderAttributeOptions = (attributeName, attributeOption) => {
    let attribute = productAttributes.find(
      (productAttribute) => productAttribute.name === attributeName
    )

    if (attribute !== undefined) {
      let options = attribute.options.map((option) => (
        <option
          key={option}
          value={option}
          disabled={option === attributeOption}
        >
          {option}
        </option>
      ))
      return options
    }
  }

  return (
    <div className="variations-List mt-5 rounded">
      <header className="d-flex justify-content-between bg-light p-3">
        <div className="d-flex">
          <span style={{ fontWeight: "bold" }}>#{variation.id}</span>

          {variation.attributes.map((attribute, index) => (
            <select
              key={index}
              name={attribute.name}
              className="ps-select"
              title={attribute.name}
              value={attribute.option}
              onChange={handleInputChange}
            >
              <option value="">Any {attribute.name}</option>
              {renderAttributeOptions(attribute.name, attribute.option)}
            </select>
          ))}
        </div>
        <div
          data-bs-toggle="collapse"
          href={`#collapse-${variation.id}`}
          style={{ width: "100%" }}
        />
        <div className="d-flex justify-content-end">
          <span
            className="btn"
            data-bs-toggle="collapse"
            href={`#collapse-${variation.id}`}
          >
            <span style={{ fontSize: 15 }}>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger small mt-2 ml-2"
            onClick={removeVariation}
          >
            Remove
          </span>
        </div>
      </header>

      <div className="collapse" id={`collapse-${variation.id}`}>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <input
                  id={`img-${variation.id}`}
                  type="file"
                  accept="image/*"
                  required
                  hidden
                  onChange={imageHandler}
                />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src={selectedImage} style={styles.image} />

                  <label
                    htmlFor={`img-${variation.id}`}
                    style={{ paddingTop: 12 }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        bottom: 20,
                        right: 10,
                      }}
                      className="text-warning"
                    >
                      <i
                        className="fa fa-camera"
                        aria-hidden="true"
                        style={{ fontSize: 30, cursor: "pointer" }}
                      ></i>
                    </span>
                  </label>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`enabled-${variation.id}`}
                      name="enabled"
                      checked={variation.enabled}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`enabled-${variation.id}`}
                      style={{ color: "black" }}
                    >
                      Enabled
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`downloadable-${variation.id}`}
                      name="downloadable"
                      checked={variation.downloadable}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`downloadable-${variation.id}`}
                      style={{ color: "black" }}
                    >
                      Downloadable
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`virtual-${variation.id}`}
                      name="virtual"
                      checked={variation.virtual}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`virtual-${variation.id}`}
                      style={{ color: "black" }}
                    >
                      Virtual
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`manage_stock-${variation.id}`}
                      name="manage_stock"
                      checked={variation.manage_stock}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`manage_stock-${variation.id}`}
                      style={{ color: "black" }}
                    >
                      Manage stock?
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>SKU</label>
              <input
                name="sku"
                className="form-control"
                type="text"
                value={variation.sku}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group form-group--select">
              <label>Stock Status</label>
              <div className="form-group__content">
                <select
                  name="in_stock"
                  className="ps-select"
                  title="Status"
                  value={variation.in_stock}
                  onChange={handleInputChange}
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Regular price ($)</label>
              <input
                name="regular_price"
                className="form-control"
                type="text"
                placeholder="Variation price (required)"
                required
                value={variation.regular_price}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Discounted price ($)</label>
              <input
                name="price"
                className="form-control"
                type="text"
                value={variation.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Stock quantity</label>
              <input
                name="stock_quantity"
                className="form-control"
                type="text"
                placeholder="Variation price (required)"
                required
                value={variation.stock_quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Allow backorders?</label>
              <input
                name="backorders"
                className="form-control"
                type="text"
                value={variation.backorders}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                name="weight"
                className="form-control"
                type="text"
                placeholder="0"
                value={variation.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Dimensions (LxWxH) (cm)</label>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <input
                    name="dimension_length"
                    className="form-control"
                    type="text"
                    placeholder="0"
                    value={variation.dimensions.length}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <input
                    name="dimension_width"
                    className="form-control"
                    type="text"
                    placeholder="0"
                    value={variation.dimensions.width}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <input
                    name="dimension_height"
                    className="form-control"
                    type="text"
                    placeholder="0"
                    value={variation.dimensions.height}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group form-group--select">
          <label>Shipping Class</label>
          <div className="form-group__content">
            <select
              name="shipping_class"
              className="ps-select"
              title="Shipping class"
              value={variation.shipping_class}
              onChange={handleInputChange}
            >
              <option value="Same as parent">Same as parent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Variation Description</label>
          {variation.description && (
            <SunEditor
              height="200px"
              defaultValue={variation.description}
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

        <div className="form-group">
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id={`wholesale-${variation.id}`}
              name="wholesale"
            />
            <label
              htmlFor={`wholesale-${variation.id}`}
              style={{ color: "black" }}
            >
              Enable wholesale for this product
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Variation

let styles = {
  imageSelectBox: {
    width: "22vh",
    minHeight: "22vh",
    margin: "2% auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "22vh",
    height: "22vh",
    objectFit: "cover",
  },
  imageDel: {
    position: "absolute",
    fontSize: 15,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 75,

    background: "rgba(250,0,0)",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  filesStyles: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  fileSelect: {
    minWidth: "33%",
    minHeight: "30vh",
    marginRight: "2%",
  },
}
