import Link from 'next/link';
import {CustomProductCart} from '@/wp-components/elements/products/WPProductCart';
import { useAppSelector } from "@/redux-store/hooks";
import { useCartFunctions } from '@/redux-store/hooks/useCart';

export default function WPShoppingCart() {

    const {increaseQuantity,contextHolder,removeFromCart,reduceQuantity} = useCartFunctions()

    // componentDidMount() {
    //     this.props.dispatch(getCart());
    // }

    const handleAddToCheckoutItems=()=>{
        // this.props.dispatch(addCheckoutItem(this.props));
    }

    const handleIncreaseItemQty=(product)=> {
        return ()=>increaseQuantity(product)
    }

    const handleDecreaseItemQty=(product)=>{
       return ()=>reduceQuantity(product)
    }

    const handleRemoveCartItem = (product) => {
       removeFromCart(product);
    };

    const { amount, cartItems } = useAppSelector(state=>state.cart);
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
                                onClick={handleIncreaseItemQty(product)}>
                                +
                            </button>
                            <button
                                className="down"
                                onClick={handleDecreaseItemQty(product)}
                                >
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
                    <div className='ps__cart-column pl-5'>${(product.quantity * product.price).toFixed(2)}</div>
                    <div className='ps__cart-actions'>
                        <a
                        href="#"
                        onClick={()=>handleRemoveCartItem(product)}
                        >
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
                        <Link legacyBehavior
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
        <>
        {contextHolder}
        <div className="ps-section--shopping ps-shopping-cart">
            <div className="container">
                {/* <div className="ps-section__header">
                    <h1>Shopping Cart</h1>
                </div> */}
                <div className="ps-section__content">
                    <div className="ps__cart-table">
                        <div className='ps__cart-head w3-light-grey mb-3'>
                            <p>Product</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Action</p>
                        </div>
                        <div>{tableContentView}</div>
                    </div>
                    <div className="ps-section__cart-actions">
                        <Link legacyBehavior href="/shop">
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
                                        Subtotal <span> ${amount.toFixed(2)}</span>
                                    </p>
                                </div>
                                <div className="ps-block__content">
                                    <ul className="ps-block__product">
                                        {subtotalView}
                                    </ul>
                                    <h3>
                                        Total <span>${amount.toFixed(2)}</span>
                                    </h3>
                                </div>
                            </div>
                            <Link legacyBehavior href="/account/checkout">
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
        </>
    );
}

