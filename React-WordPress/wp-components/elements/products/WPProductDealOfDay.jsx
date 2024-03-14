import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// import LazyLoad from 'react-lazyload';
import Link from "next/link";
import { Modal } from "antd";
import Rating from "../../../components/elements/Rating";
import { formatCurrency, getDiscountPercent } from "~/utilities/product-helper";
import { addItem } from "~/store/cart/action";
import { addItemToCompare } from "~/store/compare/action";
import { addItemToWishlist } from "~/store/wishlist/action";
import WPModuleProductQuickview from "~/wp-components/elements/products/modules/WPModuleProductQuickview";
import {
    WPProductPriceView,
    WPProductThumbnailView,
} from "~/utilities/WPHelpers";
import WPProductRepository from "~/repositories/WP/WPProductRepository";

const WPProduct = ({ product }) => {
    const dispatch = useDispatch();
    const [isQuickView, setIsQuickView] = useState(false);
    const [priceRangeView, setPriceRangeView] = useState(null);
    const [rating, setRating] = useState(0);

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        dispatch(addItem(product));
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        dispatch(addItemToWishlist(product));
    };

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

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

    /*View Area*/
    let productBadge = null;
    let productPrice;
    const thumbnailImage = WPProductThumbnailView(product);
    if (product.badge && product.badge !== null) {
        product.badge.map((badge) => {
            if (badge.type === "sale") {
                return (productBadge = (
                    <div className="ps-product__badge">{badge.value}</div>
                ));
            } else if (badge.type === "outStock") {
                return (productBadge = (
                    <div className="ps-product__badge out-stock">
                        {badge.value}
                    </div>
                ));
            } else {
                return (productBadge = (
                    <div className="ps-product__badge hot">{badge.value}</div>
                ));
            }
        });
    }

    if (product) {
        if (product.type === "variable" && !priceRangeView) {
            WPProductRepository.getProductVariantsByID(product.id).then(
                (variations) => {
                    if (variations && variations.length > 0) {
                        setPriceRangeView(handleRenderPriceRange(variations));
                    }
                }
            );
        } else {
            // Price
            if (product.on_sale === true && product.sale_price) {
                productPrice = (
                    <p className="ps-product__price sale">
                        <span>€</span>
                        {formatCurrency(product.sale_price)}
                        <del className="ml-2">
                            <span>€</span>

                            {formatCurrency(product.regular_price)}
                        </del>
                        <small>
                            {getDiscountPercent(
                                product.regular_price,
                                product.sale_price
                            )}{" "}
                            off
                        </small>
                    </p>
                );
            } else {
                productPrice = (
                    <p className="ps-product__price">
                        <span>€</span>
                        {formatCurrency(product.price)}
                    </p>
                );
            }
        }
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
        <div className="ps-product ps-product--inner hover-scale">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${query}`}>
                    <a>{thumbnailImage}</a>
                </Link>
                {/*  {product.badge ? productBadge : ''}*/}
                {/* <ul className="ps-product__actions">
                    <li>
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Add To Cart"
                            onClick={handleAddItemToCart}>
                            <i className="icon-bag2"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Quick View"
                            onClick={handleShowQuickView}>
                            <i className="icon-eye"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Add to wishlist"
                            onClick={handleAddItemToWishlist}>
                            <i className="icon-heart"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Compare"
                            onClick={handleAddItemToCompare}>
                            <i className="icon-chart-bars"></i>
                        </a>
                    </li>
                </ul> */}
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">
                        {product.store && product.store.name}
                    </a>
                </Link>
                <div className="ps-product__content">
                    {priceRangeView || productPrice}
                    <Link href="/product/[pid]" as={`/product/${query}`}>
                        <a className="font-medium">{product.name}</a>
                    </Link>
                    <div className="ps-product__rating">
                        {rating >= 3 && <Rating rating={rating} />}
                    </div>
                    {/* <div
                        className="ps-product__progress-bar ps-progress"
                        data-value={80}>
                        <div className="ps-progress__value">
                            <span style={{ width: "92%" }}></span>
                        </div>
                        <p>Sold: 99</p>
                    </div> */}
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

export default connect()(WPProduct);
