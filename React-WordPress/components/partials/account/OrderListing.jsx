import React, { useState, useEffect } from "react";
import { Select, Spin, Table, notification, Tag } from "antd";
import WPOrderRepository from "~/repositories/WP/WPOrderRepository";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

export default function OrdersListing() {
    const { Option } = Select;

    const auth = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterParams, setFilterParams] = useState({
        status: "",
    });
    const status = [
        "Pending",
        "Processing",
        "On-hold",
        "Completed",
        "Cancelled",
        "Refunded",
        "Failed",
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                switch (status) {
                    case "processing":
                    case "on-hold":
                        color = "processing";
                        break;
                    case "completed":
                    case "refunded":
                        color = "success";
                        break;
                    case "cancelled":
                    case "failed":
                    case "trash":
                        color = "error";
                        break;
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Amount",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Billing",
            dataIndex: "billing",
            key: "billing",
            render: (billing) => (
                <span>
                    {billing.first_name} {billing.last_name},{" "}
                    {billing.address_1}, {billing.city} {billing.state}{" "}
                    {billing.postcode}, {billing.country}
                </span>
            ),
        },
        {
            title: "Date",
            dataIndex: "date_created",
            key: "date",
            render: (date) => <span>{new Date(date).toDateString()}</span>,
        },
    ];

    const filter = async (e) => {
        e.preventDefault();

        let params = {
            page: 1,
            per_page: 10,
            customer_id: auth.id,
        };
        if (filterParams.status) {
            params.status = filterParams.status;
        }

        try {
            setIsFiltering(true);
            const orders = await WPOrderRepository.getOrders(params);
            if (orders && orders.items.length > 0) {
                setCurrentPage(1);
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
        let params = {
            page,
            per_page: pageSize,
            customer_id: auth.id,
        };
        if (filterParams.status) {
            params.status = filterParams.status;
        }

        try {
            const orders = await WPOrderRepository.getOrders(params);
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
            customer_id: auth.id,
        };

        try {
            const orders = await WPOrderRepository.getOrders(params);
            setOrders(orders);
        } catch (error) {
            notification["error"]({
                message: "Unable to get orders",
                description: "Please check your data connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.id) {
            getOrders();
        }
    }, []);

    return (
        <div className="orders-listing">
            <header>
                <p className="ps__orders-heading">Orders</p>
                <p className="sub-heading">Your Order's Listing</p>
            </header>
            <br />
            <section className="filter-container mt-5 d-lg-flex align-items-center">
                <div className="select-component">
                    <Select
                        className="select-element"
                        placeholder="Status"
                        style={{ width: "100%" }}
                        onChange={(value) =>
                            setFilterParams((params) => ({
                                ...params,
                                status: value,
                            }))
                        }>
                        <Option value="">All</Option>
                        {status.map((s, i) => (
                            <Option key={`${i}-orders`} value={s.toLowerCase()}>
                                {s}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button
                    type="button"
                    className="filter-button"
                    onClick={filter}
                    disabled={isFiltering}>
                    {isFiltering ? <Spin style={{ marginTop: 5 }} /> : "Filter"}
                </button>
            </section>
            <br />
            <section>
                <Table
                    columns={columns}
                    dataSource={orders.items}
                    scroll={{ x: 20 }}
                    onRow={(row) => {
                        return {
                            onClick: () => {
                                console.log(row);
                            },
                        };
                    }}
                    loading={isLoading}
                    pagination={{
                        total: orders && orders.totalItems,
                        pageSize: 10,
                        responsive: true,
                        current: currentPage,
                        onChange: handlePagination,
                    }}
                />
            </section>
        </div>
    );
}
