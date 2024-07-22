import { useEffect } from "react";
import { useAppDispatch, } from ".";
import { update_wishlist_success,initialState, WishListItem, WishlistState } from "../wishlist";
import { notification } from "antd";


type WishlistLocalStoreHandler=()=>WishlistState

const getLocalWishlistObject:WishlistLocalStoreHandler=()=>{
    const localCart = localStorage.getItem("persist:martfury");
    console.log(localCart);
    try{
        const JsonData =  JSON.parse(localCart as string);
        return JSON.parse(JsonData.wishlist)
    }
    catch(e){
        return initialState;
    }
}

export default function useWishList(){
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const localCartObject = getLocalWishlistObject()
        // console.log(localCartObject)
        dispatch(update_wishlist_success(localCartObject))
    },[])
}



export function useWishlistFunctions(){
    const dispatch = useAppDispatch()
    const addToWishList = (product:WishListItem) => {
        const localStorageData  = JSON.parse(localStorage.getItem("persist:martfury") as string);
        const wishlistItems = getLocalWishlistObject().wishlistItems
    
        let itemCount = 0;
        const updatedWishlistItems = wishlistItems.map((item) =>{
            if(item.id === product.id && item.variation_id === product.variation_id) {;
                item.quantity += product.quantity
                itemCount += 1
            }
            return item;
        })
        if(itemCount > 0){
            const wishlistTotal = updatedWishlistItems.map(item=>item.quantity).reduce((a,b)=>a + b,0)
    
            const updatedState:WishlistState = {wishlistTotal,wishlistItems:updatedWishlistItems}
            localStorage.setItem("persist:martfury", JSON.stringify({
                ...localStorageData,
                wishlist: JSON.stringify(updatedState),
            }));
    
            dispatch(update_wishlist_success(updatedState))
            return;
        }
    
        const updatedWishlist = [...wishlistItems,product]
        const wishlistTotal = updatedWishlist.map(item=>item.quantity).reduce((a,b)=>a + b,0)
    
    
        const updatedState = {wishlistTotal,wishlistItems:updatedWishlist}
        if(!product.quantity){
            product.quantity = 1
        }
        console.log(updatedState)
        localStorage.setItem("persist:martfury", JSON.stringify({
            ...localStorageData,
            wishlist: JSON.stringify(updatedState),
        }));
        dispatch(update_wishlist_success(updatedState))
        notification.success({
            message: "Added to wishlisht!",
            description: "This product has been added to wishlist!",
        })
    }

    const removeFromWishlist = (product:WishListItem)=>{
        const localStorageData  = JSON.parse(localStorage.getItem("persist:martfury") as string);
        const wishlistItems:WishListItem[] = getLocalWishlistObject().wishlistItems
    
        const updatedWishlistItems =  wishlistItems.filter (cartItem =>cartItem.id !== product.id)
        const wishlistTotal = updatedWishlistItems.map(item=>item.quantity).reduce((a,b)=>a + b,0)
    
        const updatedState = {
            wishlistItems:updatedWishlistItems,
            wishlistTotal,
        }
    
        localStorage.setItem("persist:martfury", JSON.stringify({
            ...localStorageData,
            wishlist: JSON.stringify(updatedState),
        }));
        dispatch(update_wishlist_success(updatedState))
        notification.warning({
            message: "Removed from wishlist",
            description: "This product has been removed from wishlist!",
        });
    }

    return {
        addToWishList,
        removeFromWishlist
    }
}


