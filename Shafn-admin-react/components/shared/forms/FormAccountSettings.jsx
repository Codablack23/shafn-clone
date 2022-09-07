import React, { useState, useEffect } from "react"
import Router from "next/router"
import { notification } from "antd"
import FileRepository from "~/repositories/FileRepository"
import SettingsRepository from "~/repositories/SettingsRepository"
import PhoneInput from "react-phone-number-input"
import UserRepository from "~/repositories/UserRepository"
import DataRepository from "~/repositories/DataRepository"

const FormAccountSettings = () => {
  const [name, setName] = useState("")
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [address, setAddress] = useState({
    city: "",
    country: "",
    state: "",
    street_1: "",
    street_2: "",
    zip: "",
  })
  const [number, setNumber] = useState("")
  const [showEmail, setShowEmail] = useState("")
  const [enableTNC, setEnableTNC] = useState("")
  const [banner, setBanner] = useState("")
  const [profileImage, setProfileImage] = useState("")

  const [bannerFile, setBannerFile] = useState("")
  const [profileImageFile, setProfileImageFile] = useState("")

  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelection = (e) => {
    e.persist()

    let name = e.target.name
    let image = e.target.files[0]
    let type = image.type.split("/").pop()
    let allowedTypes = ["jpeg", "jpg", "png", "gif"]

    if (image) {
      if (allowedTypes.includes(type)) {
        let imgUrl = URL.createObjectURL(image)

        if (name === "profileImage") {
          setProfileImage(imgUrl)
          setProfileImageFile(image)
        } else {
          setBanner(imgUrl)
          setBannerFile(image)
        }
        URL.revokeObjectURL(image)
      } else {
        notification["error"]({
          message: "Invalid image type!",
          description: "Image type must be jpg, png or gif",
        })
      }
    }
  }

  const setAddr = (name, value) => {
    setAddress((current) => ({ ...current, [name]: value }))
  }

  const selectCountry = (e) => {
    if (e.target.value) {
      setAddr(e.target.name, e.target.value)
      _setStates(e.target.value)
    } else {
      setStates([])
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    setIsUploading(true)

    const settings = {
      store_name: name,
      address,
      phone: number,
      show_email: showEmail,
      enable_tnc: enableTNC,
    }

    try {
      let banner = null
      let profileImage = null

      // Only upload changed images
      if (bannerFile) banner = await FileRepository.uploadImage(bannerFile)

      if (profileImageFile)
        profileImage = await FileRepository.uploadImage(profileImageFile)

      const user = await UserRepository.getUser()

      if (banner && profileImage) {
        // Both images uploaded
        await SettingsRepository.updateStore(user.id, {
          ...settings,
          banner_id: banner.id,
          gravatar_id: profileImage.id,
        })
      } else if (banner) {
        // Only banner uploaded
        await SettingsRepository.updateStore(user.id, {
          ...settings,
          banner_id: banner.id,
        })
      } else if (profileImage) {
        // Only profile image uploaded
        await SettingsRepository.updateStore(user.id, {
          ...settings,
          gravatar_id: profileImage.id,
        })
      } else {
        // None uploaded
        await SettingsRepository.updateStore(user.id, settings)
      }

      setIsUploading(false)
      notification["success"]({
        message: "Updated settings uccessfully",
      })
      Router.reload(window.location.pathname)
    } catch (err) {
      setIsUploading(false)
      notification["error"]({
        message: "Unable to update settings",
        description: "Please check your data connection and try again.",
      })
    }
  }

  const getSettings = async () => {
    try {
      const _user = await UserRepository.getUser()

      const _vendor = await SettingsRepository.getStoreById(_user.id)

      const _countries = await DataRepository.getCountries()

      setCountries(_countries)

      const _country = _countries.find(
        (country) => country.name === _vendor.address.country
      )
      setStates(_country.states)

      setProfileImage(_vendor.gravatar)
      setBanner(_vendor.banner)
      setName(_vendor.store_name)
      setAddress(_vendor.address)
      setNumber(_vendor.phone)
      setShowEmail(_vendor.show_email)
      setEnableTNC(_vendor.toc_enabled)
    } catch (err) {
      notification["error"]({
        message: "Unable to get settings",
        description: "Please check your data connection and try again.",
      })
    }
  }

  const _setStates = (_country) => {
    const country = countries.find((country) => country.name == _country)
    setStates(country.states)
  }

  useEffect(() => {
    getSettings()
  }, [])
  return (
    <form className="ps-form--account-settings">
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
                onChange={handleImageSelection}
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <label
                htmlFor="banner-picker"
                style={{ ...styles.imgPicker, paddingTop: 12 }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
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
                onChange={handleImageSelection}
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
                  {countries.map((country, _) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p style={styles.addrHeader}>State</p>
            <div className="form-group form-group--select">
              <div className="form-group__content">
                <select
                  name="state"
                  className="ps-select"
                  title="states"
                  style={{ width: "100%" }}
                  value={address.state}
                  onChange={(e) => setAddr(e.target.name, e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
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
              defaultCountry="US"
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
        <button
          disabled={isUploading}
          type="submit"
          className="ps-btn success"
          onClick={handleOnSubmit}
        >
          {isUploading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  )
}

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
    width: "15vh",
    height: "15vh",
    borderRadius: 100,
    border: "3px solid white",
    marginTop: "-6em",
    marginBottom: 20,
    marginLeft: "2em",
  },
}

export default FormAccountSettings
