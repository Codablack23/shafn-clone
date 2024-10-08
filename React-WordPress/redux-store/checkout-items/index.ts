import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutItem{
    [key:string] : any;
}

interface CheckoutState{
    checkoutItems: CheckoutItem[],
    amount: number,
    total:number,
}

export const initialState:CheckoutState = {
    checkoutItems: [],
    amount: 0,
    total: 0,
}

const checkoutSlice = createSlice({
    name: "checkout_items",
    initialState,
    reducers: {
        update_checkout_item:(state,action:PayloadAction<CheckoutState>)=>{
            state.amount = action.payload.amount;
            state.checkoutItems = action.payload.checkoutItems;
            state.total = action.payload.total;
        },
        clear_checkout_item:(state)=>{
            state.amount = initialState.amount
            state.checkoutItems = initialState.checkoutItems
            state.total = initialState.total
        }
    }
})

export const {update_checkout_item,clear_checkout_item} = checkoutSlice.actions
export default checkoutSlice.reducer