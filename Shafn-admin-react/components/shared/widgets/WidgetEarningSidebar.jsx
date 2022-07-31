import React, { useEffect, useState } from "react"
import ReportsRepository from "~/repositories/ReportsRepository"
import ReactHtmlParser from "react-html-parser"

const WidgetEarningSidebar = () => {
  const [balance, setBalance] = useState(0)

  const getBalance = async () => {
    try {
      const data = await ReportsRepository.getReportOverview()

      setBalance(data.seller_balance)
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <div className="ps-block--earning-count">
      <small>Earning</small>
      <h3>{ReactHtmlParser(balance)}</h3>
    </div>
  )
}

export default WidgetEarningSidebar
