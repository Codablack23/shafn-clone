import React, { useState, useLayoutEffect } from "react";
import { Form, Checkbox, notification, Spin } from "antd";
import Router from "next/router";
import WPOrderRepository from "~/repositories/WP/WPOrderRepository";
import { convertToURLEncoded } from "~/utilities/WPHelpers";
import WPPaymentRepository from "~/repositories/WP/WPPaymentRepository";

import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { DOMAIN } from "~/repositories/WP/WPRepository";
import ShippingInfoForm from "./modules/ShippingInfoForm";
import BillingInfoForm from "./modules/BillingInfoForm";

const WPFormCheckout = ({
    auth,
    amount,
    checkoutItems,
    order_session_id,
    paymentIntentId,
}) => {
    const [form] = Form.useForm();
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutForm, setCheckoutForm] = useState({
        isLoaded: false,
        isValid: false,
    });

    const stripe = useStripe();
    const elements = useElements();

    async function placeOrder(values) {
        if (checkoutItems.length === 0) {
            notification["info"]({
                message: "You have no items to checkout",
            });
            return;
        }
        if (amount <= 0) {
            notification["error"]({
                message: "Insufficient amount",
            });
            return;
        }
        if (!checkoutForm.isLoaded) {
            notification["info"]({
                message: "Checkout form has not loaded",
            });
            return;
        }
        if (!checkoutForm.isValid) {
            notification["error"]({
                message: "Invalid card details",
            });
            return;
        }

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

        checkoutData.billing = WPBilling;
        checkoutData.shipping = WPShipping;
        checkoutData.line_items = WPLineItems;

        if (!isSubmitting || !stripe || !elements) {
            setIsSubmitting(true);

            try {
                const order = await WPOrderRepository.createNewOrder(
                    convertToURLEncoded(checkoutData)
                );

                await WPPaymentRepository.updatePaymentIntent({
                    id: paymentIntentId,
                    data: {
                        orderId: order.id,
                        order_session_id,
                    },
                });

                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: `${DOMAIN}/account/checkout-success?order_number=${order.number}`,
                    },
                });

                if (
                    error.type === "card_error" ||
                    error.type === "validation_error"
                ) {
                    notification["error"]({
                        message: "Unable to complete payment",
                        description: error?.message,
                    });
                } else {
                    notification["error"]({
                        message: "Unable to complete payment",
                        description:
                            "An unexpected error occured. Make sure you enter the correct card details and try again",
                    });
                }
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

    function handlePaymentElementReady() {
        setCheckoutForm((current) => ({
            ...current,
            isLoaded: true,
        }));
    }

    function handlePaymentElementChange(event) {
        setCheckoutForm((current) => ({
            ...current,
            isValid: event.complete,
        }));
    }

    useLayoutEffect(() => {
        let auth = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).auth
        );

        if (!auth.isLoggedIn) {
            Router.push("/account/login");
        }
    }, []);

    // Views
    let listItemsView, shippingInfoView;

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
        shippingInfoView = <ShippingInfoForm />;
    }

    const initialFormValues = {
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
    };

    return (
        <Form
            form={form}
            name="control-hooks"
            className="ps-form--checkout"
            initialValues={initialFormValues}
            onFinish={placeOrder}>
            <div className="row">
                <div className="col-lg-8">
                    <BillingInfoForm />
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

                                <LinkAuthenticationElement />
                                <PaymentElement
                                    options={{ layout: "tabs" }}
                                    onReady={handlePaymentElementReady}
                                    onChange={handlePaymentElementChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                                disabled={isSubmitting}>
                                {isSubmitting ? <Spin /> : "Pay now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default WPFormCheckout;
