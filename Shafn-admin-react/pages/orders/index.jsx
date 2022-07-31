import React, { useState, useEffect } from "react"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import TableOrdersItems from "~/components/shared/tables/TableOrdersItems"
import { Select, Spin, Pagination, notification } from "antd"
import Link from "next/link"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { toggleDrawerMenu } from "~/store/app/action"
import OrdersRepository from "~/repositories/OrdersRepository"

const { Option } = Select
const OrdersPage = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [orders, setOrders] = useState(null)

  const handlePagination = async (page, pageSize) => {
    setCurrentPage(page)
    const params = {
      page: page,
      per_page: pageSize,
    }

    try {
      const products = await OrdersRepository.getOrders(params)
      setOrders(products)
    } catch (error) {
      notification["error"]({
        message: "Unable to get orders",
        description: "Check your data connection and try again.",
      })
    }
  }

  const getOrders = async () => {
    const params = {
      page: 1,
      per_page: 10,
    }

    try {
      const orders = await OrdersRepository.getOrders(params)
      setOrders(orders)
    } catch (error) {
      notification["error"]({
        message: "Unable to get orders",
        description: "Check your data connection and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
    getOrders()
  }, [])
  return (
    <ContainerDefault>
      <HeaderDashboard title="Orders" description="ShafN Orders Listing" />
      <section className="ps-items-listing">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                  />
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Status"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="active">Active</Option>
                    <Option value="in-active">InActive</Option>
                  </Select>
                </div>
              </div>
              <div className="ps-form__right">
                <button className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>
                  Filter
                </button>
              </div>
            </form>
          </div>
          <div className="ps-section__actions">
            <Link href="/products/create-product">
              <a className="ps-btn success">
                <i className="icon icon-plus mr-2"></i>New Order
              </a>
            </Link>
            <a className="ps-btn ps-btn--gray" href="new-order.html">
              <i className="icon icon-download2 mr-2"></i>Export
            </a>
          </div>
        </div>
        <div className="ps-section__content">
          {loading ? (
            <Spin />
          ) : orders && Number(orders.totalItems) > 0 ? (
            <TableOrdersItems orders={orders} />
          ) : (
            <p>No orders yet</p>
          )}
        </div>
        <div className="ps-section__footer">
          <Pagination
            total={orders && orders.totalItems}
            pageSize={10}
            responsive={true}
            current={currentPage}
            onChange={handlePagination}
          />
        </div>
      </section>
    </ContainerDefault>
  )
}
export default connect((state) => state.app)(OrdersPage)
