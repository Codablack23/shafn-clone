import React, { Component } from "react";
import Link from "next/link";
import { removeItem } from "~/store/cart/action";
import { connect } from "react-redux";
import { WPProductThumbnailView } from "~/utilities/WPHelpers";

class WPProductOnCart extends Component {
    constructor() {
        super();
    }

    handleRemoveCartItem(product) {
        console.log(product);
        this.props.dispatch(removeItem(product));
    }
    removeCartItem() {
        const { product } = this.props;
        this.props.dispatch(removeItem(product));
    }

    render() {
        const { product } = this.props;
        // Views
        const thumbnailImage = WPProductThumbnailView(product);

        const query = `${product.slug}-${product.id}`.trim();

        return (
            <div className="ps-product--cart-mobile">
                <div className="ps-product__thumbnail">
                    <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                        <a>{thumbnailImage}</a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    <a
                        className="ps-product__remove"
                        onClick={(e) => this.removeCartItem()}>
                        <i className="icon-cross"></i>
                    </a>
                    <Link legacyBehavior href="/product/[pid]" as={`/product/${query}`}>
                        <a className="font-bold">{product.name}</a>
                    </Link>
                    <p>
                        <strong>Sold by:</strong>{" "}
                        {product.store && product.store.name}
                    </p>
                    <small>
                        {product.quantity} x €{product.price}
                    </small>
                </div>
            </div>
        );
    }
}

export default connect()(WPProductOnCart);
