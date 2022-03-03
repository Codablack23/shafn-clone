import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { notification, Progress, Spin } from "antd";
import { toggleDrawerMenu } from "~/store/app/action";
import SettingsRepository from "~/repositories/SettingsRepository";
import ProductRepository from "~/repositories/ProductRepository";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; //

import { CustomModal, CustomSlider } from "~/components/elements/custom/index";
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

const CreateProductPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("simple");
  const [qty, setQty] = useState("");
  const [sku, setSku] = useState("");
  const [tags, setTags] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [viewProducts, setViewProducts] = useState(false);

  const [isPriceValid, setIsPriceValid] = useState(true);

  const [uploading, setUploading] = useState({
    status: "",
    progress: 0,
  });

  const [index, setIndex] = useState("");

  const handleInputChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "regular_price" && !isNaN(val)) {
      setPrice(val);
    }

    if (name === "price" && !isNaN(val)) {
      if (Number(val) >= Number(price)) {
        setIsPriceValid(false);
        setTimeout(() => {
          setIsPriceValid(true);
        }, 4000);
      } else {
        setDiscountedPrice(val);
      }
    }

    if (name === "stock_quantity" && Number.isInteger(Number(val))) {
      setQty(Number(val));
    }
  };

  const imageHandler = (e) => {
    e.persist();

    let image = e.target.files[0];
    let type = image.type.split("/").pop();

    if (type === "jpeg" || type === "jpg" || type === "png" || type === "gif") {
      const imgFile = {
        id: e.target.id,
        file: image,
      };
      setImageFiles((current) =>
        imgFile.id === "img-1" ? [imgFile, ...current] : current.concat(imgFile)
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
        description: "Image must be a jpg, png or gif",
      });
    }
  };

  const removeImage = (id) => {
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
          <div className="" key={i} style={{ ...styles.filesSelect }}>
            {image === undefined ? (
              <>
                <input
                  id={`img-${i + 1}`}
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  required
                  hidden
                />

                <label htmlFor={`img-${i + 1}`} className="">
                  <div
                    className="m-1 border p-3 text-center"
                    style={styles.imageSelectBox}
                  >
                    <span>Add A Photo</span>
                    <br />
                    <br />
                    <i
                      className="fa fa-file-image-o text-secondary"
                      style={{ fontSize: 38, marginTop: 10, marginBottom: 10 }}
                      aria-hidden="true"
                    ></i>
                    <br />
                    {i === 0 ? (
                      <span>
                        {" "}
                        <span>Primary</span>
                      </span>
                    ) : null}
                  </div>
                </label>
              </>
            ) : (
              <div
                key={image.id}
                className="m-1 bg-dark"
                style={{
                  position: "relative",
                  width: "22vh",
                  minHeight: "22vh",
                  margin: "2% auto",
                }}
              >
                <img
                  src={image.url}
                  style={styles.image}
                  onClick={() => {
                    viewImage(image.id);
                  }}
                />

                <div
                  className="btn fw-5 p-3"
                  style={styles.imageDel}
                  onClick={() => {
                    removeImage(image.id);
                    setIndex(i - (1 % selectedImages.length));
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

  const validateInputs = () => {
    if (!name) return "Product Name is required!";
    if (!price) return "Sale Price is required!";
    if (Number(discountedPrice) > Number(price)) {
      setIsPriceValid(false);
      setTimeout(() => {
        setIsPriceValid(true);
      }, 4000);
      return "Discounted Price must be less than the Sale Price";
    }
    if (category === "") return "Category is required!";
    if (Number(qty) <= 0) return "Sale Quantity must be greater than 0";
    if (!shortDescription) return "Short Description is required!";

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
      console.log(uploading);
      let slug = `${name
        .replace(/[^a-zA-Z0-9-_]/g, " ")
        .replace(/  +/g, " ")
        .replace(/ /g, "-")}`.trim();

      const product = {
        name,
        slug,
        type,
        price: discountedPrice.trim() || price.trim(),
        regular_price: price.trim(),
        sale_price: discountedPrice.trim(),
        short_description: shortDescription.trim(),
        description: description.trim(),
        categories: category,
        stock_quantity: qty,
        sku,
        manage_stock: true,
      };

      ProductRepository.createProduct({ imageFiles, product, setUploading });
    } else {
      notification["error"]({
        message: result,
      });
    }
  };

  const getStorename = async () => {
    const storename = await SettingsRepository.getStorename();

    if (!storename) {
      notification["error"]({
        message: "You must have a Store Name to upload a product.",
      });
      setTimeout(() => Router.push("/settings"), 2000);
    }
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));

    getStorename();
  }, []);

  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard
        title="Create Product"
        description="ShafN Create New Product "
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
                        Sale Price<sup>*</sup>
                      </label>
                      <input
                        name="regular_price"
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={price}
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
                        placeholder=""
                        value={discountedPrice}
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
                  <div className="ps-block__content">
                    <div className="form-group">
                      <div className="form-group--nest">
                        <div style={styles.filesStyles}>
                          {renderProductImages(9)}
                        </div>
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
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </div>

                    {/* <div className="form-group">
                      <label>
                        Tags<sup>*</sup>
                      </label>
                      <input
                        name="tags"
                        className="form-control"
                        type="text"
                        placeholder="Enter tags as space seperated values e.g. adidas shoes ..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div> */}
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="products.html">
              Back
            </a>
            <button className="ps-btn ps-btn--gray">Cancel</button>
            <button
              disabled={uploading.status ? true : false}
              type="submit"
              className="ps-btn"
              onClick={handleOnSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
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
      {/* Products Viewer */}
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
    </ContainerDefault>
  );
};
export default CreateProductPage;

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
