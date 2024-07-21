import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data{
    [key: string]: any;
}
interface CollectionState{
    collections: Data[],
    categories:  Data[],
    collection: Data,
}
const initialState: CollectionState = {
    collections: [],
    categories: [],
    collection: {},
}

interface DataPayload{
    data: Data[],
}
interface SingleDataPayload{
    data: Data,
}
const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        get_collections_success:(state,action:PayloadAction<DataPayload>)=>{
            state.collections = action.payload.data
        },
        get_collection_success:(state,action:PayloadAction<SingleDataPayload>)=>{
            state.collection = action.payload.data
        },
        get_categories_success:(state,action:PayloadAction<DataPayload>)=>{
            state.categories = action.payload.data
        },
    }
})

export const {
    get_collection_success,
    get_categories_success,
    get_collections_success
} = collectionSlice.actions

export default collectionSlice.reducer