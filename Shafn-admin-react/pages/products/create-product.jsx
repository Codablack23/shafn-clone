import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notification, Modal, Progress } from "antd";
import Slider from "react-slick";
import { toggleDrawerMenu } from "~/store/app/action";
import { WPDomain } from "~/repositories/Repository";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { CustomModal,CustomSlider } from "~/components/elements/custom/index";
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
  const [tags, setTags] = useState("");

  const [videoFile, setVideoFile] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [viewProducts, setViewProducts] = useState(false);

  const [isPriceValid, setIsPriceValid] = useState(true);

  const [uploading, setUploading] = useState({
    status: "",
    progress: 0,
  });
  const [imgId,setImgId]=useState('')
  const videoHandler = (e) => {
    e.persist();

    let video = e.target.files[0];
    if (e.target.accept === "video/*" && video) {
      let size = e.target.files[0].size / 1024 ** 2;

      let reader = new FileReader();

      reader.onload = () => {
        let vid = new Audio(reader.result);
        vid.onloadedmetadata = () => {
          if (size <= 20 && vid.duration <= 30) {
            const url = URL.createObjectURL(video);

            setVideoFile(video);
            setVideoUrl(url);

            URL.revokeObjectURL(video);
          } else {
            notification["error"]({
              message:
                "Video must not exceed a duration of 30secs and a size of 20MB",
            });
          }
        };
      };

      reader.readAsDataURL(video);
    } else {
      notification["error"]({
        message: "Not a video file!",
      });
    }
  };

  const imageHandler = (e) => {
    e.persist();

    if (e.target.accept === "image/*" && e.target.files[0]) {
      const imgFile = {
        id: e.target.id,
        img: e.target.files[0],
      };
      setImageFiles((current) =>
        imgFile.id === "img-1" ? [imgFile, ...current] : current.concat(imgFile)
      );

      const img = {
        id: e.target.id,
        url: URL.createObjectURL(e.target.files[0]),
      };

      setSelectedImages((current) => current.concat(img));

      URL.revokeObjectURL(e.target.files[0]);
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
          <div className="" key={i} style={{...styles.filesSelect}}>
            {image === undefined ? (
              <>
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
                  className="btn border m-2 p-3 btn-lg"
                  style={{
                    display:"block",
                    minwidth:"90%",
                    minHeight:"20vh",
                    margin:"auto",
                    borderColor:"lightgrey",
                  }}
                >
                
                  <span>Add A Photo</span>
                  <br />
                  <br />
                  <i
                    className="fa fa-file-image-o text-secondary"
                    style={{ fontSize: 38 }}
                    aria-hidden="true"
                  ></i><br />
                  {i === 0 ?<span> <span>Primary</span></span>: null}
                </label>
              </>
            ) : (
              <div
                key={image.id}
                style={{
                   position: "relative",
                   width: "90%",
                   height: "100%",
                   margin:"2% auto"
                  }}
                onClick={() => {setViewProducts(true); setImgId(image.id)}}
              >
                <img src={image.url} style={{...styles.image}} />

                <div
                  className="btn fw-5"
                  style={styles.imageDel}
                  onClick={removeImage.bind(this, image.id)}
                >
                <i
                 style={{
                  fontSize:18
                }}
                className="bi bi-trash text-danger"></i>
                </div>
              </div>
            )}
          </div>
        );
      });
  };

  const uploadVideo = () => {
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setUploading({
          status: "Uploading Video",
          progress: percent,
        });
      },
    };

    let formData = new FormData();

    formData.append("file", videoFile);

    axios
      .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
      .then((res) => {
        uploadImages(res.data.source_url);
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Video could not be uploaded!. Check your data connection and try again.",
        });

        setUploading({
          status: "",
          progress: 0,
        });
      });
  };

  const uploadImages = (video = "") => {
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setUploading({
          status: "Uploading Images",
          progress: percent,
        });
      },
    };

    let images = [];
    let imgFiles = imageFiles.map((img) => img.img);

    imgFiles.forEach((img, index, arr) => {
      let formData = new FormData();

      formData.append("file", img);

      axios
        .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
        .then((res) => {
          images.push({ src: res.data.source_url, position: index });

          if (images.length === imageFiles.length) {
            uploadProduct(images, video);
          }
        })
        .catch((err) => {
          arr.length = index + 1;
          notification["error"]({
            message:
              "Some images did not upload!. Check your data connection and try again.",
          });

          setUploading({
            status: "",
            progress: 0,
          });
        });
    });
  };

  const uploadProduct = (images = [], video) => {
    console.log("Uploading Product...");
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setUploading({
          status: "Uploading Product",
          progress: percent,
        });
      },
    };

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
      stock_quantity: Number(qty.trim()),
      sku,
      images,
      external_url: video,
      tags: tags.replace(/  +/g, " ").split(" "),
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
        notification["error"]({
          message: "Product Upload Failed",
          description:
            err.response === undefined
              ? "Check your data connection and try again."
              : err.response.data.message,
        });

        setUploading({
          status: "",
          progress: 0,
        });
      });
  };

  const validateInputs = () => {
    return new Promise((resolve, reject) => {
      if (name) {
        if (price) {
          if (category !== "") {
            if (qty > 0) {
              if (shortDescription) {
                if (imageFiles.map((el) => el.id).includes("img-1")) {
                  resolve(true);
                } else {
                  reject("Primary Image is required!");
                }
              } else {
                reject("Short Description is required!");
              }
            } else {
              reject("Sale Quantity must be 1 or more");
            }
          } else {
            reject("Category is required!");
          }
        } else {
          reject("Sale Price is required!");
        }
      } else {
        reject("Product Name is required!");
      }
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const upload = () => {
      setUploading((current) => ({ ...current, status: "Uploading" }));

      if (videoFile !== "") {
        uploadVideo();
      } else {
        uploadImages(); // product is uploaded in here
      }
    };

    try {
      let isValid = await validateInputs();

      if (isValid) {
        upload();
      }
    } catch (err) {
      notification["error"]({
        message: err,
      });
    }
  };

  const handleInputChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "regular_price" && isNaN(val) === false) {
      setPrice(val);
    }

    if (name === "price" && isNaN(val) === false) {
      if (Number(val) >= Number(price)) {
        setIsPriceValid(false);
        setTimeout(() => {
          setIsPriceValid(true);
        }, 4000);
      } else {
        setDiscountedPrice(val);
      }
    }

    if (name === "stock_quantity" && isNaN(val) === false) {
      setQty(val);
    }
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
                        Discounted price must be less than the sale price
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
                      <input
                        required
                        className="form-control"
                        type="text"
                        maxLength={100}
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
                  <figcaption>Product Files</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <div className="form-group--nest">
                        {/* Video */}
                        <div style={styles.filesStyles}>
                          <div className="m-2" style={{...styles.filesSelect}}>
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
                                className="btn btn-lg p-3"
                                style={{
                                  display:"block",
                                  minwidth:"90%",
                                  minHeight:"20vh",
                                  borderColor:"lightgrey",
                                  margin:"auto"
                                }}
                              >
                                <span>Add A Video</span>
                                <br />
                                <br />
                              
                                <i
                                  className="fa fa-file-video-o text-secondary"
                                  style={{ fontSize: 38 }}
                                  aria-hidden="true"
                                ></i>
                              </label>
                            </>
                          ) : (
                            <>
                              <video
                                id="video"
                                src={videoUrl}
                                controls
                                width="200px"
                                height="200px"
                              />

                              <button onClick={removeVideo}>
                                Delete video
                              </button>
                            </>
                          )}
                          </div>
                          {renderProductImages(9)}
                        </div>
                        {/* <div  
                           className="d-flex"
                           style={{flexWrap:"wrap", width: 200, height: 200 }}>
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
                                  marginRight:"2%",
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
                            <>
                              <video
                                id="video"
                                src={videoUrl}
                                controls
                                width="200px"
                                height="200px"
                              />

                              <button onClick={removeVideo}>
                                Delete video
                              </button>
                            </>
                          )}
                        </div>
                        {/* Images *
                        {renderProductImages(6)}*/}
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

                    <div className="form-group">
                      <label>
                        Tags<sup>*</sup>
                      </label>
                      <input
                        name="tags"
                        className="form-control"
                        type="text"
                        placeholder="E.g. shoe adidas ..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
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

                  <div style={{ marginTop: 100 }}>
                    <p>{uploading.status}</p>
                    <Progress type="line" percent={uploading.progress} />
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
              disabled={uploading.status ? true : false}
              type="submit"
              className="ps-btn"
              onClick={handleOnSubmit}
            >
              {uploading.status ? (
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
      <CustomModal
      isOpen={viewProducts}
      toggleModal={()=>{setViewProducts(current=>!current)}}
      >
       <CustomSlider
       images={selectedImages}
       imgIndex={imgId}
       video={videoUrl}
       />
      </CustomModal>
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
  image: {
     width: 200,
     maxHeight: "20vh",
     objectFit:"cover"
     },
  imageDel: {
    position: "absolute",
    fontSize: 15,
    bottom: 5,
    right: 5,
    width: 10,
    height: 30,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  filesStyles:{
    display:"flex",
    flexWrap:"wrap",
    width:"100%",
    justifyContent:"center"
  },
  fileSelect:{
    minWidth:'33%',
    minHeight:"30vh",
    marginRight:'2%'
  }
};
