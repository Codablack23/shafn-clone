import React, { useEffect, useState } from "react";
import Router from "next/router";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notification } from "antd";
import { toggleDrawerMenu } from "~/store/app/action";
import { WPDomain } from "~/repositories/Repository";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const CreateProductPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [type, setType] = useState("simple");
  const [qty, setQty] = useState("");
  const [sku, setSku] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [descEditorState, setDescEditorState] = useState(
    EditorState.createEmpty()
  );
  const [shortDescEditor, setShortDescEditor] = useState(
    EditorState.createEmpty()
  );
  console.log(description);
  // console.log(descEditorState)
  // console.log(shortDescEditor)
  const onDescEditorStateChange = (current_State) => {
    setDescription(
      draftToHtml(convertToRaw(current_State.getCurrentContent()))
    );
    setDescEditorState(current_State);
  };

  const [isUploading, setIsUploading] = useState(false);

  const imageHandler = (e) => {
    //Display Image
    e.persist();
    if (e.target.files) {
      setImageFiles((current) => [...current, ...e.target.files]);

      const imgArr = Array.from(e.target.files).map((img) => ({
        name: img.name,
        url: URL.createObjectURL(img),
      }));

      setSelectedImages((current) => current.concat(imgArr));

      Array.from(e.target.files).map((img) => URL.revokeObjectURL(img));
    }
  };

  const uploadImages = (config) => {
    let images = [];
    imageFiles.forEach((img, index) => {
      let formData = new FormData();

      formData.append("file", img);

      axios
        .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
        .then((res) => {
          images.push({ src: res.data.source_url, position: index });
        })
        .catch((err) => {
          return;
        })
        .finally(() => {
          //  Check if last image has been reached
          if (index === imageFiles.length - 1) {
            // Check if every image uploaded
            if (images.length === imageFiles.length) {
              uploadProduct(config, images);
            } else {
              setIsUploading(false);
              notification["error"]({
                message:
                  "Some images did not upload!. Check your data connection and try again.",
              });
            }
          }
        });
    });
  };

  const uploadProduct = (config, images) => {
    let slug = `${name
      .replace(/[^a-zA-Z0-9-_]/g, " ")
      .replace(/  +/g, " ")
      .split(" ")
      .join("-")}`.trim();

    const product = {
      name,
      slug,
      price: discountedPrice.trim() || price.trim(),
      regular_price: price.trim(),
      sale_price: discountedPrice.trim(),
      short_description: description.trim(),
      categories: category,
      stock_quantity: Number(qty.trim()),
      sku,
      images,
    };

    // Upload Product
    axios
      .post(`${WPDomain}/wp-json/dokan/v1/products/`, product, config)
      .then((res) => {
        notification["success"]({
          message: "Product Uploaded Successfully",
        });
        Router.reload(window.location.pathname);
      })
      .catch((err) => {
        setIsUploading(false);
        notification["error"]({
          message: "Product Upload Failed",
          description: "Check your data connection and try again.",
        });
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setIsUploading(true);

    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    uploadImages(config); // product is uploaded in here
  };

  const removeImage = (name) => {
    setSelectedImages((current) => current.filter((img) => img.name !== name));
    setImageFiles((current) => current.filter((img) => img.name !== name));
  };

  const renderImages = () => {
    return selectedImages.map((img, index) => (
      <div key={img.url} style={styles.imageContainer}>
        <img src={img.url} style={styles.image} />

        <div
          className="ps-btn ps-btn--sm"
          style={styles.imageDel}
          onClick={removeImage.bind(this, img.name)}
        >
          x
        </div>
      </div>
    ));
  };

  const getStorename = (token) => {
    axios
      .get(`${WPDomain}/wp-json/dokan/v1/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.store_name.trim()) {
          notification["error"]({
            message: "You must have a Store Name to upload a product.",
          });
          setTimeout(() => Router.push("/settings"), 2000);
        }
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    let auth_token = localStorage.getItem("auth_token");

    getStorename(auth_token);
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
                        className="form-control"
                        type="text"
                        placeholder="Enter product name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    {/* <div className="form-group">
                      <label>
                        Reference<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter product Reference..."
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Product Summary<sup>*</sup>
                      </label>
                      <text-area
                        className="form-control"
                        rows="6"
                        placeholder="Enter product description..."
                      ></text-area>
                    </div> */}
                    <div className="form-group">
                      <label>
                        Sale Price<sup>*</sup>
                      </label>
                      <input
                        name="regualar_price"
                        className="form-control"
                        type="text"
                        placeholder=""
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                      />
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
                        type="number"
                        placeholder=""
                        required
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label>
                        Sold Items<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                      />
                    </div> */}
                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>
                      <Editor
                        editorState={descEditorState}
                        onEditorStateChange={onDescEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                      />
                      <textarea
                        name="short_description"
                        className="form-control"
                        rows="6"
                        value={description}
                        readOnly={true}
                      ></textarea>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    {/* <div className="form-group">
                      <label>Product Thumbnail</label>
                      <div className="form-group--nest">
                        <input
                          className="form-control mb-1"
                          type="text"
                          placeholder=""
                        />
                        <button className="ps-btn ps-btn--sm">Choose</button>
                      </div>
                    </div> */}
                    <div className="form-group">
                      <div className="form-group--nest">
                        <input
                          id="image-picker"
                          type="file"
                          accept="image/*"
                          onChange={imageHandler}
                          required
                          multiple
                          hidden
                        />
                        <label
                          htmlFor="image-picker"
                          className="btn border border-light btn-lg"
                          style={{ paddingTop: 12, padding: "3%" }}
                        >
                          <i
                            className="fa fa-file-image-o"
                            style={{ fontSize: 38 }}
                            aria-hidden="true"
                          ></i>
                          <br />
                          <span>Add image</span>
                        </label>
                      </div>
                    </div>
                    {/* <div className="form-group form-group--nest">
                      <input
                        className="form-control mb-1"
                        type="text"
                        placeholder=""
                      />
                      <button className="ps-btn ps-btn--sm">Choose</button>
                    </div> */}
                    {/* <div className="form-group">
                      <label>Video (optional)</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter video URL"
                      />
                    </div> */}

                    <div style={styles.imagesWrapper}>{renderImages()}</div>
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
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group form-group--select">
                      <label>Stock Status</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Status">
                          <option value="1">In stock</option>
                          <option value="2">Out of stock</option>
                          <option value="3">On backorder</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                </figure>
                {/* <figure className="ps-block--form-box">
                  <figcaption>Meta</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group form-group--select">
                      <label>Brand</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Brand">
                          <option value="1">Brand 1</option>
                          <option value="2">Brand 2</option>
                          <option value="3">Brand 3</option>
                          <option value="4">Brand 4</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </figure> */}
              </div>
            </div>
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
                  src={require("../../public/img/Interwind-loader.svg")}
                  alt="Uploading..."
                  width={40}
                  height={30}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </section>
    </ContainerDefault>
  );
};
export default CreateProductPage;

let styles = {
  imagesWrapper: { display: "flex", flexWrap: "wrap" },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
};
