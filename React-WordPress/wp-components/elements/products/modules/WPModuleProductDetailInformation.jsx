import React from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import { formatCurrency } from "@/utilities/product-helper";
import { addItemToWishlist } from "@/store/wishlist/action";

import { WPProductDetailShortDescView, Button } from "@/utilities/WPHelpers";
import { useWishlistFunctions } from "@/redux-store/hooks/useWishList";

export default function WPModuleProductDetailInformation({
    product,
    children,
    variations,
    variant,
    isWidget,
}){
    const {addToWishList} = useWishlistFunctions()

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        let _product = {
            ...product,
            quantity: 1,
            variation_id: 0,
            variation_stock_quantity: 0,
        };
        if (product.type === "variable") {
            if (variant) {
                const options = variant.attributes
                    .map((attribute) => attribute.option)
                    .join(", ");

                _product = {
                    ...product,
                    name: `${product.name}[${options}]`,
                    price: variant.price,
                    variation_id: variant.id,
                    variation_stock_quantity: variant.stock_quantity,
                };
            }
        }
        addToWishList(_product);
    };

    const handleRenderPriceRange = () => {
        const prices = variations.map((variation) => Number(variation.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        let priceRangeView;

        if (minPrice === maxPrice) {
            priceRangeView = (
                <p className="ps-product_price">
                    <span>€{maxPrice}</span>
                </p>
            );
        } else {
            priceRangeView = (
                <p className="ps-product_price">
                    <span>
                        €{minPrice} - €{maxPrice}
                    </span>
                </p>
            );
        }

        return priceRangeView;
    };

    const handleRenderPrice = (product) => {
        let priceView;
        if (product.on_sale === true && product.sale_price) {
            priceView = (
                <p className="ps-product__price sale">
                    <span>€</span>
                    {formatCurrency(product.sale_price)}
                    <del className="ml-2">
                        <span>€</span>
                        {formatCurrency(product.regular_price)}
                    </del>
                </p>
            );
        } else {
            priceView = (
                <p className="ps-product__price">
                    <span>€</span>
                    {formatCurrency(product.price)}
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
    let variationPriceRangeView, productPriceView, productVendorView;

    if (product) {
        if (product.type === "variable") {
            if (variant) {
                productPriceView = handleRenderPrice(variant);
            }
            if (variations && variations.length > 0) {
                variationPriceRangeView = handleRenderPriceRange();
            }
        } else {
            productPriceView = handleRenderPrice(product);
        }

        if (product.store) {
            const query = `${product.store.shop_name
                .toLowerCase()
                .replace(/ /g, "-")}-${product.store.id}`.trim();

            productVendorView = (
                <p>
                    SOLD BY:
                    <Link legacyBehavior href="/store/[pid]" as={`/store/${query}`}>
                        <a className="ml-2">
                            <strong> {product.store.shop_name}</strong>
                        </a>
                    </Link>
                </p>
            );
        }
    }

    return (
        <div className="ps-product__info">
            {!isWidget && <p style={{ fontSize: 20,color:"black" }}>{product?.name}</p>}
            {variationPriceRangeView}
            {productPriceView}
            <hr className="w3-lightgrey" />
            <div className="ps-product__desc">
                {productVendorView}
                {shortDescView}
            </div>
            {children}
            {/*
            <div
                className="d-block d-lg-none m-auto w3-center"
                style={{ minWidth: "60%" }}>
                <div className="">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div
                            className="form-group--number rounded-pill border-none 0 w3-light-grey w3-center"
                            style={{ width: 250, border: "none" }}>
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
             <div className="mt-2 d-block w3-center d-lg-none">
                <Button
                    width={250}
                    classes={`w3-0309A5 btn-hover`}
                    hoverColor="white"
                    eventHandler={handleAddItemToCart}
                    text="Add to cart"
                    disabled={product.type === "simple" ? false : !variant}
                />
                <br />

                <a onClick={handleAddToCheckoutItems}>
                    <Button
                        width={250}
                        classes={`w3-orange btn-hover`}
                        text="Buy Now"
                        disabled={product.type === "simple" ? false : !variant}
                    />
                </a>
            </div> */}
            <div className="text-center text-lg-left">
                <Button
                    width={250}
                    classes={`w3-light-grey btn-hover`}
                    hoverBorder="grey"
                    hoverBg="none"
                    hoverColor="grey"
                    eventHandler={handleAddItemToWishlist}
                    text="Add to WishLIst"
                    disabled={product.type === "simple" ? false : !variant}
                />
                <br />
            </div>
            {/* <div className="ps-product__specification">
                <Link legacyBehavior href="/page/blank">
                    <a className="report">Report Abuse</a>
                </Link>
                <p>
                    <strong>SKU:</strong> SF1133569600-1
                </p>
                <p className="categories">
                    <strong> Categories:</strong>
                    {categoriesView}
                </p>
                <p className="tags">
                    <strong>Tags: </strong>
                    {tagsView}
                </p>
            </div>
            <ModuleProductDetailSharing /> */}
        </div>
    );
};

