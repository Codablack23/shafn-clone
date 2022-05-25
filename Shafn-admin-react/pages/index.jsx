import React, { useEffect } from "react";
import Router from "next/router";
import CardRecentOrders from "~/components/shared/cards/CardRecentOrders";
import CardSaleReport from "~/components/shared/cards/CardSaleReport";
import CardEarning from "~/components/shared/cards/CardEarning";
import CardStatics from "~/components/shared/cards/CardStatics";
import ContainerDashboard from "~/components/layouts/ContainerDashboard";
import { useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import CardTopCountries from "~/components/shared/cards/CardTopCountries";

const Index = ({ query }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // if (query && query.auth_token) {
    //   localStorage.setItem("auth_token", query.auth_token);
    //   Router.push("/");
    // }
    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
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
  );
};

Index.getInitialProps = async ({ query }) => {
  return { query: query };
};

export default Index;
