import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notification, Progress } from "antd";
import { toggleDrawerMenu } from "~/store/app/action";
import Router from "next/router";
import { CompatSource } from "webpack-sources";
import { ColorPicker, useColor } from "react-color-palette";
import { WPDomain } from "~/repositories/Repository";
import ProductRepository from "~/repositories/ProductRepository";
import "react-color-palette/lib/css/styles.css";
import { v4 as uuid } from "uuid";
import "suneditor/dist/css/suneditor.min.css";

import Attributes from "~/components/elements/products/Attributes";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
];

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
];

const EditProductPage = ({ pid }) => {
  const dispatch = useDispatch();

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
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [color, setColor] = useColor("hex", "#aabbcc");
  const [attr, setAttr] = useState(null);
  // variation attributes states
  const [variations, setVariations] = useState([]);
  const [variation, setVariation] = useState({});
  const [singleVariation, setSingleVariation] = useState("single");

  const [isPriceValid, setIsPriceValid] = useState(true);
  const [uploading, setUploading] = useState({
    status: "",
    progress: 0,
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    let fieldNames = [
      "regular_price",
      "price",
      "stock_quantity",
      "downloadable",
      "virtual",
      "manage_stock",
      "sold_individually",
      "categories",
    ];
    if (name === "regular_price" && !isNaN(val)) {
      setProduct((current) => ({ ...current, [name]: val }));
    }

    if (name === "price" && !isNaN(val)) {
      if (Number(val) >= Number(product.regular_price)) {
        setIsPriceValid(false);
        setTimeout(() => {
          setIsPriceValid(true);
        }, 4000);
      } else {
        setProduct((current) => ({ ...current, [name]: val }));
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(val))) {
      setProduct((current) => ({ ...current, [name]: val }));
    }

    if (
      name === "downloadable" ||
      name === "virtual" ||
      name === "manage_stock" ||
      name === "sold_individually"
    ) {
      setProduct((current) => ({ ...current, [name]: !current[name] }));
    }

    if (name === "categories") {
      setProduct((current) => ({ ...current, [name]: [{ id: val }] }));
    }

    if (!fieldNames.includes(name)) {
      setProduct((current) => ({ ...current, [name]: val }));
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
        const imgFile = {
          id: e.target.id,
          file: e.target.files[0],
        };
        setImageFiles((current) =>
          imgFile.id === "img-1"
            ? [imgFile, ...current]
            : current.concat(imgFile)
        );

        const img = {
          id: e.target.id,
          url: URL.createObjectURL(e.target.files[0]),
        };

        setSelectedImages((current) => current.concat(img));

        URL.revokeObjectURL(e.target.files[0]);
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image must be a jpg, png or gif",
        });
      }
    }
  };

  const removeImage = (id) => {
    setSelectedImages((current) => current.filter((img) => img.id !== id));
    setImageFiles((current) => current.filter((img) => img.id !== id));
  };

  const renderProductImages = (num) => {
    return Array(num)
      .fill("")
      .map((el, i) => {
        let image = selectedImages.find((img) => img.id === `img-${i + 1}`);

        return (
          <div key={i} style={{ width: 200, height: 200 }}>
            {image === undefined ? (
              <div>
                <input
                  id={`img-${i + 1}`}
                  type="file"
                  accept="image/*"
                  required
                  hidden
                  onChange={imageHandler}
                />
                <label
                  htmlFor={`img-${i + 1}`}
                  className="btn border btn-lg"
                  style={{
                    paddingTop: 12,
                    padding: "3%",
                    backgroundColor: "#ededed",
                  }}
                >
                  {i === 0 ? <p>Primary</p> : null}
                  <i
                    className="fa fa-file-image-o "
                    style={{ fontSize: 38 }}
                    aria-hidden="true"
                  ></i>
                  <br />
                  <br />
                  <span>Add A Photo</span>
                </label>
              </div>
            ) : (
              <div
                key={image.id}
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img src={image.url} style={styles.image} />

                <div
                  className="ps-btn ps-btn--sm"
                  style={styles.imageDel}
                  onClick={() => removeImage(image.id)}
                >
                  x
                </div>
              </div>
            )}
          </div>
        );
      });
  };

  const renderAttributes = () => {
    return attributes.map((attr, index) => (
      <div key={index} style={styles.attrWrapper}>
        <div className="ps-btn--gray" style={styles.header}>
          <span style={{ fontWeight: "bold" }}>{attr.name}</span>
          <span style={styles.removeBtn}>Remove</span>
        </div>
        {/* Name */}
        <div>
          <p style={{ fontWeight: "bold", marginTop: 5 }}>Name</p>
          <hr />
          <p style={{ fontWeight: "bold" }}>{attr.name}</p>{" "}
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attr.visible}
                className="form-control"
                type="checkbox"
                id={"visible" + index}
                name="visible"
              />
              <label htmlFor={"visible" + index} style={{ color: "black" }}>
                Visible on the product page
              </label>
            </div>
          </div>{" "}
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attr.variation}
                className="form-control"
                type="checkbox"
                id={"variation" + index}
                name="variation"
              />
              <label htmlFor={"variation" + index} style={{ color: "black" }}>
                Used for variations
              </label>
            </div>
          </div>
        </div>
        {/* Value(s) */}

        {attr.name === "Color" ? (
          <>
            {renderColorAttrOptions(attr.name, attr.options)}
            <ColorPicker
              width={250}
              height={100}
              color={color}
              onChange={setColor}
              hideHSV
              hideRGB
              dark
            />
            <button
              type="button"
              className="ps-btn ps-btn--gray"
              style={{ marginTop: 10 }}
              onClick={() => addAttrOption(attr.name, color.hex)}
            >
              Add Color
            </button>
          </>
        ) : (
          <div>
            <p style={{ fontWeight: "bold" }}>Value(s)</p>
            {renderAttrOptions(attr.name, attr.options)}
            <div className="form-group form-group--select">
              <div className="form-group__content">
                <select
                  className="ps-select"
                  title="Values"
                  onChange={(e) => {
                    e.persist();
                    addAttrOption(attr.name, e.target.value);
                  }}
                >
                  <option value="">Select Values</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  };

  const renderAttrOptions = (name, options) => {
    return options.map((option, index) => (
      <label
        key={index}
        className="ps-btn--gray"
        style={styles.attrVal}
        onClick={() => removeAttrOption(name, option)}
      >
        <span>x</span> {option}
      </label>
    ));
  };

  const renderColorAttrOptions = (name, options) => {
    return options.map((option, index) => (
      <span
        key={index}
        className="ps-btn"
        style={{
          backgroundColor: option,
        }}
        onClick={() => removeAttrOption(name, option)}
      ></span>
    ));
  };

  const removeAttr = (name) => {
    setAttributes((attr) => attr.filter((item) => item.name !== name));
  };

  const addAttrOption = (name, option) => {
    setAttributes((attr) =>
      attr.map((item) => {
        if (item.name !== name) return item;
        return {
          ...item,
          options:
            !option || item.options.includes(option)
              ? item.options
              : [...item.options, option],
        };
      })
    );
  };

  const removeAttrOption = (name, option) => {
    setAttributes((attr) =>
      attr.map((item) => {
        if (item.name !== name) return item;
        return {
          ...item,
          options: item.options.filter((opt) => opt !== option),
        };
      })
    );
  };

  const validateInputs = () => {
    if (!product.name) return "Product Name is required!";
    if (!product.regular_price) return "Sale Price is required!";
    if (Number(product.price) > Number(product.regular_price)) {
      setIsPriceValid(false);
      setTimeout(() => {
        setIsPriceValid(true);
      }, 4000);
      return "Discounted Price must be less than the Sale Price";
    }
    if (product.category === "") return "Category is required!";

    let isProductInStock =
      product.in_stock === true || product.in_stock === "true";
    if (isProductInStock && Number(product.stock_quantity) <= 0)
      return "Sale Quantity must be greater than 0";
    if (!product.short_description) return "Short Description is required!";

    let isPrimaryImageSelected = imageFiles
      .map((el) => el.id)
      .includes("img-1");
    if (!isPrimaryImageSelected) return "Primary Image is required!";

    return "VALID";
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    let result = validateInputs();

    if (result === "VALID") {
      setUploading((current) => ({ ...current, status: "Uploading" }));
      ProductRepository.editProduct(pid, imageFiles, product, setUploading);
    } else {
      notification["error"]({
        message: result,
      });
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await ProductRepository.getProductByID(pid);

        if (product) {
          setProduct(product);

          let imageFiles = Array.from(product.images).map((img, i) => ({
            id: `img-${i + 1}`,
            file: img.src,
          }));

          let selectedImages = Array.from(product.images).map((img, i) => ({
            id: `img-${i + 1}`,
            url: img.src,
          }));
          setImageFiles(imageFiles);
          setSelectedImages(selectedImages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();

    dispatch(toggleDrawerMenu(false));
  }, []);
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
                        <label
                          htmlFor="downloadable"
                          style={{ color: "black" }}
                        >
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
                        <label htmlFor="virtual" style={{ color: "black" }}>
                          Virtual
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Sale Price<sup>*</sup>
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
                        name="price"
                        className="form-control"
                        type="text"
                        value={product.price}
                        onChange={handleInputChange}
                      />
                      <p style={{ color: "red" }} hidden={isPriceValid}>
                        Discounted price must be less than the Sale price
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
                          <option value="17">Accessories</option>
                          <option value="56">--Jewelries</option>
                          <option value="21">Art</option>
                          <option value="22">Fabrics</option>
                          <option value="26">--Kente</option>
                          <option value="27">--Wax print</option>
                          <option value="16">Fashion</option>
                          <option value="24">--Clothes</option>
                          <option value="25">--Shoes</option>
                          <option value="67">----Canvas</option>
                          <option value="23">--Socks</option>
                          <option value="18">Home &amp; Living</option>
                          <option value="20">Toys &amp; Entertainment</option>
                          <option value="19">Wedding &amp; Party</option>
                          <option value="15">Uncategorized</option>
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
                          onChange={(val) =>
                            handleInputChange({
                              target: {
                                name: "short_description",
                                value: val,
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
                          onChange={(val) =>
                            handleInputChange({
                              target: {
                                name: "description",
                                value: val,
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
                  <div className="ps-block__content">
                    <div className="form-group">
                      <div className="form-group--nest">
                        {renderProductImages(3)}
                      </div>
                    </div>
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
                        <label
                          htmlFor="manage_stock"
                          style={{ color: "black" }}
                        >
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
                          style={{ color: "black" }}
                        >
                          Allow only one quantity of this product to be bought
                          in a single order
                        </label>
                      </div>
                    </div>

                    {/* <div className="form-group">
                        <label>Tags</label>
                        <input className="form-control" type="text" />
                      </div> */}
                  </div>

                  <div style={{ marginTop: 100 }}>
                    <p>{uploading.status}</p>
                    <Progress type="line" percent={uploading.progress} />
                  </div>
                </figure>
                {/* {type === "variable" ? (
                  <div>
                    <figure className="ps-block--form-box">
                      <figcaption>Attribute and Variation</figcaption>
                      <div className="ps-block__content">
                        {renderAttributes()}

                        <hr style={{ borderWidth: 3 }} />

                        <div className="form-group form-group--select">
                          <div className="form-group__content">
                            <select
                              className="ps-select"
                              title="Attributes"
                              value={attr}
                              onChange={(e) => {
                                e.persist();
                                setAttr(e.target.value);
                              }}
                            >
                              <option value="">Select Attribute</option>
                              <option value="Color">Color</option>
                              <option value="Size">Size</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="ps-btn ps-btn--gray"
                          onClick={addAttr}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="ps-btn"
                          style={{ marginLeft: 10 }}
                        >
                          Save
                        </button>
                      </div>
                    </figure>
                    <div className="p-3">
                      <div>
                        <h3>Variations</h3>
                        <select
                          style={{ border: "none", borderRadius: 50 }}
                          className="p-3 bg-light"
                          name=""
                          id=""
                          onChange={(e) => {
                            setSingleVariation(e.target.value);
                          }}
                        >
                          <option value="single">Add Variation</option> */}
                {/* <option value="fromAttributes">Create Variation From All Attributes</option> */}
                {/* </select>
                        <br />
                        <span
                          className="btn ps-btn btn-lg mt-3"
                          onClick={(e) => addVariations(singleVariation)}
                        >
                          Add
                        </span>
                        {renderVariation()}
                      </div>
                      <span
                        className="btn ps-btn btn-lg mt-3"
                        onClick={() => {
                          saveVariations();
                        }}
                      >
                        Save Variations
                      </span>
                    </div>
                  </div>
                ) : null} */}
              </div>
            </div>

            {product.type === "variable" ? (
              <div>
                <figure className="ps-block--form-box">
                  <figcaption>Attributes and Variations</figcaption>
                  <div className="ps-block__content">
                    <Attributes
                      productAttributes={product.attributes}
                      setProduct={setProduct}
                    />
                  </div>
                </figure>
              </div>
            ) : null}
          </div>

          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="products.html">
              Back
            </a>
            <button className="ps-btn ps-btn--gray">Cancel</button>
            <button
              disabled={isUploading}
              type="submit"
              className="ps-btn"
              onClick={handleOnSubmit}
            >
              {isUploading ? (
                <img
                  src={require("../../../public/img/Interwind-loader.svg")}
                  alt="Uploading..."
                  width={40}
                  height={30}
                />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </section>
    </ContainerDefault>
  );
};

EditProductPage.getInitialProps = async ({ query }) => {
  return { pid: query.pid };
};

export default EditProductPage;

let styles = {
  variationSelect: {
    border: "none",
  },
  variationBtnSubmit: {
    minWidth: 120,
  },
  variationInput: {
    border: "1px solid lightgrey",
    borderRadius: 8,
  },
  imagesWrapper: { display: "flex", flexWrap: "wrap" },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    maxHeight: 300,
    backgroundColor: "black",
    marginLeft: 20,
    marginBottom: 10,
    position: "relative",
  },
  image: { width: 200, maxHeight: 300 },
  imageDel: {
    position: "absolute",
    fontSize: 15,
    top: 5,
    right: 5,
    width: 10,
    height: 30,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  attrWrapper: { marginBottom: 20 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  removeBtn: { color: "red", cursor: "pointer" },
  attrVal: {
    padding: 5,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#888",
  },
};
