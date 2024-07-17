"use client"

import { useCart } from "@/redux-store/hooks/useCart"
import useWishList from "@/redux-store/hooks/useWishList"
import { ReactNode } from "react"

interface Props{
    children:ReactNode
}

export default function StateProvider(props:Props){
    useCart()
    useWishList()
    return (
        <>
        {props.children}
        </>
    )
}