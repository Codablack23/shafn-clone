import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { Player } from "video-react";
import axios from "axios";
import { notification, Modal } from "antd";
import Slider from "react-slick";
import { toggleDrawerMenu } from "~/store/app/action";
import { WPDomain } from "~/repositories/Repository";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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

  const [videoFile, setVideoFile] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [isViewProducts, setIsViewProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const videoHandler = (e) => {
    e.persist();

    if (e.target.accept === "video/*" && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);

      setVideoUrl(url);

      URL.revokeObjectURL(e.target.files[0]);
    }
  };

  const imageHandler = (e) => {
    e.persist();

    if (e.target.accept === "image/*" && e.target.files[0]) {
      const imgFile = {
        id: e.target.id,
        img: e.target.files[0],
      };
      setImageFiles((current) => current.concat(imgFile));

      const img = {
        id: e.target.id,
        url: URL.createObjectURL(e.target.files[0]),
      };

      setSelectedImages((current) => current.concat(img));

      URL.revokeObjectURL(e.target.files[0]);

      // setImageFiles((current) => [...current, ...e.target.files]);

      // const imgArr = Array.from(e.target.files).map((img) => ({
      //   name: img.name,
      //   url: URL.createObjectURL(img),
      // }));

      // Array.from(e.target.files).map((img) => URL.revokeObjectURL(img));
    }
  };

  const removeVideo = () => {
    setVideoUrl("");
    setVideoFile("");
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
                  onChange={imageHandler}
                  required
                  multiple
                  hidden
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
                onClick={() => setIsViewProducts(true)}
              >
                <img src={image.url} style={styles.image} />

                <div
                  className="ps-btn ps-btn--sm"
                  style={styles.imageDel}
                  onClick={removeImage.bind(this, image.id)}
                >
                  x
                </div>
              </div>
            )}
          </div>
        );
      });
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
      type,
      price: discountedPrice.trim() || price.trim(),
      regular_price: price.trim(),
      sale_price: discountedPrice.trim(),
      short_description: shortDescription.trim(),
      description: description.trim(),
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                          defaultValue={type}
                        >
                          <option value="simple">Simple</option>
                          <option value="variable">Variable</option>
                        </select>
                      </div>
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

                    <div className="form-group">
                      <label>
                        Short Description<sup>*</sup>
                      </label>
                      <input
                        required
                        className="form-control"
                        type="text"
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>
                      <SunEditor
                        height="200px"
                        onChange={(val) => setDescription(val)}
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
                        {/* Video */}

                        <div style={{ width: 200, height: 200 }}>
                          {!videoUrl ? (
                            <>
                              <input
                                id="video"
                                type="file"
                                accept="video/*"
                                onChange={videoHandler}
                                required
                                multiple
                                hidden
                              />
                              <label
                                htmlFor="video"
                                className="btn border btn-lg"
                                style={{
                                  paddingTop: 12,
                                  padding: "3%",
                                  backgroundColor: "#ededed",
                                }}
                              >
                                <i
                                  className="fa fa-file-video-o"
                                  style={{ fontSize: 38 }}
                                  aria-hidden="true"
                                ></i>
                                <br />
                                <br />
                                <span>Add A Video</span>
                              </label>
                            </>
                          ) : (
                            <video
                              id="video"
                              src={videoUrl}
                              controls
                              width="200px"
                              height="200px"
                            />
                          )}
                        </div>
                        {/* Images */}
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

      {/* Products Viewer */}
      <Modal
        centered
        visible={isViewProducts}
        onCancel={() => setIsViewProducts((current) => !current)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <div>Add Product Video and Images slider here</div>
      </Modal>
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
