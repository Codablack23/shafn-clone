import React, { useEffect, useState } from "react"
import Router from "next/router"
import CardRecentOrders from "~/components/shared/cards/CardRecentOrders"
import CardSaleReport from "~/components/shared/cards/CardSaleReport"
import CardEarning from "~/components/shared/cards/CardEarning"
import CardStatics from "~/components/shared/cards/CardStatics"
import ContainerDashboard from "~/components/layouts/ContainerDashboard"
import { useDispatch } from "react-redux"
import { toggleDrawerMenu } from "~/store/app/action"
import CardTopCountries from "~/components/shared/cards/CardTopCountries"
import UserRepository from "~/repositories/UserRepository"

const Index = ({ query }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const handleAuthToken = async () => {
    if (query && query.auth_token) {
      // try {
      // const response = await UserRepository.validateAuthToken(
      //   query.auth_token
      // )
      // if (response.success) {
      localStorage.setItem("auth_token", query.auth_token)
      setIsLoading(false)
      Router.push("/", undefined, {
        shallow: true,
      })
      // }
      // } catch (error) {
      //   console.error(error)
      //   alerT("Invalid token!")
      //   window.location.assign("http://localhost:3000/account/login")
      // }
    } else if (localStorage.getItem("auth_token")) {
      setIsLoading(false)
    } else {
      window.location.assign("http://localhost:3000/account/login")
    }
  }

  useEffect(() => {
    handleAuthToken()
    dispatch(toggleDrawerMenu(false))
  }, [])

  let dashboard

  if (isLoading) {
    dashboard = <p>Loading</p>
  } else {
    dashboard = (
      <ContainerDashboard title="Dashboard">
        <section className="ps-dashboard" id="homepage">
          <div className="ps-section__left">
            <div className="row">
              <div className="col-xl-8 col-12">
                <CardSaleReport />
              </div>
              <div className="col-xl-4 col-12">
                <CardEarning />
              </div>
            </div>
            <CardRecentOrders />
          </div>
          <div className="ps-section__right">
            <CardStatics />
            <CardTopCountries />
          </div>
        </section>
      </ContainerDashboard>
    )
  }

  return dashboard
}

Index.getInitialProps = async ({ query }) => {
  return { query: query }
}

export default Index
