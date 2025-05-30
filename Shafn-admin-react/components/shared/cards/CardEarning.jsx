import React, { useState, useEffect } from "react";
import { notification } from "antd";
import ReactHtmlParser from "react-html-parser";
import dynamic from "next/dynamic";

import ReportsRepository from "@/repositories/ReportsRepository";
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardEarning = () => {
  const isEarningsHidden = useSelector((state) => state.app.isEarningsHidden);
  const [sellerBalance, setSellerBalance] = useState(0);

  const state = {
    series: [44, 55, 41],
    options: {
      chart: {
        height: 500,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const getSellerBalance = async () => {
    try {
      const data = await ReportsRepository.getReportOverview();

      setSellerBalance(data.seller_balance);
    } catch (error) {
      console.log("Failed to get seller balance");
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    getSellerBalance();
  }, []);

  return (
    <div className="ps-card ps-card--earning">
      <div className="ps-card__header">
        <h4>Earnings</h4>
      </div>
      <div className="ps-card__content">
        <div className="ps-card__chart">
          <Chart options={state.options} series={state.series} type="donut" />
          <div className="ps-card__information">
            <i className="icon icon-wallet"></i>
            {isEarningsHidden ? (
              <strong>*****</strong>
            ) : (
              <strong>{ReactHtmlParser(sellerBalance)}</strong>
            )}
            <small>Balance</small>
          </div>
        </div>
        <div className="ps-card__status">
          <p className="yellow">
            <strong> $20,199</strong>
            <span>Income</span>
          </p>
          <p className="red">
            <strong> $1,021</strong>
            <span>Taxes</span>
          </p>
          <p className="green">
            <strong> $992.00</strong>
            <span>Fees</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardEarning;
