import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rate } from 'antd';
// import { addItem } from '../../../../../store/cart/action';
import Link from 'next/link';
import Rating from '../../../Rating';
class InformationQuickView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        };
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        let tempProduct = product;
        tempProduct.quantity = this.state.quantity;
        this.props.dispatch(addItem(product));
    };

    handleIncreaseItemQty = e => {
        e.preventDefault();
        this.setState({ quantity: this.state.quantity + 1 });
    };

    handleDecreaseItemQty = e => {
        e.preventDefault();
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    };

    render() {
        const { product } = this.props;
        return (
            <div className="ps-product__info">
                <h1>{product.title}</h1>
                <div className="ps-product__meta">
                    <p>
                        Brand:
                        <Link legacyBehavior href="/shop">
                            <a className="ml-2 text-capitalize">{product.vendor}</a>
                        </Link>
                    </p>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>(1 review)</span>
                    </div>
                </div>
                {product.is_sale === true ? (
                    <h4 className="ps-product__price sale">
                        ${product.price} <del>${product.sale_price}</del>
                    </h4>
                ) : (
                    <h4 className="ps-product__price">${product.price}</h4>
                )}
                <div className="ps-product__desc">
                    <p>
                        Sold By:
                        <Link legacyBehavior href="/shop">
                            <a>
                                <strong> {product.vendor}</strong>
                            </a>
                        </Link>
                    </p>
                    <ul className="ps-list--dot">
                        <li>
                            Unrestrained and portable active stereo speaker
                        </li>
                        <li> Free from the confines of wires and chords</li>
                        <li> 20 hours of portable capabilities</li>
                        <li>
                            Double-ended Coil Cord with 3.5mm Stereo Plugs
                            Included
                        </li>
                        <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                    </ul>
                </div>
                <div className="ps-product__shopping">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={this.handleIncreaseItemQty.bind(this)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={this.handleDecreaseItemQty.bind(this)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={this.state.quantity}
                                disabled
                            />
                        </div>
                    </figure>
                    <a
                        className="ps-btn ps-btn--black"
                        href="#"
                        onClick={this.handleAddItemToCart.bind(this)}>
                        Add to cart
                    </a>
                    <a className="ps-btn" href="#">
                        Buy Now
                    </a>
                </div>
                <div className="ps-product__specification">
                    <Link legacyBehavior href="/page/blank">
                        <a className="report">Report Abuse</a>
                    </Link>
                    <p>
                        <strong>SKU:</strong> SF1133569600-1
                    </p>
                    <p className="categories">
                        <strong> Categories:</strong>
                        <Link legacyBehavior href="/shop">
                            <a>Consumer Electronics</a>
                        </Link>
                        <Link legacyBehavior href="/shop">
                            <a>Refrigerator</a>
                        </Link>
                        <Link legacyBehavior href="/shop">
                            <a>Babies & Moms</a>
                        </Link>
                    </p>
                    <p className="tags">
                        <strong> Tags:</strong>
                        <Link legacyBehavior href="/shop">
                            <a>sofa</a>
                        </Link>
                        <Link legacyBehavior href="/shop">
                            <a>technologies</a>
                        </Link>
                        <Link legacyBehavior href="/shop">
                            <a>wireless</a>
                        </Link>
                    </p>
                </div>
                <div className="ps-product__sharing">
                    <a className="facebook" href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a className="twitter" href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a className="google" href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                    <a className="linkedin" href="#">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a className="instagram" href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(InformationQuickView);
