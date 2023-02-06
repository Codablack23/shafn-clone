import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Radio,
    Checkbox,
    notification,
    Spin,
} from "antd";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import WPOrderRepository from "~/repositories/WP/WPOrderRepository";
import {
    convertFormData,
    convertJsonToFormData,
    convertToURLEncoded,
} from "~/utilities/WPHelpers";
import WPPaymentRepository from "~/repositories/WP/WPPaymentRepository";
import { loadStripe } from "@stripe/stripe-js";
import ReactHtmlParser from "react-html-parser";
import { clearCheckoutItems } from "~/store/checkout-items/action";
import { removeItems } from "~/store/cart/action";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const WPFormCheckout = ({ auth, amount, checkoutItems }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [paymentGateways, setPaymentGateways] = useState(null);
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function getCheckoutData() {
        const WPGateways = await WPOrderRepository.getPaymentGateWays();
        if (WPGateways) {
            setPaymentGateways(WPGateways);
            setTimeout(function () {
                setLoading(false);
            }, 200);
            return WPGateways;
        } else {
            setPaymentGateways(null);
            return null;
        }
    }

    async function placeOrder(values) {
        let WPShipping, WPLineItems;
        let checkoutData = {
            customer_id: auth.id,
            payment_method: null,
            payment_method_title: null,
            set_paid: false,
            billing: null,
            shipping: null,
            line_items: null,
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: "10.00",
                },
            ],
        };

        let WPBilling = {
            first_name: values.first_name,
            last_name: values.last_name,
            address_1: values.address_1,
            address_2: values.address_2,
            city: values.city,
            state: values.state,
            postcode: values.postcode,
            country: values.country,
            email: values.email,
            phone: values.phone,
        };

        if (isDifferentAddress) {
            WPShipping = {
                first_name: values.shipping_first_name,
                last_name: values.shipping_last_name,
                address_1: values.shipping_address_1,
                address_2: values.shipping_address_2,
                city: values.shipping_city,
                state: values.shipping_state,
                postcode: values.shipping_state,
                country: values.shipping_country,
            };
        } else {
            WPShipping = {
                first_name: values.first_name,
                last_name: values.last_name,
                address_1: values.address_1,
                address_2: values.address_2,
                city: values.city,
                state: values.state,
                postcode: values.postcode,
                country: values.country,
            };
        }
        if (checkoutItems) {
            WPLineItems = checkoutItems.map((item) => ({
                product_id: item.id,
                variation_id: item.variation_id,
                quantity: item.quantity,
            }));
        }
        // checkoutData.payment_method = selectedGateway.id;
        // checkoutData.payment_method_title = selectedGateway.title;
        checkoutData.billing = WPBilling;
        checkoutData.shipping = WPShipping;
        checkoutData.line_items = WPLineItems;

        if (!isSubmitting) {
            setIsSubmitting(true);

            try {
                console.log("creating new order...");
                const order = await WPOrderRepository.createNewOrder(
                    convertToURLEncoded(checkoutData)
                );

                const products = checkoutItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    amount: item.price,
                    quantity: item.quantity,
                }));

                const payload = {
                    products,
                    orderId: order.id,
                    user: {
                        ...WPBilling,
                        email: auth.email,
                    },
                };

                console.log("creating order session...");
                const stripe = await stripePromise;
                const { data } = await WPPaymentRepository.createOrderSession(
                    payload
                );

                await stripe.redirectToCheckout({
                    sessionId: data.stripeSession.id,
                });
            } catch (error) {
                console.log("Error making payment");
                console.log(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    function handleChangeDifferentAddress(e) {
        setIsDifferentAddress(e.target.checked);
    }

    useLayoutEffect(() => {
        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

        if (!auth.isLoggedIn) {
            Router.push("/account/login");
        }
    }, []);

    useEffect(() => {
        getCheckoutData();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            // Check to see if this is a redirect back from Checkout
            const query = new URLSearchParams(window.location.search);
            if (query.get("payment_status") === "success") {
                dispatch(clearCheckoutItems());
                dispatch(removeItems(checkoutItems));
            }

            if (query.get("payment_status") === "cancelled") {
            }
        })();
    }, []);

    // Views
    let listItemsView,
        shippingInfoView,
        paymentGatewaysView,
        selectedPaymentGateway;

    if (checkoutItems && checkoutItems.length > 0) {
        listItemsView = checkoutItems.map((product) => (
            <a key={`${product.id}-${product.variation_id}`}>
                <strong>
                    {product.name}
                    <span>x{product.quantity}</span>
                </strong>
                <small>${product.quantity * product.price}</small>
            </a>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }

    if (isDifferentAddress) {
        shippingInfoView = (
            <figure>
                <h3 className="ps-form__heading">Shipping information</h3>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                First Name <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Last Name <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Address 1 <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_address_1"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>Address 2 (optional)</label>
                            <Form.Item
                                name="shipping_address_2"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                City <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_city"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                State <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_state"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Postcode <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_postcode"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Country <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_country"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required.",
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    value={shipping.country}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </figure>
        );
    }

    return (
        <Form
            form={form}
            name="control-hooks"
            className="ps-form--checkout"
            initialValues={{
                first_name: auth?.billing?.first_name,
                last_name: auth?.billing?.last_name,
                address_1: auth?.billing?.address_1,
                address_2: auth?.billing?.address_2,
                city: auth?.billing?.city,
                state: auth?.billing?.state,
                postcode: auth?.billing?.postcode,
                country: auth?.billing?.country,
                email: auth?.billing?.email,
                phone: auth?.billing?.phone,

                shipping_first_name: auth?.shipping?.first_name,
                shipping_last_name: auth?.shipping?.last_name,
                shipping_address_1: auth?.shipping?.address_1,
                shipping_address_2: auth?.shipping?.address_2,
                shipping_city: auth?.shipping?.city,
                shipping_state: auth?.shipping?.state,
                shipping_postcode: auth?.shipping?.postcode,
                shipping_country: auth?.shipping?.country,
            }}
            onFinish={placeOrder}>
            <div className="row">
                <div className="col-lg-8">
                    <figure>
                        <h3 className="ps-form__heading">
                            Billing information
                        </h3>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        First Name{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="first_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Last Name{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="last_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Address 1{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="address_1"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Address 2 (optional)</label>
                                    <Form.Item
                                        name="address_2"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        City <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        State{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="state"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Postcode{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="postcode"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Country{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="country"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Email{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Phone Number{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required.",
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </figure>
                    <div className="form-group">
                        <Checkbox
                            onChange={(e) => handleChangeDifferentAddress(e)}>
                            Ship to a different address?
                        </Checkbox>
                    </div>
                    {shippingInfoView}
                </div>
                <div className="col-lg-4 ps-block--checkout-order">
                    <div className="ps-form__orders">
                        <h3>Your order</h3>
                        <div className="ps-block--checkout-order">
                            <div className="ps-block__content">
                                <figure>
                                    <figcaption>
                                        <strong>Product</strong>
                                        <strong>SubTotal</strong>
                                    </figcaption>
                                </figure>
                                <figure className="ps-block__items">
                                    {listItemsView}
                                </figure>
                                <figure>
                                    <figcaption>
                                        <strong>Subtotal</strong>
                                        <strong className="red">
                                            ${amount}
                                        </strong>
                                    </figcaption>
                                </figure>
                                <figure>
                                    <figcaption>
                                        <strong>Shipping</strong>
                                        <small>Free Shipping</small>
                                    </figcaption>
                                </figure>
                                <figure className="ps-block__total">
                                    <figcaption>
                                        <strong>Total</strong>
                                        <strong className="red">
                                            ${parseInt(amount) + 20}.00
                                        </strong>
                                    </figcaption>
                                </figure>

                                <div className="ps-block__payment-gateways">
                                    {paymentGatewaysView}
                                    {selectedPaymentGateway}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                                disabled={isSubmitting || !(amount > 0)}>
                                {isSubmitting ? <Spin /> : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        ...state.checkoutItems,
    };
};

export default connect(mapStateToProps)(WPFormCheckout);
