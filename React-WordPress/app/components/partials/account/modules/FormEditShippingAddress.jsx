import React, { useState, useEffect } from "react";
import { notification, Spin } from "antd";
import { useDispatch, connect } from "react-redux";
import { updateAuth } from "@/store/auth/action";
import WPCustomerRepository from "@/repositories/WP/WPCustomerRepository";
import WPDataRepository from "@/repositories/WP/WPDataRepository";

function FormEditShippingAddress(auth) {
    const dispatch = useDispatch();

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
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const checkedFormNames = ["country", "postcode"];

        if (name === "country") {
            if (value) {
                setShipping((current) => ({ ...current, [name]: value }));

                _setStates(value);
            } else {
                setStates([]);
            }
        }

        if (name === "postcode" && !isNaN(value)) {
            setShipping((current) => ({ ...current, [name]: value }));
        }

        if (!checkedFormNames.includes(name)) {
            setShipping((current) => ({ ...current, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSaving) {
            setIsSaving(true);

            try {
                const _customer = await WPCustomerRepository.updateCustomer(
                    auth.id,
                    { shipping }
                );

                dispatch(updateAuth(_customer));

                notification["success"]({
                    message: "Update successful",
                });
            } catch (error) {
                notification["error"]({
                    message: "Unable to update shipping info",
                    description:error.response || error || error.response.data.message
                });
            } finally {
                setIsSaving(false);
            }
        }
    };

    const _setStates = (_country) => {
        const country = countries.find((country) => country.code === _country);

        setStates(country.states);
    };

    const initializeState = async () => {
        try {
            setShipping(auth.shipping);

            const _countries = await WPDataRepository.getCountries();

            setCountries(_countries);

            const _country = _countries.find(
                (country) => country.code === auth.shipping.country
            );

            setStates(_country.states);
        } catch (error) {
            return;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.id) {
            initializeState();
        }
    }, []);

    return (
        <form className="ps-form--edit-address" onSubmit={handleSubmit}>
            <div className="ps-form__header">
                <h3>Shipping address</h3>
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
                        value={shipping.first_name}
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
                        value={shipping.last_name}
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
                        value={shipping.company}
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
                        value={shipping.address_1}
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
                        value={shipping.address_2}
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
                        value={shipping.country}
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
                        value={shipping.state}
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
                        value={shipping.city}
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
                        value={shipping.postcode}
                        onChange={handleInputChange}
                        required
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

export default connect((state) => state.auth)(FormEditShippingAddress);
