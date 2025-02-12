import React, { useState, useEffect } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import TableOrdersItems from "~/components/shared/tables/TableOrdersItems";
import { Select, Spin, Pagination, notification } from "antd";
import Link from "next/link";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import OrdersRepository from "~/repositories/OrdersRepository";
import ReactHtmlParser from "react-html-parser";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import AuthProvider from "~/components/auth/AuthProvider";

const { Option } = Select;
const OrdersPage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const filter = async (e) => {
    e.preventDefault();

    const params = {
      page: 1,
      per_page: 10,
      status: filterParams.status,
      // search: searchKeyword,
    };

    try {
      setIsFiltering(true);
      const orders = await OrdersRepository.getOrders(params);
      if (orders && orders.items.length > 0) {
        setOrders(orders);
      } else {
        notification["info"]({
          message: "No match for filter params",
        });
      }
    } catch (error) {
      notification["error"]({
        message: "Unable to filter",
        description:
          error.response === undefined
            ? ReactHtmlParser(String(error))
            : ReactHtmlParser(error.response.data.message),
      });
    } finally {
      setIsFiltering(false);
    }
  };

  const handlePagination = async (page, pageSize) => {
    setCurrentPage(page);
    const params = {
      page,
      per_page: pageSize,
    };

    try {
      const orders = await OrdersRepository.getOrders(params);
      setOrders(orders);
    } catch (error) {
      notification["error"]({
        message: "Unable to get orders",
        description: "Please check your data connection and try again.",
      });
    }
  };

  const getOrders = async () => {
    const params = {
      page: 1,
      per_page: 10,
    };

    try {
      const orders = await OrdersRepository.getOrders(params);
      setOrders(orders);
    } catch (error) {
      notification["error"]({
        message: "Unable to get orders",
        description: "Please check your data connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    getOrders();
  }, []);
  return (
    <AuthProvider loaderTitle="Loading Orders Page">
    <DefaultLayout>
      <ContainerDefault>
        <HeaderDashboard title="Orders" description="ShafN Orders Listing" />
        <section className="ps-items-listing">
          <div className="ps-section__header simple">
            <div className="ps-section__filter">
              <form className="ps-form--filter">
                <div className="ps-form__left">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      placeholder="Status"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                      onChange={(value) =>
                        setFilterParams((params) => ({
                          ...params,
                          status: value,
                        }))
                      }
                    >
                      <Option value="pending">Pending</Option>
                      <Option value="processing">Processing</Option>
                      <Option value="on-hold">On-hold</Option>
                      <Option value="completed">Completed</Option>
                      <Option value="cancelled">Cancelled</Option>
                      <Option value="refunded">Refunded</Option>
                      <Option value="failed">Failed</Option>
                    </Select>
                  </div>
                </div>
                <div className="ps-form__right">
                  <button
                    className="ps-btn ps-btn--gray"
                    onClick={filter}
                    disabled={isFiltering}
                  >
                    {isFiltering ? (
                      <Spin style={{ marginTop: 5 }} />
                    ) : (
                      <>
                        <i className="icon icon-funnel mr-2"></i>
                        Filter
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="ps-section__actions">
            <Link href="/products/create-product">
              <a className="ps-btn success">
                <i className="icon icon-plus mr-2"></i>New Order
              </a>
            </Link>
            <a className="ps-btn ps-btn--gray" href="new-order.html">
              <i className="icon icon-download2 mr-2"></i>Export
            </a>
          </div> */}
          </div>
          <div className="ps-section__content">
            <TableOrdersItems orders={orders} page={currentPage} />

            {loading && <Spin />}

            {orders && Number(orders.totalItems) === 0 && <p>No orders yet</p>}

            {orders && Number(orders.totalItems) > 0 && (
              <div className="ps-section__footer">
                <Pagination
                  total={orders && orders.totalItems}
                  pageSize={10}
                  responsive={true}
                  current={currentPage}
                  onChange={handlePagination}
                />
              </div>
            )}
          </div>
        </section>
      </ContainerDefault>
    </DefaultLayout>
    </AuthProvider>
  );
};
export default connect((state) => state.app)(OrdersPage);
