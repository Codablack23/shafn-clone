import React from 'react';
import Link from 'next/link';
import {
    WPGetProductBadge,
    WPGetProductImage,
    WPGetProductPrice,
    WPProductThumbnailView,
} from '~/utilities/WPHelpers';
import Rating from '@/app/components/elements/Rating';

const WPProductSearchResult = ({ product }) => {
    // Views

    let productPriceView, productBadgeView;
    const thumbnailImage = WPProductThumbnailView(product);
    if (product) {
        productPriceView = WPGetProductPrice(product);
    }

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
                <div className="ps-product__rating">
                    <Rating />
                    <span>{Math.floor(Math.random() * 10) + 1}</span>
                </div>
                {productPriceView}
            </div>
        </div>
    );
};

export default WPProductSearchResult;
