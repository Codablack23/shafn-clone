"use client";
import { ReactNode, useRef } from "react"
import {Provider} from "react-redux"
import { makeStore,AppStore } from "./store";

interface ProviderProps{
    children:ReactNode
}

export default function CustomReduxProvider({children}:ProviderProps){
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}