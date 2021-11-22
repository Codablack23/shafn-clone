import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { toggleDrawerMenu } from "~/store/app/action";

const CreateProductPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [imageUploadStatus, setImageUploadStatus] = useState("NOT_UPLOADING");
  const [isUploading, setIsUploading] = useState(false);

  const imageHandler = (e) => {
    //Display Image
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);

    // Upload Images

    const formData = new FormData();

    formData.append("file", e.target.files[0]);

    let auth_token = localStorage.getItem("auth_token");

    const headers = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    setImageUploadStatus("UPLOADING");

    axios
      .post("https://shafn.com/wp-json/wp/v2/media", formData, headers)
      .then((res) => {
        setImageUploadStatus("UPLOADED");
        setImage([
          {
            src: res.data.source_url,
          },
        ]);
      })
      .catch((err) => {
        setImageUploadStatus("FAILED");
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

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
      images: image,
    };

    // Upload Images

    setIsUploading(true);

    axios
      .post("https://shafn.com/wp-json/dokan/v1/products/", product, config)
      .then((res) => {
        setIsUploading(false);
        alert("Product Uploaded Successfully");
      })
      .catch((err) => {
        setIsUploading(false);
        console.log("Error::", err.response);
      });
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);
  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard
        title="Create Product"
        description="Martfury Create New Product "
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
                      <textarea
                        name="short_description"
                        className="form-control"
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                          hidden
                        />
                        <label
                          htmlFor="image-picker"
                          className="ps-btn ps-btn--sm"
                          style={{ paddingTop: 12 }}
                        >
                          Choose
                        </label>
                        {imageUploadStatus === "UPLOADING" ? (
                          <img
                            src={require("../../public/img/Interwind-loader.svg")}
                            alt="Loading..."
                            width={50}
                            height={50}
                          />
                        ) : imageUploadStatus === "UPLOADED" ? (
                          <img
                            src={require("../../public/img/tick.jpg")}
                            alt="Loading..."
                            style={{
                              marginTop: 13,
                              marginLeft: 10,
                              width: 30,
                              height: 30,
                            }}
                          />
                        ) : imageUploadStatus === "FAILED" ? (
                          <img
                            src={require("../../public/img/cancel.png")}
                            alt="Loading..."
                            style={{
                              marginTop: 13,
                              marginLeft: 10,
                              width: 20,
                              height: 20,
                            }}
                          />
                        ) : null}
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

                    {imagePreview && (
                      <img
                        src={imagePreview}
                        style={{ width: 200, maxHeight: 300 }}
                      />
                    )}
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
            <button className="ps-btn ps-btn--gray" onClick={handleOnSubmit}>
              Cancel
            </button>
            <button disabled={isUploading} type="submit" className="ps-btn">
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
export default connect((state) => state.app)(CreateProductPage);
