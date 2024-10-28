import { CheckoutItem } from "@/redux-store/checkout-items";
import { useAppSelector } from "@/redux-store/hooks";
import BillingInfoForm from "@/wp-components/shared/forms/modules/BillingInfoForm";
import ShippingInfoForm from "@/wp-components/shared/forms/modules/ShippingInfoForm";
import { Checkbox, Form, Spin } from "antd";
import { PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProducts } from "./CheckoutProducts";
import useCheckoutForm from "../hooks/useCheckoutForm";

interface Product extends CheckoutItem{
    id:string | number;
    variation_id:string | number;
    name:string,
    quantity:number,
    price:number,
}


export default function CheckoutForm(){
    const {total,checkoutItems} = useAppSelector(state=>state.checkoutItems)
    const {
        auth,
        form,
        isSubmitting,
        initialFormValues,
        isDifferentAddress,
        paymentIntent,
        placeOrder,
        redirectToLogin,
        handleChangeDifferentAddress,
        handlePaymentElementChange,
        handlePaymentElementReady,
    } = useCheckoutForm()
    return (
        <Form
            form={form}
            name="control-hooks"
            className="ps-form--checkout"
            initialValues={initialFormValues}
            onFinish={placeOrder}>
            <div>
            <div className="row">
                <div className="col-lg-8">
                    <BillingInfoForm />
                    <div className="form-group">
                        <Checkbox
                            onChange={handleChangeDifferentAddress}>
                            Ship to a different address?
                        </Checkbox>
                    </div>
                    {isDifferentAddress && <ShippingInfoForm/>}
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
                                    <CheckoutProducts products={checkoutItems as Product[]}/>
                                </figure>
                                <figure>
                                    <figcaption>
                                        <strong>Subtotal</strong>
                                        <strong className="red">
                                        ${total}
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
                                            ${(total + 20).toLocaleString(undefined,{maximumFractionDigits:2})}
                                        </strong>
                                    </figcaption>
                                </figure>{
                                    paymentIntent === null
                                    ?(
                                        <div className="flex justify-center items-center h-20">
                                            <div className="flex-1 text-center">
                                                <Spin/>
                                                <p>Loading Checkout Form</p>
                                            </div>
                                        </div>
                                    )
                                    :<PaymentElement
                                    options={{ layout: "tabs" }}
                                    onReady={handlePaymentElementReady}
                                    onChange={handlePaymentElementChange}
                                />
                                }
                            </div>
                            {auth.isLoggedIn
                            ?(
                                <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                                disabled={isSubmitting}>
                                {isSubmitting ? <Spin /> : "Pay now"}
                                </button>
                            )
                            :<button type="button" onClick={redirectToLogin} className="ps-btn ps-btn--fullwidth">Pay now</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Form>
    )
}