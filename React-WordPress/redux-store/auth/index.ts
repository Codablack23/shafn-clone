import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData{
    isLoggedIn: boolean;
    [key:string]: any;
}
const initialState:AuthData = {
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
            state = action.payload
        },
        update_auth_success:(state,action:PayloadAction<AuthData>)=>{
            state = action.payload
        }
    }
})

export const {login_success,logout_success,update_auth_success} = authSlice.actions
export default authSlice.reducer
