/*
 * WPReact
 * Developed by: shafN
 * */

import React from "react";
import { formatCurrency } from "@/utilities/product-helper";
import Rating from "@/app/components/elements/Rating";
import Link from "next/link";

export function convertToURLEncoded(element, key, l) {
    let list = l || [];
    if (typeof element == "object") {
        for (var idx in element)
            convertToURLEncoded(
                element[idx],
                key ? key + "[" + idx + "]" : idx,
                list
            );
    } else {
        list.push(key + "=" + encodeURIComponent(element));
    }
    return list.join("&");
}

function caculateDiscount(price, salePrice) {
    return (100 - (price / salePrice) * 100).toFixed(1);
}

export function WPGetProductImage(product) {
    let image;
    if (product.images && product.images.length > 0) {
        image = <img src={product.images[0].src} alt={product.name} />;
    } else {
        image = (
            <img
                src="/static/img/undefined-product-thumbnail.jpg"
                alt={product.name}
            />
        );
    }
    return image;
}

export function WPGetProductPrice(product) {
    let price;
    if (product.on_sale === true) {
        price = (
            <p className="ps-product__price sale">
                <span>$</span>
                {formatCurrency(product.regular_price)}
                <del className="ml-2">
                    <span>€</span>
                    {formatCurrency(product.sale_price)}
                </del>
            </p>
        );
    } else {
        price = (
            <p className="ps-product__price">
                <span>€</span>
                {formatCurrency(product.regular_price)}
            </p>
        );
    }
    return price;
}

export function WPGetProductBadge(product) {
    let badge;
    if (product.on_sale === true) {
        badge = (
            <div className="ps-product__badge">
                {caculateDiscount(product.regular_price, product.sale_price)}%
            </div>
        );
    }
    return badge;
}

// Product
export function WPProductPriceView(product) {
    let view;
    if (product.on_sale === true && product.sale_price) {
        view = (
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
        view = (
            <p className="ps-product__price">
                <span>€</span>
                {formatCurrency(product.price)}
            </p>
        );
    }
    return view;
}

export function WPProductThumbnailView(product) {
    let view;
    if (product.images && product.images.length > 0) {
        view = (
            <img
                src={product.images[0].src}
                style={{
                    width: "100%",
                    display: "block",
                    objectFit: "contain",
                    maxHeight:"200px",
                    margin: "auto",
                }}
                alt={product.name}
            />
        );
    } else {
        view = (
            <img
                src="/static/img/undefined-product-thumbnail.jpg"
                alt={product.name}
            />
        );
    }
    return view;
}

export function WPProductBadgeView(product) {
    let view;
    if (product.stock_status !== "outofstock") {
        if (product.on_sale === true) {
            view = <div className="ps-product__badge">Sale</div>;
        } else {
            if (product.meta_data) {
                const WPCustomBadge = product.meta_data.find(
                    (item) =>
                        item.key === "custom_badges_text" && item.value !== ""
                );
                if (WPCustomBadge) {
                    view = (
                        <div className="ps-product__badge hot">
                            {WPCustomBadge.value}
                        </div>
                    );
                }
            }
        }
    } else {
        view = <div className="ps-product__badge out-stock">Out of stock</div>;
    }

    return view;
}

//Product detail

export function WPProductDetailRatingView(product) {
    let view;
    if (product?.rating_count > 0) {
        view = (
            <div className="ps-product__rating">
                <Rating />
                <span>({product.rating_count} review)</span>
            </div>
        );
    } else {
        view = (
            <div className="ps-product__rating">
                <span>0 Rating(s)</span>
            </div>
        );
    }
    return view;
}

export function WPProductDetailShortDescView(product) {
    let view;
    if (product?.short_description) {
        view = (
            <div
                className="ps-document"
                dangerouslySetInnerHTML={{
                    __html: `${product.short_description.slice(0, 100)}`,
                }}
            />
        );
    } else {
        view = (
            <div>
                <p>
                    <i>This product doesn't have a short description.</i>
                </p>
            </div>
        );
    }
    return view;
}

export function WPProductDetailBrandView(product) {
    let view;
    if (product?.attributes && product.attributes.length > 0) {
        const brand = product.attributes.find((item) => item.name === "brand");
        if (brand) {
            view = (
                <p>
                    Brand:
                    <Link legacyBehavior href="/shop">
                        <a className="ml-2 text-capitalize">
                            {" "}
                            {brand.options[0]}
                        </a>
                    </Link>
                </p>
            );
        } else {
            view = <p>Brand: No Brand</p>;
        }
    }
    return view;
}

export function WPProductDetailCategoriesView(product) {
    let view;
    if (product?.categories) {
        view = product.categories.map((item) => (
            <Link legacyBehavior href="/shop" key={item.id}>
                <a
                    className="ps-document"
                    dangerouslySetInnerHTML={{
                        __html: `${item.name}`,
                    }}></a>
            </Link>
        ));
    } else {
        view = <i>No Category</i>;
    }
    return view;
}

export function WPProductDetailTagsView(product) {
    let view;
    if (product?.tags && product.tags.length > 0) {
        view = product.tags.map((item) => (
            <Link legacyBehavior href="/shop" key={item.id}>
                <a
                    className="ps-document"
                    dangerouslySetInnerHTML={{
                        __html: `${item.name}`,
                    }}></a>
            </Link>
        ));
    } else {
        view = <i>No tag.</i>;
    }
    return view;
}

export function WPProductDetailStoreView(product) {
    let view;
    if (product.store) {
        view = (
            <p>
                SOLD BY:
                <Link legacyBehavior href="/shop">
                    <a className="ml-2">
                        <strong> {product.store.name}</strong>
                    </a>
                </Link>
            </p>
        );
    } else {
        view = (
            <p>
                Sold By:
                <strong>Unknown Store</strong>
            </p>
        );
    }
    return view;
}

export function convertFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
}

export function Button({
    text,
    eventHandler,
    classes,
    width,
    hoverBg,
    hoverColor,
    hoverBorder,
    color,
    style,
    height,
    disabled,
}) {
    let hoverClass = "";
    hoverClass = `w3-hover-${hoverBg} w3-hover-text-${hoverColor} w3-hover-border-${hoverBorder}`;
    return (
        <button
            className={`btn btn-lg p-3 m-2 rounded-pill w3-text-${color} ${classes} ${hoverClass}`}
            onClick={eventHandler}
            style={{ minWidth: width, height }}
            disabled={!!disabled}>
            {text}
        </button>
    );
}
export function DefaultButton({
    text,
    eventHandler,
    classes,
    width,
    hoverBg,
    hoverColor,
    hoverBorder,
    color,
    style,
    height,
    disabled,
}) {
    let hoverClass = "";
    hoverClass = `w3-hover-${hoverBg} w3-hover-text-${hoverColor} w3-hover-border-${hoverBorder}`;
    return (
        <button
            className={`btn btn-lg p-3 m-2 w3-text-${color} ${classes} ${hoverClass}`}
            onClick={eventHandler}
            style={{ minWidth: width, height,...style }}
            disabled={!!disabled}>
            {text}
        </button>
    );
}
