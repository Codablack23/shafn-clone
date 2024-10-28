import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Tag } from "antd";
import Router from "next/router";
import { formatCurrency } from "~/utilities/product-helper";
import { addItem } from "~/store/cart/action";
import { addCheckoutItem } from "~/store/checkout-items/action";
import { Button } from "~/utilities/WPHelpers";
import SocialShareButtons from "~/app/components/elements/media/SocialShareButtons";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { useCartFunctions } from "@/redux-store/hooks/useCart";
import useCheckout from "@/redux-store/hooks/useCheckout";
import { useRouter } from "next/navigation";

export default function  WPModuleProductInformation({ product, variant, children }){
    const router = useRouter()
    const {addToCart} = useCartFunctions()
    const {addItemToCheckout} = useCheckout()
    const [quantity, setQuantity] = useState(1);

    const handleAddToCheckoutItems = () => {
        let _product = {
            ...product,
            variation_id: 0,
            quantity,
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
        addItemToCheckout(_product)
        router.push("/account/checkout");
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        let _product = {
            ...product,
            variation_id: 0,
            quantity,
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
        addToCart(_product)

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
    // const shortDescView = WPProductDetailShortDescView(product);
    // const brandView = WPProductDetailBrandView(product);
    // const categoriesView = WPProductDetailCategoriesView(product);
    // const tagsView = WPProductDetailTagsView(product);
    let productPriceView;
    let stockStatus = {
        status: "",
        color: "success",
    };

    if (product) {
        if (product.type === "variable") {
            if (variant) {
                productPriceView = handleRenderPrice(variant);
            }
        } else {
            productPriceView = handleRenderPrice(product);
        }

        switch (product.stock_status) {
            case "instock":
                stockStatus.status = "In stock";
                break;
            case "onbackorder":
                stockStatus.status = "On back order";
                stockStatus.color = "processing";
                break;
            case "outofstock":
                stockStatus.status = "Out of stock";
                stockStatus.color = "error";
                break;
        }
    }

    return (
        <div style={{maxWidth:"300px",marginInline:"auto"}}>
            {/* {!isWidget && <h1>{product?.name}</h1>} */}
            {/* {productPriceView} */}

            <hr className="w3-lightgrey" />
            <p>
                <span>Delivery: 2 - 4 Working days</span>
                <br />
                <Tag color={stockStatus.color}>{stockStatus.status}</Tag>
            </p>
            {children}
            <div className="shafn-centered-sm">
            <div className="d-lg-block">
                <div className="w-100 m-auto">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div
                            className="form-group--number rounded-pill border-none 0 w3-light-grey w3-center"
                            style={{ width: "300px", border: "none" }}>
                            <button
                                className="up"
                                style={{fontSize:"24px"}}
                                onClick={handleIncreaseItemQty}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={handleDecreaseItemQty}>
                                <i className="bi bi-dash-lg" style={{fontSize:"24px"}}></i>
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
            <div className="mt-2 d-lg-block">
                <Button
                    width={"300px"}
                    classes={`w3-black w3-border-black btn-hover`}
                    hoverColor="black"
                    eventHandler={handleAddItemToCart}
                    text="Add to cart"
                    hoverBg={"white"}
                    disabled={product.type === "simple" ? false : !variant}
                />
                <br />
                {/* <Link legacyBehavior href="/account/checkout"> */}
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
        </div>
    );
};

