import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Currency{
    symbol: string,
    text: string,
}

interface SettingState{
    currency:Currency
}

const initialState: SettingState = {
    currency: {
        symbol: '$',
        text: 'USD',
    },
}

const settingSlice = createSlice({
    initialState,
    name: "setting",
    reducers: {
        change_currency_success(state,action:PayloadAction<SettingState>){
            state.currency = action.payload.currency
        }
    }
})

export const {change_currency_success} = settingSlice.actions
export default settingSlice.reducer