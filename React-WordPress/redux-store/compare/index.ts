import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data{
    [key:string]: any;
}

interface CompareState{
    compareItems: Data[],
    compareTotal:number,
}
const initialState: CompareState = {
    compareItems: [],
    compareTotal: 0,
}
const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        update_compare_list_success:(state, action:PayloadAction<CompareState>) => {
            state.compareItems = action.payload.compareItems;
            state.compareTotal = action.payload.compareTotal;
        }
    }
})

export const {update_compare_list_success} = compareSlice.actions
export default compareSlice.reducer