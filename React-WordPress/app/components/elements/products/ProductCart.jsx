import React from 'react';
import Link from 'next/link';
// import LazyLoad from 'react-lazyload';
import { isStaticData } from '@/utilities/app-settings';
import { baseUrl } from '@/repositories/Repository';
const ProductCart = ({ product }) => {
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>
                            <img
                                src={
                                    isStaticData === false
                                        ? `${baseUrl}${product.thumbnail.url}`
                                        : product.thumbnail.url
                                }
                                alt="martfury"
                            />
                        {/* <LazyLoad>
                        </LazyLoad> */}
                    </a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link legacyBehavior href="/product/[pid]" as={`/product/${product.id}`}>
                    <a className="ps-product__title">{product.title}</a>
                </Link>
            </div>
        </div>
    );
};

export default ProductCart;
