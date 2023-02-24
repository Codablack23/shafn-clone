import React, { useEffect, useState } from "react";
import ReportsRepository from "~/repositories/ReportsRepository";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { toggleEarningsVisibility } from "~/store/app/action";

const WidgetEarningSidebar = () => {
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const isEarningsHidden = useSelector((state) => state.app.isEarningsHidden);

  const getBalance = async () => {
    try {
      const data = await ReportsRepository.getReportOverview();

      setBalance(data.seller_balance);
    } catch (error) {
      return;
    }
  };

  let earnings, eye_icon;

  if (isEarningsHidden) {
    earnings = <h3>*****</h3>;
    eye_icon = (
      <i
        className="icon-eye-crossed"
        onClick={() => {
          dispatch(toggleEarningsVisibility(false));
        }}
      />
    );
  } else {
    earnings = <h3>{ReactHtmlParser(balance)}</h3>;
    eye_icon = (
      <i
        className="icon-eye"
        onClick={() => {
          dispatch(toggleEarningsVisibility(true));
        }}
      />
    );
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="ps-block--earning-count">
      <small>Earning</small>
      <div className="earning-count">
        {earnings}
        {eye_icon}
      </div>
    </div>
  );
};

export default WidgetEarningSidebar;
