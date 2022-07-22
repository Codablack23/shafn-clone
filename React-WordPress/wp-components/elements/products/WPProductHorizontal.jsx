import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "~/utilities/product-helper";
// import LazyLoad from 'react-lazyload';
import Rating from "~/components/elements/Rating";
import {
    WPProductPriceView,
    WPProductThumbnailView,
} from "~/utilities/WPHelpers";
import WPProductRepository from "~/repositories/WP/WPProductRepository";

const WPProductHorizontal = ({ product }) => {
    const [priceRangeView, setPriceRangeView] = useState(null);

    const handleRenderPriceRange = (variations) => {
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

    const thumbnailImage = WPProductThumbnailView(product);
    const priceView = priceRangeView || WPProductPriceView(product);

    if (product && product.type === "variable" && !priceRangeView) {
        WPProductRepository.getProductVariantsByID(product.id).then(
            (variations) => {
                if (variations && variations.length > 0) {
                    setPriceRangeView(handleRenderPriceRange(variations));
                }
            }
        );
    }

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail hover-popup">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
                <div className="ps-product__rating">
                    <Rating />
                </div>
                {priceView}
            </div>
        </div>
    );
};

export default WPProductHorizontal;
