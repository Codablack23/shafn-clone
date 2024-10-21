import { useAppSelector } from "@/redux-store/hooks"
import { useCartFunctions } from "@/redux-store/hooks/useCart"
import useCheckout from "@/redux-store/hooks/useCheckout"
import WPPaymentRepository from "@/repositories/WP/WPPaymentRepository"
import { useStripe,useElements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"


function generateCustomError(name: string,message:string) {
    const error =  new Error(message)
    error.name = name
    return error
}

interface PaymentIntent{
    clientSecret:string,
    id:string | number,
}

export default function useCheckoutPayment(){
    const stripe = useStripe()
    const elements = useElements()
    const {clearCheckout} = useCheckout()
    const {clearCart} = useCartFunctions()
    const [loadingPaymentIntent,setLoadingPaymentIntent] = useState(false)
    const {amount} = useAppSelector(state=>state.checkoutItems)
    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)

    useEffect(()=>{
        async function getPaymentIntent(){
            try {
                const res = await WPPaymentRepository.createPaymentIntent({
                    amount:amount > 0 ? (amount * 100) : 500,
                })
                setPaymentIntent(res)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoadingPaymentIntent(false)
            }
        }
        getPaymentIntent()
    },[])

    const handlePayment = async()=>{
        console.log({origin:window.location.origin})
        if(!elements || !stripe || !paymentIntent) throw generateCustomError("Config Error","Invalid payment configuration");
        const {error:submitError} = await elements.submit()
        const {error:paymentError} = await stripe.confirmPayment({
            elements,
            clientSecret:paymentIntent.clientSecret,
            confirmParams:{
                return_url:`${window.location.origin}/`
            }
        })
        if(submitError) throw generateCustomError(submitError.code as string,submitError.message as string)
        if(paymentError) throw generateCustomError(paymentError.code as string,paymentError.message as string)
    }

    return {
        loadingPaymentIntent,
        paymentIntent,
        handlePayment,
    }
}