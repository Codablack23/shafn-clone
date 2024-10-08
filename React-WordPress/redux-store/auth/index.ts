import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData{
    isLoggedIn: boolean;
    [key:string]: any;
}
export const initialState:AuthData = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout_success:(state)=>{
            state = initialState
        },
        login_success:(state,action:PayloadAction<AuthData>)=>{
            state = {
                ...action.payload,
                isLoggedIn: true,
            }
        },
        update_auth_success:(state,action:PayloadAction<AuthData>)=>{
            const keys = Object.keys(action.payload)
            state.isLoggedIn = true
            keys.forEach((key) => {
                state[key] = action.payload[key]
            })
        }
    }
})

export const {login_success,logout_success,update_auth_success} = authSlice.actions
export default authSlice.reducer
