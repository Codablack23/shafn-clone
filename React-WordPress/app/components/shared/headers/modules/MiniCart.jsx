import React, { Component } from "react";
import Link from "next/link";
import { isStaticData } from "@/utilities/app-settings";
import { baseUrl } from "@/repositories/Repository";
import { useCartFunctions } from "@/redux-store/hooks/useCart";


export default function MiniCart () {

        const {removeFromCart,cartState} = useCartFunctions()

        const handleRemoveCartItem = (product) => {
            removeFromCart(product);
        };

        const { amount, cartTotal, cartItems } = cartState;
        return (
            <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cartTotal }</i>
                    </span>
                </a>
                {cartItems && cartItems.length > 0 ? (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            {cartItems && cartItems.length > 0
                                ? cartItems.map((product) => (
                                      <div
                                          className="ps-product--cart-mobile"
                                          key={product.id}>
                                          <div className="ps-product__thumbnail">
                                              <Link legacyBehavior
                                                  href="/product/[pid]"
                                                  as={`/product/${product.id}`}>
                                                  <a>
                                                      <img
                                                          src={
                                                              isStaticData ===
                                                              false
                                                                  ? `${baseUrl}${product.thumbnail.url}`
                                                                  : product
                                                                        .thumbnail
                                                                        .url
                                                          }
                                                          alt="martfury"
                                                      />
                                                  </a>
                                              </Link>
                                          </div>
                                          <div className="ps-product__content">
                                              <a
                                                  className="ps-product__remove"
                                                  onClick={()=>handleRemoveCartItem(product)}>
                                                  <i className="icon-cross"></i>
                                              </a>
                                              <Link legacyBehavior
                                                  href="/product/[pid]"
                                                  as={`/product/${product.id}`}>
                                                  <a className="ps-product__title">
                                                      {product.title}
                                                  </a>
                                              </Link>
                                              <p>
                                                  <strong>Sold by:</strong>{" "}
                                                  {product.vendor}
                                              </p>
                                              <small>
                                                  {product.quantity} x $
                                                  {product.price}
                                              </small>
                                          </div>
                                      </div>
                                  ))
                                : ""}
                        </div>
                        <div className="ps-cart__footer">
                            <h3>
                                Sub Total:
                                <strong>${amount ? amount : 0}</strong>
                            </h3>
                            <figure>
                                <Link legacyBehavior href="/account/shopping-cart">
                                    <a className="ps-btn">View Cart</a>
                                </Link>
                                <Link legacyBehavior href="/account/checkout">
                                    <a className="ps-btn">Checkout</a>
                                </Link>
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <span>No products in cart</span>
                        </div>
                    </div>
                )}
            </div>
        );
    
}

