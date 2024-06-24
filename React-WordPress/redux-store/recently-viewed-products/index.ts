import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data{
    [key: string]: any;
}

interface RecentProductState{
    products:Data[]
}

const initialState: RecentProductState = {
    products: []
}

const recentProductsSlice = createSlice({
    initialState,
    name: "recently_viewed_products",
    reducers: {
        update_recently_viewed_success(state,action:PayloadAction<RecentProductState>){
            state.products = action.payload.products;
        }
    }
})

export const {update_recently_viewed_success} = recentProductsSlice.actions
export default recentProductsSlice.reducer