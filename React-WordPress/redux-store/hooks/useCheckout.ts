import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
    CheckoutItem,
    clear_checkout_item,
    initialState as initialCheckoutState,
    update_checkout_item
} from "../checkout-items";
import useLocalStorage from "./useLocalStorage";


export function useCheckoutEffect(){
    const dispatch = useAppDispatch()
    const [localCheckout] = useLocalStorage("checkout",initialCheckoutState)
    useEffect(()=>{
        dispatch(update_checkout_item(localCheckout))
    },[localCheckout])
}

export default function useCheckout(){
    const [localCheckout,setLocalCheckout] = useLocalStorage("checkout",initialCheckoutState)
    const checkoutState = useAppSelector(state=>state.checkoutItems) 
    const dispatch = useAppDispatch()

    const removeItemFromCheckout = (id:string | number)=>{
        const updatedCheckoutItems = checkoutState.checkoutItems.filter(item => item.id !== id)
        const total = updatedCheckoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + (b.quantity * b.price)
        },0)
        const amount = updatedCheckoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + b.quantity
        },0)
        const updatedCheckoutState = {
            checkoutItems: updatedCheckoutItems,
            total,
            amount
        }
        setLocalCheckout(updatedCheckoutState)
        dispatch(update_checkout_item(updatedCheckoutState))
    }
    
    const addItemsToCheckout = (checkoutItems:CheckoutItem[])=>{
        console.log({checkoutItems})
        const amount = checkoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + (b.quantity * b.price)
        },0)
        const total = checkoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + b.quantity
        },0)
        const updatedCheckoutState = {
            checkoutItems,
            total,
            amount
        }
        setLocalCheckout(updatedCheckoutState)
        dispatch(update_checkout_item(updatedCheckoutState))
    }

    const addItemToCheckout = (checkoutItem:CheckoutItem) => {
        const existingItem = checkoutState.checkoutItems.find((item)=>{
            item.id === checkoutItem.id
        })
        let updatedCheckoutItems = [
            ...checkoutState.checkoutItems,
            checkoutItem,
        ]
        if(existingItem){
            updatedCheckoutItems = checkoutState.checkoutItems.map((item)=>{
                if(item.id === existingItem.id){
                    return {
                        ...item,
                        quantity:item.quantity + existingItem.quantity,
                    }
                }
                return item
            })
        }
        const total = updatedCheckoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + (b.quantity * b.price)
        },0)
        const amount = updatedCheckoutItems.reduce((a:number,b:CheckoutItem)=>{
            return a + b.quantity
        },0)
        const updatedCheckoutState = {
            checkoutItems:updatedCheckoutItems,
            total,
            amount
        }
        setLocalCheckout(updatedCheckoutState)
        dispatch(update_checkout_item(updatedCheckoutState))
    }

    const clearCheckout = ()=>{
        setLocalCheckout(initialCheckoutState)
        dispatch(clear_checkout_item())
    }

    useEffect(()=>{
        dispatch(update_checkout_item(localCheckout))
    },[])

    return {
        checkout:checkoutState,
        removeItemFromCheckout,
        addItemToCheckout,
        addItemsToCheckout,
        clearCheckout
    }
}