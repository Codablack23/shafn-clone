import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaData{
    [key: string]: any;
}
interface MediaState{
    banners:MediaData[];
    promotions:MediaData[];
}

const initialState: MediaState = {
    banners: [],
    promotions: [],
}

interface DataPayload{
    data:MediaData[]
}
const mediaSlice = createSlice({
    initialState,
    name: "media",
    reducers: {
        get_banners_success:(state,action:PayloadAction<DataPayload>)=>{
            state.banners = action.payload.data;
        },
        get_promotions_success:(state,action:PayloadAction<DataPayload>)=>{
            state.promotions = action.payload.data;
        },
    }
})

export const {get_banners_success,get_promotions_success} = mediaSlice.actions
export default mediaSlice.reducer