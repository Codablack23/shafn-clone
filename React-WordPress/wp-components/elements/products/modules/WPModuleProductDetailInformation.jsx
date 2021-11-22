import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { formatCurrency } from '~/utilities/product-helper';
import { addItem } from '~/store/cart/action';
import { addCheckoutItem } from '~/store/checkout-items/action';
// import ModuleProductDetailSharing from '~/components/elements/detail/modules/elements/ModuleProductDetailSharing';

import {
    WPProductDetailBrandView,
    WPProductDetailCategoriesView,
    WPProductDetailRatingView,
    WPProductDetailShortDescView,
    WPProductDetailTagsView,
} from '~/utilities/WPHelpers';

const WPModuleProductDetailInformation = ({
    product,
    children,
    variant,
    isWidget,
}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCheckoutItems = () => {
        const item = {
            amount: product.price,
            cartItems: [product],
            cartTotal: 1,
        };

        dispatch(addCheckoutItem(item));
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        let tempProduct = product;
        tempProduct.quantity = quantity;
        dispatch(addItem(product));
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleRenderPrice = (product) => {
        let priceView;
        if (product.on_sale === true) {
            priceView = (
                <p className="ps-product__price sale">
                    <span>€</span>
                    {formatCurrency(product.price)}
                    <del className="ml-2">
                        <span>€</span>
                        {formatCurrency(product.sale_price)}
                    </del>
                </p>
            );
        } else {
            priceView = (
                <p className="ps-product__price">
                    <span>€</span>
                    {formatCurrency(product.price)}
                </p>
            );
        }
        return priceView;
    };
    // Views
    const ratingView = WPProductDetailRatingView(product);
    const shortDescView = WPProductDetailShortDescView(product);
    const brandView = WPProductDetailBrandView(product);
    const categoriesView = WPProductDetailCategoriesView(product);
    const tagsView = WPProductDetailTagsView(product);
    let productPriceView, productVendorView;

    if (product) {
        if (variant) {
            productPriceView = handleRenderPrice(variant);
        } else {
            productPriceView = handleRenderPrice(product);
        }

        if (product.store) {
            productVendorView = (
                <p>
                    Sold By:
                    <Link href="/shop">
                        <a className="ml-2">
                            <strong> {product.store.shop_name}</strong>
                        </a>
                    </Link>
                </p>
            );
        }
    }

    return (
        <div className="ps-product__info">
            {!isWidget && <h1>{product?.name}</h1>}
            <div className="ps-product__meta">
                {brandView}
                {ratingView}
            </div>
            {productPriceView}

            <div className="ps-product__desc">
                {productVendorView}
                {shortDescView}
            </div>
            {children}
            <div className="ps-product__shopping">
                <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button className="up" onClick={handleIncreaseItemQty}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={handleDecreaseItemQty}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                </figure>
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={handleAddItemToCart}>
                    Add to cart
                </a>
                <Link href="/account/checkout">
                    <a className="ps-btn" onClick={handleAddToCheckoutItems}>
                        Buy Now
                    </a>
                </Link>
            </div>
            <div className="ps-product__specification">
                <Link href="/page/blank">
                    <a className="report">Report Abuse</a>
                </Link>
                <p>
                    <strong>SKU:</strong> SF1133569600-1
                </p>
                <p className="categories">
                    <strong> Categories:</strong>
                    {categoriesView}
                </p>
                <p className="tags">
                    <strong>Tags: </strong>
                    {tagsView}
                </p>
            </div>
            {/* <ModuleProductDetailSharing /> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(WPModuleProductDetailInformation);
