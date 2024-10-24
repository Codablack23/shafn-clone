import { useAppSelector } from "@/redux-store/hooks";
import WPOrderRepository from "@/repositories/WP/WPOrderRepository";
import WPPaymentRepository from "@/repositories/WP/WPPaymentRepository";
import { convertToURLEncoded } from "@/utilities/WPHelpers";
import { Form, notification } from "antd";
import {useState} from "react";
import useCheckoutPayment from "./useCheckoutPayment";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { AxiosError } from "axios";
import useCheckout from "@/redux-store/hooks/useCheckout";
import { useCartFunctions } from "@/redux-store/hooks/useCart";
import { useRouter } from "next/navigation";

interface Data{
    [key:string]: any;
}

interface CheckoutData{
    customer_id: string
    payment_method: string | null,
    payment_method_title: string | null,
    set_paid: boolean,
    billing: Data | null,
    shipping: Data | null,
    line_items: Data[] | null,
    shipping_lines: Data[]
}

export default function useCheckoutForm(){
    const router = useRouter()
    const {clearCheckout} = useCheckout()
    const {clearCart} = useCartFunctions()
    const {checkoutItems,amount} = useAppSelector(state=>state.checkoutItems)
    const auth = useAppSelector(state=>state.auth);
    const {handlePayment,paymentIntent} = useCheckoutPayment()
    const [form] = Form.useForm();
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutForm, setCheckoutForm] = useState({
        isLoaded: false,
        isValid: false,
    });

    const getLineItems = ()=>{
        if(checkoutItems) return checkoutItems.map((item) => ({
            product_id: item.id,
            variation_id: item.variation_id,
            quantity: item.quantity,
        }));

        return [{
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "10.00",
            }]
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

    function handleChangeDifferentAddress(e: CheckboxChangeEvent) {
        setIsDifferentAddress(e.target.checked);
    }

    function handlePaymentElementReady() {
        setCheckoutForm((current) => ({
            ...current,
            isLoaded: true,
        }));
    }

    function handlePaymentElementChange(event:any) {
        setCheckoutForm((current) => ({
            ...current,
            isValid: event.complete,
        }));
    }

    function redirectToLogin(){
        router.push("/account/login/?next=/account/checkout")
    }
    async function placeOrder(values:any) {
        if(!paymentIntent) return;
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

        let WPShipping;
        let checkoutData:CheckoutData = {
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

        checkoutData.billing = WPBilling;
        checkoutData.shipping = WPShipping;
        checkoutData.line_items = getLineItems();
            setIsSubmitting(true);

            try {
                const order = await WPOrderRepository.createNewOrder(
                    convertToURLEncoded(checkoutData)
                );
                await WPPaymentRepository.updatePaymentIntent({
                    id: paymentIntent.id,
                    data: {
                        orderId: order.id,
                    },
                });

                /**
                 * async function from the useCheckoutPayment Hook that initializes and confirms the payment using stripes
                 *  and throws and error when its unsuccessful
                 **/
                await handlePayment()

                clearCheckout()
                clearCart()
            } catch (error) {
                console.log("Error making payment");
                console.log(error);
                if(error instanceof AxiosError) {
                    return notification["error"]({
                        message:error.response?.data.error,
                    })
                }
                notification["error"]({
                    message:(error as Error).message ,
                });
            } finally {
                setIsSubmitting(false);
            }
    }

    return {
        initialFormValues,
        auth,
        form,
        isSubmitting,
        isDifferentAddress,
        paymentIntent,
        redirectToLogin,
        placeOrder,
        handleChangeDifferentAddress,
        handlePaymentElementChange,
        handlePaymentElementReady,
    }
}