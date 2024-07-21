import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data{
    [key: string]: any;
}
interface WPState {
    WPProducts: Data[],
    WPCategories: Data[],
    WPLoading: boolean,
}

const initialState: WPState = {
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
const wpSlice = createSlice({
    name: "wp",
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

export const {wp_get_onsale_products_success,wp_toggle_loading} = wpSlice.actions
export default wpSlice.reducer