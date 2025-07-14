"use client"
import { useMountedState } from "react-use"

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
// import { useEffect,useState } from "react";

export const SheetProvider=()=>{
    const isMounted=useMountedState();

    // const [isMounted,setIsMouted]=useState(false)
    // useEffect(()=>{
    //     setIsMouted(true);
    // },[])
    if(!isMounted) return null
    return(
        <>
        <NewAccountSheet/>

       
        </>
    )
}