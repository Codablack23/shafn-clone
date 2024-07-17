import { useEffect } from "react";
import cart, { CartItem, initialState, update_cart_success } from "../cart";
import { useAppDispatch, useAppSelector} from ".";
import { notification } from "antd";




export function useCart(){
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const getLocalCartObject=()=>{
            const localCart = localStorage.getItem("persist:martfury");
            try{
                const JsonData =  JSON.parse(localCart as string);
                return JSON.parse(JsonData.cart)
            }
            catch(e){
                console.log(e)
                return initialState;
            }
        }
        const localCartObject = getLocalCartObject()
        dispatch(update_cart_success(localCartObject))
    },[])

    // useEffect(()=>{
    //     const data  = JSON.parse(localStorage.getItem("persist:martfury") as string);
    //     const cart = JSON.stringify(cartState)
    //     const localStorageData = JSON.stringify({
    //         ...data,
    //         cart,
    //     })
    //     localStorage.setItem("persist:martfury", localStorageData)
    // },[cartState])
}

export function useCartFunctions(){
    const [api,contextHolder] = notification.useNotification()
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch()

    const getLocalCartObject=()=>{
        const localCart = localStorage.getItem("persist:martfury");
        try{
            const JsonData =  JSON.parse(localCart as string);
            return JSON.parse(JsonData.cart)
        }
        catch(e){
            console.log(e)
            return initialState;
        }
    }

    const increaseQuantity = (product:CartItem) =>{
        let cartItems:CartItem[] = getLocalCartObject().cartItems

        const  updatedItems = cartItems.map((item) =>{
            if(item.id !== product.id && item.variation_id !== product.variation_id) return item;
            const selectedItem = item

            const isVariableProduct = product.variation_id !== 0;
            if(isVariableProduct){
                if(selectedItem.quantity === product.variation_stock_quantity) {
                    api.warning({
                        description:"Cannot exceed stock quantity",
                        message:"Stock Quantity Exceeded",
                    })
                    return selectedItem;
                }
                selectedItem.quantity++
                return selectedItem;
            }
            if(!product.stock_quantity){
                selectedItem.quantity++
                return selectedItem
            }
            if(selectedItem.quantity === product.stock_quantity){
                api.warning({
                    description:"Cannot exceed stock quantity",
                    message:"Stock Quantity Exceeded",
                })
                return selectedItem;
            }
            selectedItem.quantity++
            return selectedItem

        });
        const cartTotal = updatedItems.map(item=>item.quantity).reduce((a,b)=>a + b,0)
        const amount = updatedItems.map(item=>item.quantity * item.price).reduce((a,b)=>a + b,0)

        dispatch(update_cart_success({cartTotal,amount,cartItems:updatedItems}))

    }
    const addToCart = (product:CartItem) => {
        const localStorageData  = JSON.parse(localStorage.getItem("persist:martfury") as string);
        const cartItems:CartItem[] = getLocalCartObject().cartItems

        let itemCount = 0;
        const updatedCartItems = cartItems.map((item) =>{
            if(item.id === product.id && item.variation_id === product.variation_id) {;
                item.quantity += product.quantity
                itemCount += 1
            }
            return item;
        })
        if(itemCount > 0){
            const cartTotal = updatedCartItems.map(item=>item.quantity).reduce((a,b)=>a + b,0)
            const amount = updatedCartItems.map(item=>item.quantity * item.price).reduce((a,b)=>a + b,0)

            const updatedState = {cartTotal,amount,cartItems:updatedCartItems}
            localStorage.setItem("persist:martfury", JSON.stringify({
                ...localStorageData,
                cart: JSON.stringify(updatedState),
            }));

            dispatch(update_cart_success(updatedState))
            return;
        }

        const updatedCart = [...cartItems,product]
        const cartTotal = updatedCart.map(item=>item.quantity).reduce((a,b)=>a + b,0)
        const amount = updatedCart.map(item=>item.quantity * item.price).reduce((a,b)=>a + b,0)

        const updatedState = {amount,cartTotal,cartItems:updatedCart}
        if(!product.quantity){
            product.quantity = 1
        }
        console.log(updatedState)
        localStorage.setItem("persist:martfury", JSON.stringify({
            ...localStorageData,
            cart: JSON.stringify(updatedState),
        }));
        dispatch(update_cart_success(updatedState))
    }

    const removeFromCart = (product:CartItem)=>{
        const localStorageData  = JSON.parse(localStorage.getItem("persist:martfury") as string);
        const cartItems:CartItem[] = getLocalCartObject().cartItems

        const updatedCartItems =  cartItems.filter (cartItem =>
            cartItem.id !== product.id
            && cartItem.variation_id !== product.variation_id
        )
        const cartTotal = updatedCartItems.map(item=>item.quantity).reduce((a,b)=>a + b,0)
        const amount = updatedCartItems.map(item=>item.quantity * item.price).reduce((a,b)=>a + b,0)
        const updatedState = {
            amount,
            cartItems:updatedCartItems,
            cartTotal,
        }

        localStorage.setItem("persist:martfury", JSON.stringify({
            ...localStorageData,
            cart: JSON.stringify(updatedState),
        }));
        dispatch(update_cart_success(updatedState))

    }
    return {
        cartState,
        increaseQuantity,
        removeFromCart,
        addToCart,
        contextHolder,
    }
}