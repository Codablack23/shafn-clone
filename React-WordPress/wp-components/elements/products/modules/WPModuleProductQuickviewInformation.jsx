import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { formatCurrency } from '@/utilities/product-helper';
import Rating from '@/app/components/elements/Rating';
// import { addItem } from '@/store/cart/action';
import { addCheckoutItem } from '@/store/checkout-items/action';
import ModuleProductDetailSharing from '@/app/components/elements/detail/modules/elements/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '@/app/components/elements/detail/modules/elements/ModuleProductDetailSpecification';

const WPModuleProductQuickviewInformation = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    let productPriceView;

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

    // Views
    let productVendorView;
    if (product) {
        if (product.on_sale === true && product.sale_price) {
            productPriceView = (
                <p className="ps-product__price sale">
                    <span>$</span>
                    {formatCurrency(product.sale_price)}
                    <del className="ml-2">
                        <span>$</span>
                        {formatCurrency(product.regular_price / 100)}
                    </del>
                </p>
            );
        } else {
            productPriceView = (
                <p className="ps-product__price">
                    <span>$</span>
                    {formatCurrency(product.price / 100)}
                </p>
            );
        }
        if (product.store) {
            productVendorView = (
                <p>
                    Sold By:
                    <Link legacyBehavior href="/shop">
                        <a className="ml-2">
                            <strong> {product.store.name}</strong>
                        </a>
                    </Link>
                </p>
            );
        }
    }

    return (
        <div className="ps-product__info">
            <h1>{product.name}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    {/*<Link legacyBehavior href="/shop">
                            <a className="ml-2 text-capitalize">{product.vendor}</a>
                        </Link>*/}
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
            {productPriceView}
            <div className="ps-product__desc">
                {productVendorView}
                {product.short_description && (
                    <div
                        className="ps-document"
                        dangerouslySetInnerHTML={{
                            __html: `${product.short_description}`,
                        }}
                    />
                )}
            </div>
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
                <Link legacyBehavior href="/account/checkout">
                    <a className="ps-btn" onClick={handleAddToCheckoutItems}>
                        Buy Now
                    </a>
                </Link>
            </div>
            <ModuleProductDetailSpecification />
            <ModuleProductDetailSharing />
        </div>
    );
};

export default connect((state) => state.cart)(
    WPModuleProductQuickviewInformation
);
