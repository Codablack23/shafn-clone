import React, { useEffect } from "react"
import ContainerDefault from "@/components/layouts/ContainerDefault"
import FormAccountSettings from "@/components/shared/forms/FormAccountSettings"
import HeaderDashboard from "@/components/shared/headers/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { toggleDrawerMenu } from "@/store/app/action"
import DefaultLayout from "@/components/layouts/DefaultLayout"
import AuthProvider from "@/components/auth/AuthProvider"

const SettingsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
  }, [])
  return (
    <AuthProvider loaderTitle="Loading Settings Page">
    <DefaultLayout>
      <ContainerDefault title="Settings">
        <HeaderDashboard title="Settings" description="ShafN Settings" />
        <section className="ps-dashboard ps-items-listing">
          <div className="ps-section__left">
            <section className="ps-card">
              {/* <div className="ps-card__header">
              <h4>Account Settings</h4>
            </div> */}
              <div className="ps-card__content">
                <FormAccountSettings />
              </div>
            </section>
          </div>
          <div className="ps-section__right"></div>
        </section>
      </ContainerDefault>
    </DefaultLayout>
    </AuthProvider>
  )
}
export default connect((state) => state.app)(SettingsPage)
