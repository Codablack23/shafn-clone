import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import { getCart, removeItem } from "~/store/cart/action";
import { addCheckoutItem } from "~/store/checkout-items/action";
import WPProductOnCart from "~/wp-components/elements/products/WPProductOnCart";
import { useAppSelector } from "@/redux-store/hooks";

export default function WPMiniCart() {
  

    const handleAddToCheckoutItems=()=> {
        // this.props.dispatch(addCheckoutItem(this.props));
    }

    const  handleRemoveCartItem=(product)=> {
        // this.props.dispatch(removeItem(product));
    }

        const cartData = useAppSelector(state=>state.cart);
        const { amount, cartTotal, cartItems } = cartData;

        console.log({cartData})
        // views
        let cartItemsView;
        if (cartItems && cartItems.length > 0) {
            const productItems = cartItems.map((item) => {
                return <WPProductOnCart product={item} key={item.id} />;
            });
            cartItemsView = (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">{productItems}</div>
                    <div className="ps-cart__footer">
                        <h3>
                            Sub Total:
                            <strong>${amount ? amount : 0}</strong>
                        </h3>
                        <figure>
                            <Link legacyBehavior href="/account/shopping-cart">
                                <a
                                    className="w3-black w3-border w3-hover-white rounded"
                                    style={style}>
                                    View Cart
                                </a>
                            </Link>
                            <Link legacyBehavior href="/account/checkout">
                                <a
                                    className="w3-black w3-hover-white w3-border rounded"
                                    style={style}
                                    onClick={() =>
                                        this.handleAddToCheckoutItems()
                                    }>
                                    Checkout
                                </a>
                            </Link>
                        </figure>
                    </div>
                </div>
            );
        } else {
            cartItemsView = (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">
                        <span>No products in cart</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="ps-cart--mini">
                <span
                    title="Cart"
                    className="header__extra w3-hover-lightgrey"
                    href="#">
                    <i
                        className="bi bi-cart"
                        style={{
                            fontSize: "22px",
                            color: "#2A3147",
                        }}></i>
                    <span style={{ height: 15, right: "-1px", width: 15 }}>
                        <i>{cartTotal ? cartTotal : 0}</i>
                    </span>
                </span>
                {cartItemsView}
            </div>
        );
    }



const style = {
    minWidth: "140px",
    padding: "0.8em",
    textAlign: "center",
};
