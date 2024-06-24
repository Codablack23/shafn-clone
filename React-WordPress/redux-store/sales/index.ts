import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data{
    [key: string]: any;
}
interface SalesState {
    WPProducts: Data[],
    WPCategories: Data[],
    WPLoading: boolean,
}

const initialState: SalesState = {
    WPProducts: [],
    WPCategories: [],
    WPLoading: true,
}
interface ProductSuccessPayload{
    products: Data[],
}
interface ToggleLoadingPayload{
    loading: boolean,
}
const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        wp_get_onsale_products_success:(state,action:PayloadAction<ProductSuccessPayload>)=>{
            state.WPProducts = action.payload.products;
            state.WPLoading = false
        },
        wp_toggle_loading:(state,action:PayloadAction<ToggleLoadingPayload>)=>{
            state.WPLoading = action.payload.loading
        }
    }
})

export const {wp_get_onsale_products_success,wp_toggle_loading} = salesSlice.actions
export default salesSlice.reducer