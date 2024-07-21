import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface AppState{
    isShowDemoPanel:boolean
}

const initialState:AppState = {
    isShowDemoPanel: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        switch_demo_panel_success:(state,action:PayloadAction<AppState>)=>{
            state.isShowDemoPanel = action.payload.isShowDemoPanel
        }
    }
})

export const {switch_demo_panel_success} = appSlice.actions
export default appSlice.reducer