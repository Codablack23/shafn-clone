import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { notification } from "antd";
import 'react-phone-number-input/style.css'
import { WPDomain } from "~/repositories/Repository";
import { allStates } from "~/utilities/stateList";
import PhoneInput from 'react-phone-number-input'

const FormAccountSettings = () => {
  const { data } = allStates;
  const [name, setName] = useState("");
  const [countryStates, setStates] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    country: "",
    state: "",
    street_1: "",
    street_2: "",
    zip: "",
  });
  const [number, setNumber] = useState("");
  const [showEmail, setShowEmail] = useState("");
  const [enableTNC, setEnableTNC] = useState("");
  const [img, setImg] = useState("");

  const [imgFile, setImgFile] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const imageHandler = (e) => {
    //Display Image
    e.persist();
    if (e.target.files) {
      let selected_img = e.target.files[0];
      setImgFile(selected_img);
      setImg(URL.createObjectURL(selected_img));
      URL.revokeObjectURL(selected_img);

      console.log(selected_img)
      console.log(URL.createObjectURL(selected_img))
      console.log(imgFile)
      console.log(img)
    }
  };

  const setAddr = (name, value) => {
    setAddress((current) => ({ ...current, [name]: value }));
  };

  const selectCountry = (e) => {
    if (e.target.value) {
      setAddr(e.target.name, e.target.value);
      const stateList = data.filter(
        (country) => country.name == e.target.value
      );
      setStates(stateList[0].states);
    } else {
      setStates([]);
    }
  };

  const renderCountries = () => {
    return data.map((country, index) => (
      <option key={index} value={country.name}>
        {country.name}
      </option>
    ));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setIsUploading(true);
    console.log(number)
    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    if (imgFile) {
      let formData = new FormData();

      formData.append("file", imgFile);

      axios
        .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
        .then((res) => {
          updateProfilePic(res.data.id, config);
        })
        .catch((err) => {
          setIsUploading(false);
          notification["error"]({
            message: "Settings Failed To Update",
            description: "Check your data connection and try again.",
          });
        });
    } else {
      updateSettings(config);
    }
  };

  const updateProfilePic = (imgID, config) => {
    // Get user id
    axios
      .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
      .then((res) => {
        // Update user profile picture
        axios
          .put(
            `${WPDomain}/wp-json/dokan/v1/stores/${res.data.id}`,
            { gravatar_id: imgID },
            config
          )
          .then((res) => {
            updateSettings(config);
          })
          .catch((err) => {
            setIsUploading(false);
            notification["error"]({
              message: "Settings Failed To Update",
              description: "Check your data connection and try again.",
            });
          });
      })
      .catch((err) => {
        setIsUploading(false);
        notification["error"]({
          message: "Settings Failed To Update",
          description: "Check your data connection and try again.",
        });
      });
  };

  const updateSettings = (config) => {
    let settings = {
      store_name: name,
      address,
      phone: number,
      show_email: showEmail,
      enable_tnc: enableTNC,
    };

    axios
      .put(`${WPDomain}/wp-json/dokan/v1/settings`, settings, config)
      .then((res) => {
        setIsUploading(false);
        notification["success"]({
          message: "Settings Updated Successfully",
        });
        Router.reload(window.location.pathname);
      })
      .catch((err) => {
        setIsUploading(false);
        notification["error"]({
          message: "Settings Failed To Update",
          description: "Check your data connection and try again.",
        });
      });
  };

  useEffect(() => {
    let auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    // Get user settings
    axios
      .get(`${WPDomain}/wp-json/dokan/v1/settings`, config)
      .then((res) => {
        let user = res.data;
        setName(user.store_name);
        setAddress(user.address);
        setNumber(user.phone);
        setShowEmail(user.show_email);
        setEnableTNC(user.enable_tnc);
      })
      .catch((err) => {
        return;
      });

    // Get user id
    axios
      .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
      .then((res) => {
        // Get user profile picture
        axios
          .get(`${WPDomain}/wp-json/dokan/v1/stores/${res.data.id}`, config)
          .then((res) => {
            setImg(res.data.gravatar);
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, []);
  return (
    <form
      className="ps-form--account-settings"
      action="index.html"
      method="get"
    >
      <div className="row">
        <div className="col-sm-12">
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
                style={{ ...styles.imgPicker, paddingTop: 12 }}
              >
               <div className="bg-dark" style={{...styles.imgCover}}>
               <img src={img} alt="" style={styles.img} />
               </div>
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
                    onClick={imageHandler}
                    style={{ fontSize: 30, cursor: "pointer" }}
                  ></i>
                </span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Store Name</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label>Address</label>
            <p style={styles.addrHeader}>Street</p>
            <input
              className="form-control"
              type="text"
              name="street_1"
              placeholder="Street Address"
              value={address.street_1}
              onChange={(e) => setAddr(e.target.name, e.target.value)}
            />
            <p style={styles.addrHeader}>Street 2</p>
            <input
              className="form-control"
              type="text"
              name="street_2"
              placeholder="Apartment, suite, e.t.c"
              value={address.street_2}
              onChange={(e) => setAddr(e.target.name, e.target.value)}
            />
            <p style={styles.addrHeader}>Country</p>
            <div className="form-group form-group--select">
              <div className="form-group__content">
                <select
                  name="country"
                  className="ps-select"
                  title="countries"
                  style={{ width: "100%" }}
                  defaultValue={address.country}
                  onChange={(e) => selectCountry(e)}
                >
                  <option value="">Select Country</option>
                  {renderCountries()}
                </select>
              </div>
            </div>
            <p style={styles.addrHeader}>State</p>
            <div className="form-group form-group--select">
              <div className="form-group__content">
                <select
                  name="state"
                  className="ps-select"
                  title="countries"
                  style={{ width: "100%" }}
                  defaultValue={address.country}
                  onChange={(e) => setAddr(e.target.name, e.target.value)}
                >
                  <option value="">Select State</option>
                  {countryStates.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p style={styles.addrHeader}>City</p>
            <input
              className="form-control"
              type="text"
              name="city"
              placeholder="Town/City"
              value={address.city}
              onChange={(e) => setAddr(e.target.name, e.target.value)}
            />
            <p style={styles.addrHeader}>Post/ZIP Code</p>
            <input
              className="form-control"
              type="number"
              name="zip"
              value={address.zip}
              onChange={(e) => setAddr(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label>Phone No.</label>
            {/* <input
              name="stock_quantity"
              className="form-control"
              type="number"
              placeholder="+123456..."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            /><br/> */}
            <PhoneInput
             defaultCountry="NG"
            countryCallingCodeEditable={false}
            placeholder="+123456..."
            international
            countryCallingCodeEditable={false}
            value={number}
            onChange={setNumber}
            />
          </div>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={showEmail === "yes" ? true : false}
                className="form-control"
                type="checkbox"
                id="show_email"
                name="show_email"
                onChange={() =>
                  setShowEmail((current) => (current === "off" ? "yes" : "off"))
                }
              />
              <label htmlFor="show_email" style={{ color: "black" }}>
                Show email address in store
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={enableTNC === "on" ? true : false}
                className="form-control"
                type="checkbox"
                id="enable_tnc"
                name="enable_tnc"
                onChange={() =>
                  setEnableTNC((current) => (current === "off" ? "on" : "off"))
                }
              />
              <label htmlFor="enable_tnc" style={{ color: "black" }}>
                Show terms and conditions in store page
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="ps-form__submit text-center">
        <button className="ps-btn ps-btn--gray mr-3">Cancel</button>
        <button
          disabled={isUploading}
          type="submit"
          className="ps-btn success"
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
            "Update Profile"
          )}
        </button>
      </div>
    </form>
  );
};

const styles = {
  imgPicker: {
    position: "relative",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    objectFit:'contain'
  },
  addrHeader: {
    marginTop: 10,
  },
  imgCover:{
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  }
};

export default FormAccountSettings;
