import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CartItem{
    [key:string]:any
}

export interface CartState{
    cartItems:CartItem[],
    amount:number,
    cartTotal:number,
    error?:boolean
}
export const initialState:CartState = {
    cartItems: [],
    amount: 0,
    cartTotal: 0,
};

interface ErrorPayload{
    error:boolean
}

function setLocalCartObject(updatedCart:CartState){
    const localCart = localStorage.getItem("persist:martfury");
    try{
        const localStore =  JSON.parse(localCart as string);
        const cart = JSON.stringify(updatedCart);
        localStorage.setItem("persist:martfury", JSON.stringify({
            ...localStore,
            cart,
        }));
    }
    catch(e){
        console.log(e)
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clear_cart_success:(state,action:PayloadAction<CartState>)=>{
            state.amount = action.payload.amount;
            state.cartItems = action.payload.cartItems;
            state.cartTotal = action.payload.cartTotal;
            setLocalCartObject(action.payload)
        },
        get_cart_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error;
        },
        update_cart_success:(state,action:PayloadAction<CartState>)=>{
            state.amount = action.payload.amount;
            state.cartItems = action.payload.cartItems;
            state.cartTotal = action.payload.cartTotal;
            setLocalCartObject(action.payload)
        },
        update_cart_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error;
        },
    }
})
export const {
    get_cart_error,
    clear_cart_success,
    update_cart_error,
    update_cart_success
} = cartSlice.actions
export default cartSlice.reducer;