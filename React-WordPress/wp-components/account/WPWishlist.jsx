import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "~/store/cart/action";
import { removeWishlistItem } from "~/store/wishlist/action";
import WPProductCart, {
    CustomProductCart,
} from "~/wp-components/elements/products/WPProductCart";
import { Button } from "~/utilities/WPHelpers";
class WPWishlist extends Component {
    constructor(props) {
        super(props);
    }

    handleAddItemToCart = (e, product) => {
        this.props.dispatch(addItem(product));
    };

    handleRemoveWishListItem = (e, product) => {
        e.preventDefault();

        this.props.dispatch(removeWishlistItem(product));
    };

    // call = (product) => {
    //     this.props.dispatch(removeWishlistItem(product));
    // };

    render() {
        const { wishlistItems } = this.props;
        // views
        let wishlistView;
        if (wishlistItems && wishlistItems.length > 0) {
            const items = wishlistItems.map((product) => (
                <div className="ps__wishlist-item-row" key={product.id}>
                    <div className="ps__wishlist-desc w-75">
                        <div className="w-100">
                            <CustomProductCart product={product}>
                                <div className="ps__wishlist-info">
                                    <p className="price">${product.price}</p>
                                    <p>{product.store.name}</p>
                                </div>
                            </CustomProductCart>
                        </div>
                    </div>
                    <div className="ps__wishlist-actions">
                        <Button
                            width={150}
                            classes={`w3-0309A5 rounded btn-hover`}
                            hoverColor="white"
                            eventHandler={(e) => {
                                this.handleAddItemToCart(e, product);
                            }}
                            text="Add to cart"
                        />
                        {/* <a
                            className="ps-btn ps-btn--sm mr-2"
                            href=""
                            onClick={(e) =>
                                this.handleAddItemToCart(e, product)
                            }>
                            Add to cart
                        </a> */}
                        <a
                            href="#"
                            onClick={(e) =>
                                this.handleRemoveWishListItem(e, product)
                            }>
                            <i className="bi bi-trash w3-text-black"></i>
                        </a>
                    </div>
                </div>
            ));

            wishlistView = (
                <div className="ps__wishlist-table">
                    <div className="ps__wishlist-head w3-light-grey">
                        <p>Product name</p>
                        <p>Unit Price</p>
                        <p>Vendor</p>
                        <p>Action</p>
                    </div>
                    <div className="w-100 p-2">{items}</div>
                </div>
            );
        } else {
            wishlistView = (
                <div className="alert alert-danger" role="alert">
                    Wishlist is empty!
                </div>
            );
        }
        return (
            <div className="ps-section--shopping ps-whishlist">
                <div className="container">
                    {/* <div className="ps-section__header">
                        <h1>Wishlist</h1>
                    </div> */}
                    <div className="ps-section__content">{wishlistView}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.wishlist;
};
export default connect(mapStateToProps)(WPWishlist);
