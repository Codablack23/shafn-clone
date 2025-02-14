import React, { Component } from "react";
import Link from "next/link";
import { removeItem } from "@/store/cart/action";
import { connect, useDispatch } from "react-redux";
import { WPProductThumbnailView } from "@/utilities/WPHelpers";
import { useCartFunctions } from "@/redux-store/hooks/useCart";



export default function WPProductOnCart(props) {
    const { product } = props;
    const {removeFromCart} = useCartFunctions()

    const removeCartItem=()=>{
        removeFromCart(product);
    }
    
    // Views
    const thumbnailImage = WPProductThumbnailView(product);

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <a
                    className="ps-product__remove"
                    style={{cursor: "pointer"}}
                    onClick={(e) => removeCartItem()}>
                    <i className="bi bi-trash"></i>
                </a>
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a className="font-bold">{product.name}</a>
                </Link>
                <p>
                    <strong>Sold by:</strong>{" "}
                    {product.store && product.store.name}
                </p>
                <small>
                    {product.quantity} x €{product.price}
                </small>
            </div>
        </div>
    );
}



