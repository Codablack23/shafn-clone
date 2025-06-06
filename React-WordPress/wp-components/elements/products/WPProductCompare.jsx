import React from 'react';
import Link from 'next/link';
import { WPProductThumbnailView } from '@/utilities/WPHelpers';
const WPProductCompare = ({ product }) => {
    // Views
    const thumbnailImage = WPProductThumbnailView(product);

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="ps-product--compare">
            <div className="ps-product__thumbnail">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
            </div>
        </div>
    );
};

export default WPProductCompare;
