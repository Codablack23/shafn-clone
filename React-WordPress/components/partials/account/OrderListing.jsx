import React, { useState } from "react";
import { Select, Table } from "antd";

export default function OrdersListing() {
    const { Option } = Select;
    const [userOrders, setUsersOrders] = useState([
        {
            key: "1",
            id: "1",
            customer: "John Brown",
            total: 32,
            status: "pending",
            date: new Date().toDateString(),
        },
    ]);
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
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];
    return (
        <div className="orders-listing">
            <header>
                <p className="ps__orders-heading">Orders</p>
                <p className="sub-heading">Your Order's Listing</p>
            </header>
            <section className="filter-container mt-5 d-lg-flex align-items-center">
                <input type="text" placeholder="Search" />
                <div className="select-component">
                    <Select
                        className="select-element"
                        style={{ width: "100%" }}>
                        {status.map((s, i) => (
                            <Option key={`${i}-orders`} value={s}>
                                {s}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button type="button" className="filter-button">
                    Filter
                </button>
            </section>
            <br />
            <section>
                <Table
                    columns={columns}
                    dataSource={userOrders}
                    scroll={{ x: 20 }}
                    onRow={(row) => {
                        return {
                            onClick: () => {
                                console.log(row);
                            },
                        };
                    }}
                />
            </section>
        </div>
    );
}
