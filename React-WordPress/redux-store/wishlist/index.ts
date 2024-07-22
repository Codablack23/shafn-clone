import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishListItem{
    [key: string]: any;
}
export interface WishlistState{
    wishlistItems:WishListItem[],
    wishlistTotal:number,
    error?:boolean
}

export const initialState: WishlistState = {
    wishlistItems: [],
    wishlistTotal: 0,
    error: false
}
interface ErrorPayload{
    error:boolean
}
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        update_wishlist_success:(state,action:PayloadAction<WishlistState>)=>{
            state.wishlistItems = action.payload.wishlistItems
            state.wishlistTotal = action.payload.wishlistTotal
        },
        get_wishlist_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error
        }

    }
})

export const {update_wishlist_success,get_wishlist_error} = wishlistSlice.actions
export default wishlistSlice.reducer