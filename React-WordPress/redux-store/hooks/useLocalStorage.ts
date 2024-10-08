import { useEffect, useState } from "react";

export const getLocalStore=()=>{
    const localStore = localStorage.getItem("persist:martfury");
    try{
        return JSON.parse(localStore as string)
    }
    catch(e){
        // console.log(e)
        return {};
    }
}

export const getLocalStoreObject=<T>(key:string,initialState: T) => {
    const localCart = localStorage.getItem("persist:martfury");
    try{
        const jsonData =  JSON.parse(localCart as string);
        if(jsonData) return jsonData[key]
        return initialState;
    }
    catch(e){
        //console.log(e)
        return initialState;
    }
}

export default function useLocalStorage<T>(key:string,initialState:T):[
    localStorageObject:T,
    updateLocalStorageObject:(updatedData:T)=>void
] {
    const [localStoreObject,setLocalStoreObject] = useState(initialState)

    function updateLocalStoreObject(updatedData:T){
        const localStore = getLocalStore()
        localStorage.setItem("persist:martfury",JSON.stringify({
            ...localStore,
            [key]:updatedData
        }))
        setLocalStoreObject(updatedData)
    }
    useEffect(()=>{
        const localStoreObjectData = getLocalStoreObject(key,initialState)
        setLocalStoreObject(localStoreObjectData)
    },[])
    return [localStoreObject,updateLocalStoreObject]
}