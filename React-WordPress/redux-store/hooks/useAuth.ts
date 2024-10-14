import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "."
import useLocalStorage from "./useLocalStorage"
import { initialState as initialAuthState, login_success, logout_success, update_auth_success } from "../auth"

interface UserData{
    email:string,
    [key: string]:any
}

export function useAuthEffect(){
    const [localAuthState] = useLocalStorage("auth",initialAuthState)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(localAuthState && localAuthState.isLoggedIn){
            dispatch(update_auth_success(localAuthState))
        }
    },[localAuthState])
}


export default function useAuth(){
    const dispatch = useAppDispatch()
    const [_, setLocalAuthState] = useLocalStorage("auth",initialAuthState)
    const authState = useAppSelector((state) => state.auth)

    function loginUser(userData:UserData){
        setLocalAuthState({
            isLoggedIn: true,
            ...userData
        })
        dispatch(login_success({
            isLoggedIn:true,
            ...userData
        }))
    }

    function logoutUser(){
        setLocalAuthState(initialAuthState)
        dispatch(logout_success())
    }
    return {
        authState,
        loginUser,
        logoutUser,
    };
}