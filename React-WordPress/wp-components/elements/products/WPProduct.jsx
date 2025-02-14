import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// import LazyLoad from 'react-lazyload';
import Link from "next/link";
import { Modal } from "antd";
import Rating from "@/app/components/elements/Rating";
import { addItem } from "@/store/cart/action";
import WPModuleProductQuickview from "@/wp-components/elements/products/modules/WPModuleProductQuickview";
import {
    WPProductBadgeView,
    WPProductPriceView,
    WPProductThumbnailView,
} from "@/utilities/WPHelpers";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import { useCartFunctions } from "@/redux-store/hooks/useCart";

export default function WPProduct ({ product }){
    const {addToCart} = useCartFunctions();
    const [isQuickView, setIsQuickView] = useState(false);
    const [priceRangeView, setPriceRangeView] = useState(null);
    const [rating, setRating] = useState(0);

    const handleAddItemToCart = (e) => {
        e.preventDefault();
            addToCart({
                ...product,
                quantity: 1,
                variation_id: 0,
                variation_stock_quantity: 0,
            })
        

        // let _product = product;

        // if (product.type === "variable") {
        //     if (variant) {
        //         const options = variant.attributes
        //             .map((attribute) => attribute.option)
        //             .join(", ");

        //         _product = {
        //             ...product,
        //             name: `${product.name}[${options}]`,
        //             price: variant.price,
        //         };
        //     }
        // }

        // dispatch(addItem({ ..._product, quantity }));
    };

    // const handleAddItemToCompare = (e) => {
    //     e.preventDefault();
    //     dispatch(addItemToCompare(product));
    // };

    // const handleAddItemToWishlist = (e) => {
    //     e.preventDefault();
    //     dispatch(addItemToWishlist(product));
    // };

    // const handleShowQuickView = (e) => {
    //     e.preventDefault();
    //     setIsQuickView(true);
    // };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };

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

    // Views
    const priceView = priceRangeView || WPProductPriceView(product);
    const thumbnailImage = WPProductThumbnailView(product);
    const badgeView = WPProductBadgeView(product);

    if (product && product.type === "variable" && !priceRangeView) {
        WPProductRepository.getProductVariantsByID(product.id).then(
            (variations) => {
                if (variations && variations.length > 0) {
                    setPriceRangeView(handleRenderPriceRange(variations));
                }
            }
        );
    }

    async function getReviews() {
        const reviews = await WPProductRepository.getReviews();

        if (reviews) {
            const p_reviews = reviews.filter(
                (r) => r.product_id.toString() === product.id.toString()
            );
            return p_reviews;
        }
    }

    async function averageStars() {
        try {
            const product_reviews = await getReviews();

            const r_total =
                product_reviews.length == 0 ? 1 : product_reviews.length;

            const avg = parseFloat(
                product_reviews.reduce((total, el) => (total += el.rating), 0) /
                    r_total
            );

            setRating(parseInt(avg.toFixed(1)));
        } catch (error) {
            return;
        }
    }

    useEffect(() => {
        averageStars();
    }, []);

    const query = `${product.slug}-${product.id}`.trim();

    return (
        <div className="shop-product-hover-scale">
            <div className="ps-product__thumbnail" style={{minHeight:"200px"}}>
                <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
                {badgeView}
            </div>
            <div className="">
                <Link legacyBehavior href="/shop">
                    <a
                    style={{ marginTop:"10px", marginBottom:"10px",textTransform:"capitalize"}} 
                    className=" border-t-gray-300 capitalize">
                        {product.store && product.store.name}
                        <hr />
                    </a>
                </Link>
                <div className="">
                    <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                        <a className="font-bold">{product.name}</a>
                    </Link>
                    <div className="ps-product__rating">
                        {rating >= 3 && <Rating rating={rating} />}
                        <span>{product.review_count}</span>
                    </div>
                    <div className="text-2xl" >{priceView}</div>
                </div>
                <div className="hover-show">
                    {product.type === "simple" ? (
                        <>
                            <button
                                style={{maxWidth:"220px", marginTop:"10px"}}
                                className="hover-show"
                                onClick={handleAddItemToCart}>
                                Add To Cart
                            </button>
                        </>
                    ) : (
                        <p className="hover-show">
                            View product to select variation to add to cart
                        </p>
                    )}
                </div>
            </div>
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                open={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <WPModuleProductQuickview productID={product.id} />
            </Modal>
        </div>
    );
};

