import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { notification } from "antd";
import { WPDomain } from "~/repositories/Repository";
import { allStates } from "~/utilities/stateList";
import PhoneInput from "react-phone-number-input";

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
  const [banner, setBanner] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [bannerFile, setBannerFile] = useState("");
  const [profileImageFile, setProfileImageFile] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const imageHandler = (e) => {
    e.persist();

    let name = e.target.name;
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

        if (name === "profileImage") {
          setProfileImage(imgUrl);
          setProfileImageFile(image);
        } else {
          setBanner(imgUrl);
          setBannerFile(image);
        }
        URL.revokeObjectURL(image);
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image type must be jpg, png or gif",
        });
      }
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    let auth_token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };

    try {
      let settings = {
        store_name: name,
        address,
        phone: number,
        show_email: showEmail,
        enable_tnc: enableTNC,
      };
      let banner = null;
      let profileImage = null;
      let vendor = null;

      if (bannerFile) {
        let formData = new FormData();
        formData.append("file", bannerFile);

        // Upload Banner
        banner = await axios
          .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
          .then((res) => res.data);
      } else banner = false;

      if (profileImageFile) {
        let formData = new FormData();
        formData.append("file", profileImageFile);

        // Upload Image
        profileImage = await axios
          .post(`${WPDomain}/wp-json/wp/v2/media`, formData, config)
          .then((res) => res.data);
      } else profileImage = false;

      let user = await axios
        .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
        .then((res) => res.data);

      if (user) {
        if (banner && profileImage) {
          vendor = await axios.put(
            `${WPDomain}/wp-json/dokan/v1/stores/${user.id}`,
            { ...settings, banner_id: banner.id, gravatar_id: profileImage.id },
            config
          );
        } else if (banner) {
          vendor = await axios.put(
            `${WPDomain}/wp-json/dokan/v1/stores/${user.id}`,
            { ...settings, banner_id: banner.id },
            config
          );
        } else if (profileImage) {
          vendor = await axios.put(
            `${WPDomain}/wp-json/dokan/v1/stores/${user.id}`,
            { ...settings, gravatar_id: profileImage.id },
            config
          );
        } else {
          vendor = await axios.put(
            `${WPDomain}/wp-json/dokan/v1/stores/${user.id}`,
            settings,
            config
          );
        }

        if (vendor) {
          setIsUploading(false);
          notification["success"]({
            message: "Settings Updated Successfully",
          });
          Router.reload(window.location.pathname);
        }
      }
    } catch (err) {
      setIsUploading(false);
      notification["error"]({
        message: "Settings Failed To Update",
        description: "Check your data connection and try again.",
      });
    }
  };

  const getSettings = async () => {
    try {
      let auth_token = localStorage.getItem("auth_token");
      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };

      let user = await axios
        .get(`${WPDomain}/wp-json/wp/v2/users/me`, config)
        .then((res) => res.data);

      let vendor = await axios
        .get(`${WPDomain}/wp-json/dokan/v1/stores/${user.id}`, config)
        .then((res) => res.data);

      setProfileImage(vendor.gravatar);
      setBanner(vendor.banner);
      setName(vendor.store_name);
      setAddress(vendor.address);
      setNumber(vendor.phone);
      setShowEmail(vendor.show_email);
      setEnableTNC(vendor.toc_enabled);
    } catch (err) {
      console.log("Settings Error: ", err);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);
  return (
    <form
      className="ps-form--account-settings"
      action="index.html"
      method="get"
    >
      <div className="row">
        <div className="col-sm-12">
          {/* Banner */}
          <div className="form-group">
            <div className="form-group--nest">
              <input
                name="banner"
                id="banner-picker"
                type="file"
                accept="image/*"
                onChange={imageHandler}
                required
                multiple
                hidden
              />

              <div
                className="bg-dark"
                style={{ width: "100%", height: "25vh" }}
              >
                <img
                  src={banner}
                  alt=""
                  style={{ width: "100%", height: "100%",objectFit:"cover" }}
                />
              </div>

              <label
                htmlFor="banner-picker"
                style={{ ...styles.imgPicker, paddingTop: 12 }}
              >
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
                    style={{ fontSize: 30, cursor: "pointer" }}
                  ></i>
                </span>
              </label>
            </div>
          </div>

          {/* Profile Image */}
          <div className="form-group">
            <div className="form-group--nest">
              <input
                name="profileImage"
                id="profileImage-picker"
                type="file"
                accept="image/*"
                onChange={imageHandler}
                required
                multiple
                hidden
              />

              <div className="bg-dark" style={{ ...styles.imgCover }}>
                <img src={profileImage} alt="" style={styles.img} />
              </div>

              <label
                htmlFor="profileImage-picker"
                style={{ ...styles.imgPicker, paddingTop: 12 }}
              >
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
                  value={address.country}
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
                  value={address.state}
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
            <PhoneInput
              defaultCountry="NG"
              countryCallingCodeEditable={false}
              placeholder="+123456..."
              international
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
        {/* <button className="ps-btn ps-btn--gray mr-3">Cancel</button> */}
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
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  addrHeader: {
    marginTop: 10,
  },
  imgCover: {
    width:'22vh',
    height: '22vh',
    borderRadius: 75,
    border:"3px solid white",
    marginTop:"-6em",
    marginBottom: 20,
    marginLeft:'1em'
  },
};

export default FormAccountSettings;
