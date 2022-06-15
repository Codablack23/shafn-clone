import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getCart,
    increaseItemQty,
    decreaseItemQty,
    removeItem,
} from '~/store/cart/action';
import { addCheckoutItem } from '~/store/checkout-items/action';

import Link from 'next/link';
import WPProductCart,{CustomProductCart} from '~/wp-components/elements/products/WPProductCart';

class WPShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    handleAddToCheckoutItems() {
        this.props.dispatch(addCheckoutItem(this.props));
    }

    handleIncreaseItemQty(product) {
        this.props.dispatch(increaseItemQty(product));
    }

    handleDecreaseItemQty(product) {
        this.props.dispatch(decreaseItemQty(product));
    }

    handleRemoveCartItem = (product) => {
        this.props.dispatch(removeItem(product));
    };

    render() {
        const { amount, cartItems } = this.props;
        let currentCartItems = [];
        if (cartItems && cartItems.length > 0) {
            currentCartItems = cartItems;
        }

        // Views
        let tableContentView, subtotalView;
        tableContentView = currentCartItems.map((product) => (
            <div className='ps__wishlist-item-row' key={product.id}>
              <div className="ps__wishlist-desc ps-w-60">
               <div className="w-100">
               <CustomProductCart product={product}>
               <div>${product.price}</div>
                </CustomProductCart>
               </div>
              </div>
                
              <div className="ps__cart-info">
                           <div className='ps__cart-column'>
                                <div className="form-group--number">
                                <button
                                    className="up"
                                    onClick={this.handleIncreaseItemQty.bind(
                                        this,
                                        product
                                    )}>
                                    +
                                </button>
                                <button
                                    className="down"
                                    onClick={this.handleDecreaseItemQty.bind(
                                        this,
                                        product
                                    )}>
                                    -
                                </button>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="1"
                                    value={product.quantity}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                       <div className='ps__cart-column pl-5'>${product.quantity * product.price}</div>
                       <div className='ps__cart-actions'>
                         <a
                            href="#"
                            onClick={this.handleRemoveCartItem.bind(this, product)}>
                            <i className="bi bi-trash"></i>
                         </a>
                      </div>
              </div>

            
            </div>
        ));
        if (cartItems && cartItems.length > 0) {
            subtotalView = cartItems.map((product, index) => {
                return (
                    <li key={product.id}>
                        <span className="ps-block__estimate">
                            <Link
                                href="/product/[pid]"
                                as={`/product/${product.id}`}>
                                <a className="ps-product__title">
                                    {product.name}
                                    <br /> x {product.quantity}
                                </a>
                            </Link>
                        </span>
                    </li>
                );
            });
        }

        return (
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    {/* <div className="ps-section__header">
                        <h1>Shopping Cart</h1>
                    </div> */}
                    <div className="ps-section__content">
                        <div className="ps__cart-table">
                            <div className='ps__cart-head w3-light-grey p-2 mb-3'>
                                <p>Product</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Total</p>
                                <p>Action</p>
                            </div>
                            <div>{tableContentView}</div>
                        </div>
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a>
                                    <i className="icon-arrow-left mr-2"></i>
                                    Back to Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-section__footer">
                        <div className="row justify-content-end">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block--shopping-total">
                                    <div className="ps-block__header">
                                        <p>
                                            Subtotal <span> ${amount}</span>
                                        </p>
                                    </div>
                                    <div className="ps-block__content">
                                        <ul className="ps-block__product">
                                            {subtotalView}
                                        </ul>
                                        <h3>
                                            Total <span>${amount}</span>
                                        </h3>
                                    </div>
                                </div>
                                <Link href="/account/checkout">
                                    <a
                                        className="ps-btn ps-btn--fullwidth"
                                        onClick={() =>
                                            this.handleAddToCheckoutItems()
                                        }>
                                        Proceed to checkout
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(WPShoppingCart);
