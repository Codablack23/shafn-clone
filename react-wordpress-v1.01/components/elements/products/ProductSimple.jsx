import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../../store/cart/action";
import { addItemToCompare } from "../../../store/compare/action";
import { addItemToWishlist } from "../../../store/wishlist/action";
import Link from "next/link";
import { Rate, Modal } from "antd";
import ProductDetailQuickView from "../detail/ProductDetailQuickView";
import Rating from "../Rating";
import { formatCurrency } from "../../../utilities/product-helper";
import { isStaticData } from "../../../utilities/app-settings";
import { baseUrl } from "../../../repositories/Repository";
import ThumbnailImage from "../detail/modules/elements/ThumbnailImage";

class ProductSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
        };
    }

    handleAddItemToCart = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = (e) => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleShowQuickView = (e) => {
        e.preventDefault();
        this.setState({ isQuickView: true });
    };

    handleHideQuickView = (e) => {
        e.preventDefault();
        this.setState({ isQuickView: false });
    };

    render() {
        const { product, currency } = this.props;
        let productBadge = null;
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
                        <div className="ps-product__badge hot">
                            {badge.value}
                        </div>
                    ));
                }
            });
        }
        let thumbnail;
        if (isStaticData === false) {
            thumbnail = `${baseUrl}${product.thumbnail.url}`;
        } else {
            thumbnail = product.thumbnail.url;
        }
        return (
            <div className="ps-product ps-product--simple">
                <div className="ps-product__thumbnail">
                    <Link legacyBehavior href="/product/[pid]" as={`/product/${product.id}`}>
                        <a>
                            <ThumbnailImage url={product.thumbnail.url} />
                        </a>
                    </Link>
                    {product.badge ? productBadge : ""}
                    <ul className="ps-product__actions">
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Read More"
                                onClick={this.handleAddItemToCart.bind(this)}>
                                <i className="icon-bag2"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={this.handleShowQuickView.bind(this)}>
                                <i className="icon-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to wishlist"
                                onClick={this.handleAddItemToWishlist.bind(
                                    this
                                )}>
                                <i className="icon-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Compare"
                                onClick={this.handleAddItemToCompare.bind(
                                    this
                                )}>
                                <i className="icon-chart-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        <Link legacyBehavior href="/product/[pid]">
                            <a className="ps-product__title">{product.title}</a>
                        </Link>
                        <div className="ps-product__rating">
                            <Rating />
                            <span>{product.ratingCount}</span>
                        </div>
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : "$"}
                                {formatCurrency(product.price)}{" "}
                                <del className="ml-1">
                                    {currency ? currency.symbol : "$"}
                                    {formatCurrency(product.sale_price)}
                                </del>
                            </p>
                        ) : (
                            <p className="ps-product__price">
                                {currency ? currency.symbol : "$"}
                                {formatCurrency(product.price)}
                            </p>
                        )}
                    </div>
                </div>
                <Modal
                    title={product.title}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={this.handleHideQuickView}
                    open={this.state.isQuickView}>
                    <ProductDetailQuickView product={product} />
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductSimple);
