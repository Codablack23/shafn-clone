import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { notification } from "antd";
import ProductRepository from "~/repositories/ProductRepository";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
];

const Variation = ({
  id,
  attributes,
  image,
  enabled,
  downloadable,
  virtual,
  manage_stock,
  sku,
  in_stock,
  regular_price,
  price,
  stock_quantity,
  backorders,
  weight,
  dimensions,
  shipping_class,
  description,
  productID,
  productAttributes,
  setVariations,
}) => {
  const [selectedImage, setSelectedImage] = useState(image.src);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    let attributeNames = attributes.map((attribute) => attribute.name);
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
    ];

    if (attributeNames.includes(name)) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                attributes: variation.attributes.map((attribute) =>
                  attribute.name === name
                    ? { ...attribute, option: value }
                    : attribute
                ),
              }
            : variation
        )
      );
    }

    if (
      name === "enabled" ||
      name === "downloadable" ||
      name === "virtual" ||
      name === "manage_stock"
    ) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                [name]: !variation[name],
              }
            : variation
        )
      );
    }

    if (name === "regular_price" && !isNaN(value)) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                [name]: value,
              }
            : variation
        )
      );
    }

    if (name === "price" && !isNaN(value)) {
      if (Number(value) >= Number(regular_price)) {
        // setIsPriceValid(false);
        // setTimeout(() => {
        //   setIsPriceValid(true);
        // }, 4000);
        alert("Discounted price must be less than the Sale price");
      } else {
        setVariations((variations) =>
          variations.map((variation) =>
            variation.id === id
              ? {
                  ...variation,
                  [name]: value,
                }
              : variation
          )
        );
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(value))) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                [name]: value,
              }
            : variation
        )
      );
    }

    if (name === "weight" && !isNaN(value)) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                [name]: value,
              }
            : variation
        )
      );
    }

    if (name.includes("dimension") && !isNaN(value)) {
      let dimensionProp = name.split("_").pop();
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                dimensions: {
                  ...dimensions,
                  [dimensionProp]: value,
                },
              }
            : variation
        )
      );
    }

    if (!formNames.includes(name)) {
      setVariations((variations) =>
        variations.map((variation) =>
          variation.id === id
            ? {
                ...variation,
                [name]: value,
              }
            : variation
        )
      );
    }
  };

  const imageHandler = (e) => {
    e.persist();

    let image = e.target.files[0];
    let type = image.type.split("/").pop();

    if (image) {
      if (
        type === "jpeg" ||
        type === "jpg" ||
        type === "png" ||
        type === "gif"
      ) {
        let imgUrl = URL.createObjectURL(image);

        setVariations((variations) =>
          variations.map((variation) =>
            variation.id === id
              ? {
                  ...variation,
                  image: {
                    ...variation.image,
                    src: image,
                  },
                }
              : variation
          )
        );
        setSelectedImage(imgUrl);

        URL.revokeObjectURL(image);
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image type must be jpg, png or gif",
        });
      }
    }
  };

  const renderProductImage = () => {
    return (
      <div style={{ width: 200, height: 200 }}>
        {!selectedImage ? (
          <>
            <input
              id="img"
              type="file"
              accept="image/*"
              required
              hidden
              onChange={imageHandler}
            />

            <label htmlFor="img">
              <div
                className="m-1 border p-3 text-center"
                style={styles.imageSelectBox}
              >
                <i
                  className="fa fa-file-image-o text-secondary"
                  style={{ fontSize: 50, marginTop: 10, marginBottom: 10 }}
                  aria-hidden="true"
                ></i>
              </div>
            </label>
          </>
        ) : (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img src={selectedImage} style={styles.image} />

            <div
              className="ps-btn ps-btn--sm"
              style={styles.imageDel}
              onClick={removeImage}
            >
              x
            </div>
          </div>
        )}
      </div>
    );
  };

  const removeImage = () => {
    setSelectedImage("");
    setVariations((variations) =>
      variations.map((variation) =>
        variation.id === id
          ? {
              ...variation,
              image: {
                ...variation.image,
                src: "",
              },
            }
          : variation
      )
    );
  };

  const removeVariation = async () => {
    let response = await ProductRepository.deleteVariation(productID, id);

    if (response) {
      setVariations((variations) =>
        variations.filter((variation) => variation.id !== id)
      );
    }
  };

  const renderAttributeOptions = (attributeName, attributeOption) => {
    let attribute = productAttributes.find(
      (productAttribute) => productAttribute.name === attributeName
    );

    if (attribute !== undefined) {
      let options = attribute.options.map((option) => (
        <option
          key={option}
          value={option}
          disabled={option === attributeOption ? true : false}
        >
          {option}
        </option>
      ));
      return options;
    }
  };

  return (
    <div className="variations-List mt-5 rounded">
      <header className="d-flex justify-content-between bg-light p-3">
        <div
          data-bs-toggle="collapse"
          href={`#collapse-${id}`}
          style={{ width: "100%" }}
        >
          <span style={{ fontWeight: "bold" }}>#{id}</span>

          {attributes.map((attribute, index) => (
            <select
              key={index}
              name={attribute.name}
              className="ps-select"
              title={attribute.name}
              defaultValue={attribute.option}
            >
              <option value="">Any {attribute.name}</option>
              {renderAttributeOptions(attribute.name, attribute.option)}
            </select>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <span
            className="btn"
            data-bs-toggle="collapse"
            href={`#collapse-${id}`}
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

      <div className="collapse" id={`collapse-${id}`}>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                {renderProductImage()}
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`enabled-${id}`}
                      name="enabled"
                      checked={enabled}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`enabled-${id}`} style={{ color: "black" }}>
                      Enabled
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`downloadable-${id}`}
                      name="downloadable"
                      checked={downloadable}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`downloadable-${id}`}
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
                      id={`virtual-${id}`}
                      name="virtual"
                      checked={virtual}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`virtual-${id}`} style={{ color: "black" }}>
                      Virtual
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`manage_stock-${id}`}
                      name="manage_stock"
                      checked={manage_stock}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`manage_stock-${id}`}
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
                value={sku}
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
                  value={in_stock}
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
                value={regular_price}
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
                value={price}
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
                value={stock_quantity}
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
                value={backorders}
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
                value={weight}
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
                    value={dimensions.length}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <input
                    name="dimension_width"
                    className="form-control"
                    type="text"
                    placeholder="0"
                    value={dimensions.width}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <input
                    name="dimension_height"
                    className="form-control"
                    type="text"
                    placeholder="0"
                    value={dimensions.height}
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
              value={shipping_class}
              onChange={handleInputChange}
            >
              <option value="Same as parent">Same as parent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Variation Description</label>
          {description && (
            <SunEditor
              height="200px"
              defaultValue={description}
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
              id={`wholesale-${id}`}
              name="wholesale"
            />
            <label htmlFor={`wholesale-${id}`} style={{ color: "black" }}>
              Enable wholesale for this product
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation;

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
    cursor: "pointer",
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
};
