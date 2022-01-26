import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Modal, notification } from "antd";
import { toggleDrawerMenu } from "~/store/app/action";
import Router from "next/router";
import { CompatSource } from "webpack-sources";
import { ColorPicker, useColor } from "react-color-palette";
import { WPDomain } from "~/repositories/Repository";
import "react-color-palette/lib/css/styles.css";
import { uuid } from "uuidv4";

const EditProductPage = ({ pid }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("simple");
  const [downloadable, setDownloadable] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [qty, setQty] = useState("");
  const [sku, setSku] = useState("");
  const [inStock, setInStock] = useState("true");
  const [manageStock, setManageStock] = useState(false);
  const [soldIndividually, setSoldIndividually] = useState(false);
  const [tags, setTags] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [color, setColor] = useColor("hex", "#aabbcc");
  const [attr, setAttr] = useState(null);
  // variation attributes states
  const [variations, setVariations] = useState([]);
  const [variation, setVariation] = useState({});
  const [singleVariation, setSingleVariation] = useState("single");

  // variations Logic
  const addVariations = (varType) => {
    if (varType == "single" || variations.length < 50) {
      var new_id = uuid().slice(0, 3);
      var varObj = {
        id: new_id,
        regular_price: price,
        sku: "",
        attributes: createVariationAttributes(),
        in_stock: true,
      };
      setVariations((current) => [...current, varObj]);
      console.log(variation);
      // }else{
      //   addVariationFromAttributes()
    }
    //  console.log(variations)
  };
  const createVariationAttributes = (value = {}) => {
    var attrArray = [];
    attributes.forEach((att, id) => {
      attrArray.push({
        id: id,
        name: att.name.toLowerCase(),
        option: value[att.name.toLowerCase()],
      });
    });
    return attrArray;
  };
  // const addVariationFromAttributes=()=>{
  //   const sizes=attributes.filter(att=>att.name=="Size" && att.variation==true)[0].options
  //   const colors=attributes.filter(att=>att.name=="Color" && att.variation==true)[0].options
  //   const attArray=attributes.map(att=>{
  //     if(att.variation==true){
  //       return att.name
  //     }
  //   })
  //   var prev_id
  //   const allvariations=[]
  //   sizes.forEach((size)=>{
  //    colors.forEach((color)=>{
  //       prev_id=uuid().slice(0,3)

  //       const variationObject = {
  //         id:prev_id,
  //         regular_price:price,
  //         slug:size+color,
  //         sku:"",
  //         attributes:createVariationAttributes({color,size}),
  //         in_stock:true
  //       }

  //      if(!variations.map((attr) => attr.slug).includes(variationObject.slug)){
  //        allvariations.push(variationObject)
  //      }
  //    })

  //   })
  //  setVariations(current=>[...current,...allvariations])
  //  console.log(attributes)
  //  console.log(attArray)

  //  attArray.forEach(att=>{
  //      attributes.forEach(a=>{
  //        if(a.name==att){
  //          console.log(a.options)
  //        }
  //      })
  //  })
  // }
  const removeVariation = (id) => {
    setVariations((current) => current.filter((vari) => vari.id !== id));
  };
  const renderVarAttributes = (attName) => {
    return attributes.map((att) => {
      if (att.name == attName) {
        return att.options.map((options) => (
          <option key={options} value={options}>
            {options}
          </option>
        ));
      }
    });
  };
  const updateVariationAtt = (id, key, value) => {
    const varList = [...variations];
    var updated = [];

    if (varList.length > 0) {
      updated = [...varList.filter((v) => v.id == id)[0].attributes];
      updated.forEach((up) => {
        if (up.name == key) {
          up.option = value;
        }
      });
      // console.log(attributes)
    }
  };
  const updateVariations = (id, key, value) => {
    const varList = [...variations];
    var updated = [];
    if (varList.length > 0) {
      updated = varList.map((v) => {
        if (v.id == id) {
          v[key] = value;
        }
        return v;
      });
      setVariation(updated);
      // console.log(variations)
    }
  };
  const stockStatus = (stock) => (stock == "in stock" ? true : false);
  const renderAttSelection = (params) =>
    attributes.map((att) => {
      return (
        <select
          key={att.name}
          onChange={(e) => {
            updateVariationAtt(
              params.id,
              att.name.toLowerCase(),
              e.target.value
            );
          }}
          value={
            params.attributes.filter(
              (attr) => attr.name == att.name.toLowerCase()
            )[0].option
          }
          className="mr-3 border border-white rounded p-2"
          style={{ width: `${100 / attributes.length - 5}%` }}
          name="size"
          id=""
        >
          {renderVarAttributes(att.name)}
        </select>
      );
    });

  const renderVariation = () => {
    if (variations.length > 0) {
      return variations.map((vari) => (
        <div key={vari.id} className="variations-List mt-5 rounded">
          <header className="d-flex justify-content-between bg-light p-3">
            <div style={{ width: "15%" }}>
              <h4>{vari.id}</h4>
            </div>
            <div style={{ width: "70%" }}>{renderAttSelection(vari)}</div>
            <div
              className="d-flex justify-content-end"
              style={{ width: "15%" }}
            >
              <span className="btn">
                <span
                  style={{ fontSize: 15 }}
                  data-bs-toggle="collapse"
                  href={`#collapse${vari.id}`}
                >
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              </span>
              <span
                style={{ cursor: "pointer" }}
                className="text-danger small mt-2 ml-2"
                onClick={() => {
                  removeVariation(vari.id);
                }}
              >
                Remove
              </span>
            </div>
          </header>
          <div className="collapse" id={`collapse${vari.id}`}>
            <div className="card card-body container">
              <div className="row pl-4 p-2">
                <div className="col-12 col-md-6 p-2">
                  <label htmlFor="">Variation Price</label>
                  <br />
                  <input
                    onChange={(e) => {
                      updateVariations(
                        vari.id,
                        "regular_price",
                        e.target.value
                      );
                    }}
                    style={{ ...styles.variationInput }}
                    className="p-2"
                    placeholder=""
                    value={vari.regular_price}
                    type="number"
                  />
                </div>
                <div className="col-12 col-md-6 p-2">
                  <label htmlFor="">SKU</label>
                  <br />
                  <input
                    onChange={(e) => {
                      updateVariations(vari.id, "sku", e.target.value);
                    }}
                    style={{ ...styles.variationInput }}
                    className="p-2"
                    value={vari.sku}
                    type="text"
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-12 pr-3 pl-3">
                  <label htmlFor="">Stock Status</label>
                  <select
                    value={vari.in_stock == true ? "in stock" : "out of stock"}
                    style={{ ...styles.variationInput, width: "94%" }}
                    onChange={(e) => {
                      updateVariations(
                        vari.id,
                        "in_stock",
                        stockStatus(e.target.value)
                      );
                    }}
                    className="p-2 bg-white"
                    type="text"
                  >
                    <option value="in stock">In Stock</option>
                    <option value="out of stock">Out Of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };
  // end of variation Logic

  const imageHandler = (e) => {
    //Display Image
    e.persist();
    if (e.target.files) {
      setImageFiles((current) => [...current, ...e.target.files]);

      const imgArr = Array.from(e.target.files).map((img) => ({
        name: img.name,
        src: URL.createObjectURL(img),
      }));

      setSelectedImages((current) => current.concat(imgArr));

      Array.from(e.target.files).map((img) => URL.revokeObjectURL(img));
    }
    console.log(imageFiles);
    console.log(selectedImages);
  };

  const uploadImages = (config) => {
    let images = [];
    if (imageFiles.length === 0) {
      uploadProduct(config, images);
    } else {
      imageFiles.forEach((img, index) => {
        let formData = new FormData();

        formData.append("file", img);

        axios
          .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
          .then((res) => {
            images.push({ src: res.data.source_url });
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
    }
  };

  const removeImage = (name) => {
    setSelectedImages((current) => current.filter((img) => img.name !== name));
    setImageFiles((current) => current.filter((img) => img.name !== name));
    setImagesToUpload((current) => current.filter((img) => img.name !== name));
  };

  const addAttr = () => {
    if (attr) {
      setAttributes((current) => {
        if (current.map((attr) => attr.name).includes(attr)) {
          return current;
        } else {
          return current.concat({
            name: attr,
            options: [],
            visible: true,
            variation: false,
          });
        }
      });

      setAttr("");
    }
  };

  const renderImages = () => {
    return selectedImages.map((img, index) => (
      <div key={img.src} style={styles.imageContainer}>
        <img src={img.src} style={styles.image} />

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

  const renderAttributes = () => {
    return attributes.map((attr, index) => (
      <div key={index} style={styles.attrWrapper}>
        <div className="ps-btn--gray" style={styles.header}>
          <span style={{ fontWeight: "bold" }}>{attr.name}</span>
          <span onClick={() => removeAttr(attr.name)} style={styles.removeBtn}>
            Remove
          </span>
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
                onChange={() => toggleAttrVisibility(attr.name)}
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
                onChange={() => toggleAttrVariation(attr.name)}
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

  const toggleAttrVisibility = (name) => {
    setAttributes((attr) =>
      attr.map((item) => {
        if (item.name !== name) return item;
        return {
          ...item,
          visible: !item.visible,
        };
      })
    );
  };

  const toggleAttrVariation = (name) => {
    setAttributes((attr) =>
      attr.map((item) => {
        if (item.name !== name) return item;
        return {
          ...item,
          variation: !item.variation,
        };
      })
    );
  };
  const saveVariations = () => {
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    axios
      .put(
        `${WPDomain}/wp-json/wc/v3/products/${pid}/variations`,
        variations,
        config
      )
      .then((res) => {
        notification["success"]({
          message: "Variations Added Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Varitions could not be added",
          description: "Check your data connection and try again.",
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
      attributes,
      price: discountedPrice.trim() || price.trim(),
      regular_price: price.trim(),
      sale_price: discountedPrice.trim(),
      short_description: shortDescription,
      description,
      variations: variations.map((v) => v.id),
      categories: category,
      stock_quantity: qty,
      sku,
      in_stock: inStock === true || inStock === "true" ? true : false,
      downloadable,
      virtual,
      images: imagesToUpload.concat(images),
      manage_stock: manageStock,
      sold_individually: soldIndividually,
      type,
    };
    console.log(product);

    axios
      .put(`${WPDomain}/wp-json/dokan/v1/products/${pid}`, product, config)
      .then((res) => {
        notification["success"]({
          message: "Product Updated Successfully",
        });
        Router.push("/products");
      })
      .catch((err) => {
        notification["error"]({
          message: "Product Upload Failed",
          description: "Check your data connection and try again.",
        });
        setIsUploading(false);
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

  useEffect(() => {
    // Get product
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/${pid}/variations`, config)
      .then((result) => {
        let allVariations = result.data;
        setVariations(allVariations);
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Failed to get variations!",
          description: "Check your data connection and try again.",
        });
      });
    axios
      .get(`${WPDomain}/wp-json/dokan/v1/products/${pid}`, config)
      .then((res) => {
        let product = res.data;
        console.log(product);
        setName(product.name);
        setAttributes(product.attributes);
        setPrice(String(product.regular_price));
        setDiscountedPrice(String(product.price));
        setCategory([
          { id: product.catageories ? product.categories[0].id : "15" },
        ]);
        setQty(product.stock_quantity);
        setType(product.type);
        setShortDescription(product.description);
        setDescription(product.short_description);
        setSku(product.sku);
        setSelectedImages(product.images);
        setImagesToUpload(product.images);
        setDownloadable(product.downloadable);
        setVirtual(product.virtual);
        setInStock(product.in_stock);
        setManageStock(product.manage_stock);
        setSoldIndividually(product.sold_individually);
      })
      .catch((err) => {
        notification["error"]({
          message: "Failed to get product!",
          description: "Check your data connection and try again.",
        });
      });

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
                        className="form-control"
                        type="text"
                        placeholder="Enter product name..."
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
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="simple">Simple</option>
                          <option value="variable">Variable</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={downloadable}
                          className="form-control"
                          type="checkbox"
                          id="downloadable"
                          name="downloadable"
                          onChange={() =>
                            setDownloadable((current) => !current)
                          }
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
                          checked={virtual}
                          className="form-control"
                          type="checkbox"
                          id="virtual"
                          name="virtual"
                          onChange={() => setVirtual((current) => !current)}
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
                          title="Category"
                          value={category && category[0].id}
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
                      <textarea
                        name="short_description"
                        className="form-control"
                        rows="6"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>
                        Description<sup>*</sup>
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </figure>
                {/* product images */}
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
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

                    <div style={styles.imagesWrapper}>{renderImages()}</div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                    <div className="form-group form-group--select">
                      <label>
                        Stock Status<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          name="status"
                          className="ps-select"
                          title="Status"
                          value={String(inStock)}
                          onChange={(e) => setInStock(e.target.value)}
                        >
                          <option value="true">In Stock</option>
                          <option value="false">Out of Stock</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          checked={manageStock}
                          className="form-control"
                          type="checkbox"
                          id="manage_stock"
                          name="manage_stock"
                          onChange={() => setManageStock((current) => !current)}
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
                          checked={soldIndividually}
                          className="form-control"
                          type="checkbox"
                          id="sold_individually"
                          name="sold_individually"
                          onChange={() =>
                            setSoldIndividually((current) => !current)
                          }
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
                </figure>
                {type === "variable" ? (
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
                          <option value="single">Add Variation</option>
                          {/* <option value="fromAttributes">Create Variation From All Attributes</option> */}
                        </select>
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
                ) : null}
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
