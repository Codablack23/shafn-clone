import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { notification, Progress, Spin } from "antd";
import { toggleDrawerMenu } from "~/store/app/action";
import ProductRepository from "~/repositories/ProductRepository";
import ReactHtmlParser from "react-html-parser";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import "react-color-palette/lib/css/styles.css";
import "suneditor/dist/css/suneditor.min.css";
import "react-image-lightbox/style.css"; //
import ProductAttributes from "~/components/elements/products/ProductAttributes";
import ProductVariations from "~/components/elements/products/ProductVariations";
import { CustomModal } from "~/components/elements/custom/index";

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
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [variations, setVariations] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [viewProducts, setViewProducts] = useState(false);
  const [index, setIndex] = useState("");

  const [showNewTagInputField, setShowNewTagInputField] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [uploading, setUploading] = useState({
    status: "",
    progress: 0,
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let formNames = [
      "regular_price",
      "price",
      "stock_quantity",
      "downloadable",
      "virtual",
      "manage_stock",
      "sold_individually",
      "categories",
      "tags",
    ];
    if (name === "regular_price" && !isNaN(value)) {
      setProduct((product) => ({ ...product, [name]: value }));
    }

    if (name === "price" && !isNaN(value)) {
      if (Number(value) >= Number(product.regular_price)) {
        setIsPriceValid(false);
        setTimeout(() => {
          setIsPriceValid(true);
        }, 4000);
      } else {
        setProduct((product) => ({ ...product, [name]: value }));
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(value))) {
      setProduct((product) => ({ ...product, [name]: value }));
    }

    if (
      name === "downloadable" ||
      name === "virtual" ||
      name === "manage_stock" ||
      name === "sold_individually"
    ) {
      setProduct((product) => ({ ...product, [name]: !product[name] }));
    }

    if (name === "categories") {
      setProduct((product) => ({ ...product, [name]: [{ id: value }] }));
    }

    if (name === "tags") {
      let _tags = value.map((tag) => ({ id: tag.value }));
      setProduct((product) => ({ ...product, [name]: _tags }));
    }

    if (!formNames.includes(name)) {
      setProduct((product) => ({ ...product, [name]: value }));
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
          file: image,
        };
        setImageFiles((current) =>
          imgFile.id === "img-1" ? [imgFile, ...current] : [...current, imgFile]
        );

        const img = {
          id: e.target.id,
          url: URL.createObjectURL(image),
        };

        setSelectedImages((current) => current.concat(img));

        URL.revokeObjectURL(image);
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image type must be jpg, png or gif",
        });
      }
    }
  };

  const removeImage = (e, id) => {
    e.stopPropagation();
    setSelectedImages((current) => current.filter((img) => img.id !== id));
    setImageFiles((current) => current.filter((img) => img.id !== id));
  };

  const viewImage = (id) => {
    setViewProducts(true);
    let imgIndex = selectedImages.findIndex((img) => img.id === id);
    setIndex(imgIndex);
  };

  const renderProductImages = (num) => {
    return Array(num)
      .fill("")
      .map((el, i) => {
        let image = selectedImages.find((img) => img.id === `img-${i + 1}`);

        return (
          <div key={i} style={{ ...styles.filesSelect }}>
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
                  className="m-1 border p-3 text-center"
                  style={{
                    width: "20vh",
                    height: "21vh",
                    margin: "2% auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Add A Photo</span>
                  <br />
                  <i
                    className="fa fa-file-image-o text-secondary"
                    style={{ fontSize: 38, marginTop: 10, marginBottom: 10 }}
                    aria-hidden="true"
                  ></i>
                  <br />
                  {i === 0 ? <p>Primary</p> : null}
                </label>
              </div>
            ) : (
              <div
                key={image.id}
                className="m-1 bg-dark"
                style={{
                  position: "relative",
                  width: "20vh",
                  minHeight: "20vh",
                  margin: "2% auto",
                }}
                onClick={() => {
                  viewImage(image.id);
                }}
              >
                <img src={image.url} style={styles.image} />

                <div
                  className="ps-btn ps-btn--sm"
                  style={styles.imageDel}
                  onClick={(e) => {
                    removeImage(e, image.id);
                  }}
                >
                  <i
                    style={{
                      fontSize: 15,
                      marginLeft: 7,
                      marginTop: 5,
                      color: "white",
                    }}
                    className="bi bi-trash"
                  ></i>
                </div>
              </div>
            )}
          </div>
        );
      });
  };

  const addTag = async () => {
    try {
      let tag = await ProductRepository.addTag(newTag);

      let tagOption = { value: tag.id, label: tag.name };

      setTagOptions((tagOptions) => [...tagOptions, tagOption]);
    } catch (err) {
      notification["error"]({
        message: "Failed To Add Tag",
        description:
          err.response === undefined ? String(err) : err.response.data.message,
      });
    }
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

  const getProduct = async () => {
    try {
      const product = await ProductRepository.getProductByID(pid);

      if (product) {
        setProduct(product);

        let modifiedAttributes = product.attributes.map((attribute, index) => ({
          ...attribute,
          id: index,
          type: "select",
          error: "",
        }));

        setAttributes(modifiedAttributes);

        let imageFiles = Array.from(product.images).map((img, index) => ({
          id: `img-${index + 1}`,
          file: img.src,
        }));

        let selectedImages = Array.from(product.images).map((img, index) => ({
          id: `img-${index + 1}`,
          url: img.src,
        }));

        setImageFiles(imageFiles);
        setSelectedImages(selectedImages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    const categories = await ProductRepository.getCategories();

    setCategories(categories);
  };

  const getTags = async () => {
    const tags = await ProductRepository.getTags();

    let tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }));
    setTagOptions(tagOptions);
  };

  const getVariations = async () => {
    const variations = await ProductRepository.getVariations(pid);

    setVariations(variations);
  };

  useEffect(() => {
    getProduct();

    getCategories();

    getTags();

    getVariations();

    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
    <ContainerDefault title="Edit product">
      <HeaderDashboard title="Edit Product" description="ShafN Edit Product " />
      {product.name ? (
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
                            value={
                              product.categories && product.categories[0].id
                            }
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
                    <div className="pt-3" style={styles.filesStyles}>
                      {renderProductImages(9)}
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
                          className="ps-btn ps-btn--gray"
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
                <div>
                  <figure className="ps-block--form-box">
                    <figcaption>Attributes and Variations</figcaption>
                    <div className="ps-block__content">
                      <ProductAttributes
                        productID={pid}
                        attributes={attributes}
                        setAttributes={setAttributes}
                        setVariations={setVariations}
                        setProduct={setProduct}
                      />
                      {product.attributes.length > 0 ? (
                        <ProductVariations
                          productID={pid}
                          productAttributes={product.attributes}
                          variations={variations}
                          setVariations={setVariations}
                          setProduct={setProduct}
                        />
                      ) : null}
                    </div>
                  </figure>
                </div>
              ) : null}
            </div>

            <div className="ps-form__bottom">
              {/* <a className="ps-btn ps-btn--black" href="products.html">
                Back
              </a>
              <button className="ps-btn ps-btn--gray">Cancel</button> */}
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
          {viewProducts && (
            <Lightbox
              mainSrc={selectedImages[index].url}
              nextSrc={selectedImages[(index + 1) % selectedImages.length].url}
              prevSrc={
                selectedImages[
                  (index + selectedImages.length - 1) % selectedImages.length
                ].url
              }
              onCloseRequest={() => setViewProducts(false)}
              onMovePrevRequest={() =>
                setIndex(
                  (index + selectedImages.length - 1) % selectedImages.length
                )
              }
              onMoveNextRequest={() =>
                setIndex((index + 1) % selectedImages.length)
              }
            />
          )}

          <CustomModal isOpen={uploading.status ? true : false}>
            <div
              style={{
                marginTop: 100,
                minWidth: "200px",
              }}
            >
              <p className="text-center text-white">{uploading.status}</p>
              <Progress type="line" percent={uploading.progress} />
            </div>
          </CustomModal>
        </section>
      ) : (
        <Spin />
      )}

      {/* New Tag Input Field */}
      <CustomModal isOpen={showNewTagInputField}>
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>
            New Tag<sup>*</sup>
          </label>
          <input
            name="new tag"
            className="form-control"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />

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
      </CustomModal>
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
  image: {
    width: "20vh",
    height: "21vh",
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
