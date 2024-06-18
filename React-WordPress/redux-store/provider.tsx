"use client";
import { ReactNode } from "react"
import {Provider} from "react-redux"
import { store } from "./store";

interface ProviderProps{
    children:ReactNode
}

export default function CustomReduxProvider({children}:ProviderProps){
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}