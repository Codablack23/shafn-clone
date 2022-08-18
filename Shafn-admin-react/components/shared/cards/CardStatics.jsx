import React, { useState, useEffect } from "react"
import { notification } from "antd"
import ReactHtmlParser from "react-html-parser"

import ReportsRepository from "~/repositories/ReportsRepository"

const CardStatics = () => {
  const [report, setReport] = useState({
    sales: 0,
    earnings: 0,
    pageviews: 0,
    orders: 0,
  })

  const getReportOverview = async () => {
    try {
      const data = await ReportsRepository.getReportOverview()

      const orders =
        data.orders_count["wc-processing"] + data.orders_count["wc-completed"]

      setReport({
        sales: data.sales,
        earnings: data.seller_balance,
        pageviews: data.pageviews,
        orders,
      })
    } catch (error) {
      console.log("Failed to get report overview")
      console.error(error)
      return
    }
  }

  useEffect(() => {
    getReportOverview()
  }, [])

  return (
    <section className="ps-card ps-card--statics">
      <div className="ps-card__header">
        <h4>Statics</h4>
        <div className="ps-card__sortby">
          <i className="icon-calendar-empty"></i>
          <div className="form-group--select">
            <select className="form-control">
              <option value="1">Last 30 days</option>
              <option value="2">Last 90 days</option>
              <option value="3">Last 180 days</option>
            </select>
            <i className="icon-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="ps-card__content">
        <div className="ps-block--stat yellow">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Sales</p>
            <h4>
              {report.sales}
              {/* <small className="asc">
                <i className="icon-arrow-up"></i>
                <span>12,5%</span>
              </small> */}
            </h4>
          </div>
        </div>

        <div className="ps-block--stat pink">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Earnings</p>
            <h4>
              {ReactHtmlParser(report.earnings)}
              {/* <small className="asc">
                <i className="icon-arrow-up"></i>
                <span>7.1%</span>
              </small> */}
            </h4>
          </div>
        </div>

        <div className="ps-block--stat green">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Pageviews</p>
            <h4>
              {report.pageviews}
              {/* <small className="desc">
                <i className="icon-arrow-down"></i>
                <span>0.5%</span>
              </small> */}
            </h4>
          </div>
        </div>

        <div className="ps-block--stat pink">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Orders</p>
            <h4>
              {report.orders}
              {/* <small className="asc">
                <i className="icon-arrow-up"></i>
                <span>7.1%</span>
              </small> */}
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardStatics
