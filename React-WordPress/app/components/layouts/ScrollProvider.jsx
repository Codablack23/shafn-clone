"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

 export default function ScrollProvider({children}){
  const pathname = usePathname()
  useEffect (()=>{
    window.scroll(0, 0)
  },[pathname])
    return (
        <>
        {children}
        </>
    )
}