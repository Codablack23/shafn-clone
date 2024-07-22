"use client";

import  {
    CustomProductCart,
} from "~/wp-components/elements/products/WPProductCart";
import { Button } from "~/utilities/WPHelpers";
import { useAppSelector } from "@/redux-store/hooks";
import { useCartFunctions } from "@/redux-store/hooks/useCart";
import { useWishlistFunctions } from "@/redux-store/hooks/useWishList";

export default function WPWishlist(){

    const {wishlistItems} = useAppSelector(state=>state.wishlist)
    const {removeFromWishlist} = useWishlistFunctions()
    const {addToCart} = useCartFunctions()

    const handleAddItemToCart = (product) => {
        addToCart(product)
    };

    const handleRemoveWishListItem = (product) => {
        removeFromWishlist(product)
    };

        // views
        let wishlistView;
        if (wishlistItems && wishlistItems.length > 0) {
            const items = wishlistItems.map((product) => (
                <div
                    className="ps__wishlist-item-row"
                    key={`${product.id}-${product.variation_id}`}>
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
                            classes={`w3-black w3-border w3-hover-white rounded btn-hover`}
                            hoverColor="black"
                            eventHandler={(e) => {
                                handleAddItemToCart(product);
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
                                handleRemoveWishListItem(product)
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

