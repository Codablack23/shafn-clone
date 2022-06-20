import React, { Children } from 'react';
import Link from 'next/link';
import { WPProductThumbnailView } from '~/utilities/WPHelpers';
const WPProductCart = ({ product }) => {
    // Views
    const thumbnailImage = WPProductThumbnailView(product);

    const query = `${product.slug}-${product.id}`.trim();

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

export function CustomProductCart({product,children}){
    const thumbnailImage = WPProductThumbnailView(product);

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="ps__product-cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps__product-content">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a className="ps-product__title d-block">{product.name}</a>
                </Link>
               {children}
            </div>
        </div>
    );
}
