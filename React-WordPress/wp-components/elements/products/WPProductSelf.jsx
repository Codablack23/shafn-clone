import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
// import LazyLoad from 'react-lazyload';
import Link from "next/link";
import { Modal } from "antd";
import Rating from "../../../components/elements/Rating";
import { formatCurrency } from "~/utilities/product-helper";
import { addItem } from "~/store/cart/action";
import { addItemToCompare } from "~/store/compare/action";
import { addItemToWishlist } from "~/store/wishlist/action";
import WPModuleProductQuickview from "~/wp-components/elements/products/modules/WPModuleProductQuickview";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
    WPProductPriceView,
    WPProductThumbnailView,
} from "~/utilities/WPHelpers";

const WPProductSelf = ({ productID }) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [isQuickView, setIsQuickView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);

    let thumbnailImage, productPrice;

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

    async function getProduct(productID) {
        const result = await WPProductRepository.getProductByID(productID);
        if (result) {
            setProduct(result);
            setTimeout(function () {
                setLoading(false);
            }, 250);
        }
        return result;
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
        getProduct(productID);
        averageStars();
    }, []);

    /*View Area*/

    if (product) {
        const priceView = WPProductPriceView(product);
        const thumbnailImage = WPProductThumbnailView(product);

        const query = `${product.slug}-${product.id}`.trim();

        return (
            <div className="ps-product">
                <div className="ps-product__thumbnail hover-popup w3-text-black">
                    <a href={`/product/${query}`}>{thumbnailImage}</a><br />
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
                    {/*<Link href="/shop">
                        <a className="ps-product__vendor">Young Shop</a>
                    </Link>*/}
                    <div className="ps-product__content">
                        <a
                            className="ps-product__title"
                            href={`/product/${query}`}>
                            {product.name}
                        </a>
                        <div className="ps-product__rating">
                            {rating >= 3 && <Rating rating={rating} />}
                            <span>{product.review_count}</span>
                        </div>
                        {priceView}
                    </div>
                    <div className="ps-product__content hover">
                        <a
                            className="ps-product__title"
                            href={`/product/${query}`}>
                            {product.name}
                        </a>
                        {priceView}
                    </div>
                </div>
                <Modal
                    centered
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleHideQuickView(e)}
                    open={isQuickView}>
                    <WPModuleProductQuickview productID={product.id} />
                </Modal>
            </div>
        );
    } else {
        return <SkeletonProduct />;
    }
};

export default connect()(WPProductSelf);
