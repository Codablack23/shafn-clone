import { useEffect } from "react";
import { useAppDispatch, } from ".";
import { update_wishlist_success,initialState } from "../wishlist";



export default function useWishList(){

    const dispatch = useAppDispatch()
    useEffect(()=>{
        const getLocalWishlistObject=()=>{
            const localCart = localStorage.getItem("persist:martfury");
            try{
                const JsonData =  JSON.parse(localCart as string);
                return JSON.parse(JsonData.wishlist)
            }
            catch(e){
                return initialState;
            }
        }
        
        const localCartObject = getLocalWishlistObject()
        // console.log(localCartObject)
        dispatch(update_wishlist_success(localCartObject))
    },[])
   
}