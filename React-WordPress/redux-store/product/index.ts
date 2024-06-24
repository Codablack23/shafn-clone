import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data{
    [key: string]: any;
}
interface ProductState{
    allProducts: null | Data[],
    singleProduct: null | Data,
    error: boolean,
    totalProducts: number,
    categories: null | Data[],
    brands: Data[],
    productsLoading: boolean,
    productLoading: boolean,
    searchResults: null | Data [],
}

const initialState: ProductState = {
    allProducts: null,
    singleProduct: null,
    error: false,
    totalProducts: 0,
    categories: null,
    brands: [],
    productsLoading: true,
    productLoading: true,
    searchResults: null,
}

interface ProductsPayload{
    data:Data[],
    loading:boolean,
}

interface TotalProductPayload{
    total:number
}
interface DataPayload{
    data:Data[],
}
interface ProductPayload{
    product:Data,
    loading:boolean,
}
interface ProductErrorPayload{
    error:boolean,
}
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        get_products_success:(state,action:PayloadAction<ProductsPayload>)=>{
            state.allProducts = action.payload.data;
            state.productsLoading = action.payload.loading;
        },
        get_total_of_products_success:(state,action:PayloadAction<TotalProductPayload>)=>{
            state.totalProducts = action.payload.total;
        },
        get_brands_success:(state,action:PayloadAction<DataPayload>)=>{
            state.brands = action.payload.data;
        },
        get_product_categories_success:(state,action:PayloadAction<DataPayload>)=>{
            state.categories = action.payload.data;
        },
        get_product__by_id_success: (state,action:PayloadAction<ProductPayload>) => {
            state.singleProduct = action.payload.product;
            state.productLoading = action.payload.loading;
        },
        get_product_by_keyword_success:(state,action:PayloadAction<DataPayload>) => {
            state.searchResults = action.payload.data;
        },
        get_products_error:(state,action:PayloadAction<ProductErrorPayload>) => {
            state.error = action.payload.error
        }
    }
})

export const {
    get_products_success,
    get_products_error,
    get_brands_success,
    get_product__by_id_success,
    get_product_by_keyword_success,
    get_product_categories_success,
    get_total_of_products_success,
} = productSlice.actions
export default productSlice.reducer