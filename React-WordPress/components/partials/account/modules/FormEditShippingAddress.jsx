import React, { useState, useEffect } from "react";
import Router from "next/router";
import { Form, Input, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "~/store/auth/action";
import WPCustomerRepository from "~/repositories/WP/WPCustomerRepository";

function FormEditShippingAddress() {
    const auth = useSelector((state) => state.auth);

    const [shipping, setShipping] = useState({
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        country: "",
        state: "",
        city: "",
        postcode: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {};

    const handleSubmit = async () => {};

    const getCustomer = async () => {
        try {
            const _customer = await WPCustomerRepository.getCustomer(auth.id);

            setShipping(_customer.shipping);
        } catch (error) {
            notification["error"]({
                message: "Unable to get shipping address",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);
    return (
        <form className="ps-form--edit-address">
            <div className="ps-form__header">
                <h3>Shipping address</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        FirstName <sup>*</sup>
                    </label>
                    <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        value={shipping.first_name}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Lastname <sup>*</sup>
                    </label>
                    <input
                        name="last_name"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.last_name}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        name="company"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.company}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Address 1 <sup>*</sup>
                    </label>
                    <input
                        name="address_1"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.address_1}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address 2</label>
                    <input
                        name="address_2"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.address_2}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Country <sup>*</sup>
                    </label>
                    <input
                        name="country"
                        type="text"
                        placeholder=""
                        className="form-control"
                        maxLength={2}
                        value={shipping.country}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        State <sup>*</sup>
                    </label>
                    <input
                        name="state"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.state}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        City <sup>*</sup>
                    </label>
                    <input
                        name="city"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.city}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Postcode <sup>*</sup>
                    </label>
                    <input
                        name="postcode"
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={shipping.postcode}
                        onClick={handleInputChange}
                    />
                </div>
                <div className="form-group submit">
                    <button
                        type="submit"
                        className="ps-btn"
                        disabled={isSaving}>
                        {isSaving ? <Spin /> : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FormEditShippingAddress;
