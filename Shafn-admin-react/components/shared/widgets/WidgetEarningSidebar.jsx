import React, { useEffect, useState } from "react";
import ReportsRepository from "~/repositories/ReportsRepository";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { toggleEarningsvisibility } from "~/store/configs/action";

const WidgetEarningSidebar = () => {
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const isEarningsHidden = useSelector(
    (state) => state.configs.IS_EARNINGS_HIDDEN
  );

  console.log(isEarningsHidden);

  const getBalance = async () => {
    try {
      const data = await ReportsRepository.getReportOverview();

      setBalance(data.seller_balance);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="ps-block--earning-count">
      <small>Earning</small>
      {isEarningsHidden && <h3>{ReactHtmlParser(balance)}</h3>}
      <button onClick={() => dispatch(toggleEarningsvisibility())}>
        toggle
      </button>
    </div>
  );
};

export default WidgetEarningSidebar;
