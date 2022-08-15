import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addProfile } from "~/store/profile/action"
import SettingsRepository from "~/repositories/SettingsRepository"
import UserRepository from "~/repositories/UserRepository"

const WidgetUserWelcome = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  const logout = () => {
    localStorage.removeItem("auth_token")
    window.location.assign("http://localhost:3000/account/login")
  }

  const getStoreData = async () => {
    try {
      const settings = await SettingsRepository.getStore()
      setName(settings.store_name)
      dispatch(addProfile({ name: settings.store_name }))

      const user = await UserRepository.getUser()
      const store = await SettingsRepository.getStoreById(user.id)
      setAvatarUrl(store.gravatar)
    } catch (error) {
      console.log("Failed to get store data")
      console.log(error)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img src={avatarUrl.toString()} alt="" style={styles.img} />
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{name}</a>
        </p>
      </div>
      <div
        className="ps-block__action"
        style={{ cursor: "pointer" }}
        onClick={logout}
      >
        <i className="icon-exit"></i>
      </div>
    </div>
  )
}

const styles = {
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
}

export default WidgetUserWelcome
