import React, { useEffect } from "react";
// import Router from "next/router"
import CardRecentOrders from "~/components/shared/cards/CardRecentOrders";
import CardSaleReport from "~/components/shared/cards/CardSaleReport";
import CardEarning from "~/components/shared/cards/CardEarning";
import CardStatics from "~/components/shared/cards/CardStatics";
import ContainerDashboard from "~/components/layouts/ContainerDashboard";
import { useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import AuthProvider from "~/components/auth/AuthProvider";
// import CardTopCountries from "~/components/shared/cards/CardTopCountries"
// import UserRepository from "~/repositories/UserRepository"
// import { Spin } from "antd"

const Dashboard = () => {
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(true)

  // const handleAuthToken = async () => {
  //   if (query && query.auth_token) {
  //     // try {
  //     // const response = await UserRepository.validateAuthToken(
  //     //   query.auth_token
  //     // )
  //     // if (response.success) {
  //     localStorage.setItem("auth_token", query.auth_token)
  //     setIsLoading(false)
  //     Router.push("/dashboard", undefined, {
  //       shallow: true,
  //     })
  //     // }
  //     // } catch (error) {
  //     //   console.error(error)
  //     //   alerT("Invalid token!")
  //     //   window.location.assign("http://localhost:3000/account/login")
  //     // }
  //   } else if (localStorage.getItem("auth_token")) {
  //     setIsLoading(false)
  //   } else {
  //     const domain =
  //       process.env.NEXT_PUBLIC_NODE_ENV === "production"
  //         ? "https://shafn.com"
  //         : "http://localhost:3000"
  //     window.location.assign(`${domain}/account/login`)
  //   }
  // }

  useEffect(() => {
    // handleAuthToken()
    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
    <AuthProvider>
<DefaultLayout>
      <ContainerDashboard title="Dashboard">
        <section className="ps-dashboard" id="homepage">
          <div className="">
            <div>
                <CardSaleReport />
              <div>
                <CardEarning />
              </div>
            </div>
            <CardRecentOrders />
          </div>
        </section>
      </ContainerDashboard>
    </DefaultLayout>
    </AuthProvider>
  );
};

export default Dashboard;
