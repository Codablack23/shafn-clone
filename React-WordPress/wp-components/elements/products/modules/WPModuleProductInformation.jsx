import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { formatCurrency } from "~/utilities/product-helper";
import { addItem } from "~/store/cart/action";
import { addCheckoutItem } from "~/store/checkout-items/action";
import { addItemToWishlist } from "~/store/wishlist/action";

import {
    WPProductDetailBrandView,
    WPProductDetailCategoriesView,
    WPProductDetailRatingView,
    WPProductDetailShortDescView,
    WPProductDetailTagsView,
    Button,
} from "~/utilities/WPHelpers";

import SocialShareButtons from "~/components/elements/media/SocialShareButtons";

const WPModuleProductInformation = ({
    product,
    variant,
    children,
    isWidget,
}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCheckoutItems = () => {
        let item;
        if (product.type === "variable") {
            if (variant) {
                const options = variant.attributes
                    .map((attribute) => attribute.option)
                    .join(", ");

                const _product = {
                    ...product,
                    name: `${product.name}[${options}]`,
                    price: variant.price,
                };

                item = {
                    amount: variant.price,
                    cartItems: [{ ..._product, quantity }],
                    cartTotal: 1,
                };
            }
        } else {
            item = {
                amount: product.price,
                cartItems: [{ ...product, quantity }],
                cartTotal: 1,
            };
        }

        dispatch(addCheckoutItem(item));

        Router.push("/account/checkout");
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        let _product = product;

        if (product.type === "variable") {
            if (variant) {
                const options = variant.attributes
                    .map((attribute) => attribute.option)
                    .join(", ");

                _product = {
                    ...product,
                    name: `${product.name}[${options}]`,
                    price: variant.price,
                };
            }
        }

        dispatch(addItem({ ..._product, quantity }));
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleRenderPrice = (product) => {
        let priceView;
        if (product.on_sale === true && product.sale_price) {
            priceView = (
                <p className="ps-product__price sale">
                    <span>€</span>
                    {formatCurrency(product.sale_price)}
                    <del
                        className="ml-2"
                        style={{ fontSize: 20, color: "#669900" }}>
                        <span>€</span>
                        <span className="fs-1">
                            {formatCurrency(product.regular_price)}
                        </span>
                    </del>
                </p>
            );
        } else {
            priceView = (
                <p
                    className="ps-product__price"
                    style={{ fontSize: 20, color: "#669900" }}>
                    <span>€</span>
                    <span className="fs-1">
                        {formatCurrency(product.price)}
                    </span>
                    <br />
                    <span className="w3-text-grey">VAT Included</span>
                </p>
            );
        }
        return priceView;
    };
    // Views
    // const ratingView = WPProductDetailRatingView(product);
    const shortDescView = WPProductDetailShortDescView(product);
    // const brandView = WPProductDetailBrandView(product);
    // const categoriesView = WPProductDetailCategoriesView(product);
    // const tagsView = WPProductDetailTagsView(product);
    let productPriceView, productVendorView;

    if (product) {
        if (product.type === "variable") {
            if (variant) {
                productPriceView = handleRenderPrice(variant);
            }
        } else {
            productPriceView = handleRenderPrice(product);
        }
    }

    return (
        <div className="">
            {!isWidget && <h1>{product?.name}</h1>}
            {productPriceView}

            <hr className="w3-lightgrey" />
            <p>
                <span>Delivery: 2 -4 Working days</span>
                <br />
                <span>
                    <span
                        className="text-danger"
                        style={{ fontWeight: "bold" }}>
                        {" "}
                        in Stock:{" "}
                    </span>
                </span>
            </p>
            <div className="ps-product__desc">
                {productVendorView}
                {shortDescView}
            </div>
            {children}
            <div className="d-none d-lg-block">
                <div className="w-100 w3-center m-auto">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div
                            className="form-group--number rounded-pill border-none 0 w3-light-grey w3-center"
                            style={{ width: "300px", border: "none" }}>
                            <button
                                className="up"
                                onClick={handleIncreaseItemQty}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={handleDecreaseItemQty}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </figure>
                </div>
            </div>
            <div className="w3-center mt-2 d-none d-lg-block">
                <Button
                    width={"300px"}
                    classes={`w3-0309A5 btn-hover`}
                    hoverColor="white"
                    eventHandler={handleAddItemToCart}
                    text="Add to cart"
                    disabled={product.type === "simple" ? false : !variant}
                />
                <br />
                {/* <Link href="/account/checkout"> */}
                <a onClick={handleAddToCheckoutItems}>
                    <Button
                        width={"300px"}
                        classes={`w3-orange btn-hover`}
                        text="Buy Now"
                        disabled={product.type === "simple" ? false : !variant}
                    />
                </a>
                {/* </Link> */}
            </div>

            <div className="share m-3">
                <p className="w3-text-grey">SHARE</p>
                <div className="flex">
                    <SocialShareButtons url={window.location.href} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(WPModuleProductInformation);
