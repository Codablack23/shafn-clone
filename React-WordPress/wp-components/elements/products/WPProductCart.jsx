import React from 'react';
import Link from 'next/link';
import { WPProductThumbnailView } from '~/utilities/WPHelpers';
const WPProductCart = ({ product }) => {
    // Views
    const thumbnailImage = WPProductThumbnailView(product);

    const query = `${product.name
        .replace(/[^a-zA-Z0-9-_]/g, ' ')
        .replace(/  +/g, ' ')
        .split(' ')
        .join('-')}-${product.id}`.trim();

    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
            </div>
        </div>
    );
};

export default WPProductCart;
