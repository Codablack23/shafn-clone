import React, { useState, useEffect } from "react";
import { notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import ReactHtmlParser from "react-html-parser";

import { updateAuth } from "~/store/auth/action";
import WPCustomerRepository from "~/repositories/WP/WPCustomerRepository";
import WPDataRepository from "~/repositories/WP/WPDataRepository";

function FormEditBillingAddress() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [billing, setBilling] = useState({
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        country: "",
        state: "",
        city: "",
        postcode: "",
        email: "",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const checkedFormNames = ["country", "postcode"];

        if (name === "country") {
            if (value) {
                setBilling((current) => ({ ...current, [name]: value }));
                _setStates(value);
            } else {
                setStates([]);
            }
        }

        if (name === "postcode" && !isNaN(value)) {
            setBilling((current) => ({ ...current, [name]: value }));
        }

        if (!checkedFormNames.includes(name)) {
            setBilling((current) => ({ ...current, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailFormat =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneFormat = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

        if (!emailFormat.test(billing.email)) {
            notification["error"]({
                message: "Invalid email",
            });
        } else if (!phoneFormat.test(billing.phone)) {
            notification["error"]({
                message: "Invalid phone number",
            });
        } else if (!isSaving) {
            setIsSaving(true);

            try {
                const _customer = await WPCustomerRepository.updateCustomer(
                    auth.id,
                    { billing }
                );

                dispatch(updateAuth(_customer));

                notification["success"]({
                    message: "Update successful",
                });
            } catch (error) {
                notification["error"]({
                    message: "Unable to update billing info",
                    description:
                        error.response === undefined
                            ? ReactHtmlParser(String(error))
                            : ReactHtmlParser(error.response.data.message),
                });
            } finally {
                setIsSaving(false);
            }
        }
    };

    const getCustomer = async () => {
        try {
            const _customer = await WPCustomerRepository.getCustomer(auth.id);

            const _countries = await WPDataRepository.getCountries();

            setCountries(_countries);

            _setStates(_customer.shipping.country);

            setBilling(_customer.billing);
        } catch (error) {
            return;
        } finally {
            setIsLoading(false);
        }
    };

    const _setStates = (_country) => {
        const country = countries.find((country) => country.code === _country);

        setStates(country.states);
    };

    useEffect(() => {
        if (auth.id) {
            getCustomer();
        }
    }, []);

    return (
        <form className="ps-form--edit-address" onSubmit={handleSubmit}>
            <div className="ps-form__header">
                <h3>Billing address</h3>
                {isLoading && <Spin style={{ marginTop: 10 }} />}
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        First name <sup>*</sup>
                    </label>
                    <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        value={billing.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        Last name <sup>*</sup>
                    </label>
                    <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        value={billing.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Company name</label>
                    <input
                        name="company"
                        type="text"
                        className="form-control"
                        value={billing.company}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Address 1 <sup>*</sup>
                    </label>
                    <input
                        name="address_1"
                        type="text"
                        className="form-control"
                        value={billing.address_1}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address 2</label>
                    <input
                        name="address_2"
                        type="text"
                        className="form-control"
                        value={billing.address_2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Country <sup>*</sup>
                    </label>
                    <select
                        name="country"
                        className="form-control"
                        title="countries"
                        value={billing.country}
                        onChange={handleInputChange}
                        required>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        State <sup>*</sup>
                    </label>
                    <select
                        name="state"
                        className="form-control"
                        title="states"
                        value={billing.state}
                        onChange={handleInputChange}
                        required>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.code} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        City <sup>*</sup>
                    </label>
                    <input
                        name="city"
                        type="text"
                        className="form-control"
                        value={billing.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        Postcode <sup>*</sup>
                    </label>
                    <input
                        name="postcode"
                        type="number"
                        className="form-control"
                        value={billing.postcode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        Email address <sup>*</sup>
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={billing.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone number</label>
                    <PhoneInput
                        defaultCountry="US"
                        countryCallingCodeEditable={false}
                        placeholder="+123456..."
                        international
                        value={billing.phone}
                        onChange={(value) =>
                            handleInputChange({
                                target: {
                                    name: "phone",
                                    value,
                                },
                            })
                        }
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

export default FormEditBillingAddress;
