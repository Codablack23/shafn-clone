import React, { useEffect, useRef } from 'react';
import { getCart } from '~/store/cart/action';
import { connect, useDispatch } from 'react-redux';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPFormCheckout from '~/wp-components/shared/forms/WPFormCheckout';

const CheckoutSuccessPage = () => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);

        dispatch(getCart());
    }, [dispatch]);

    return (
        <div ref={containerRef}>
            <WPLayout title="Checkout">
                <div className="ps-page--simple">
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Checkout Success</h1>
                                <p>Thank you. Your order has been received</p>
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

export default connect()(CheckoutSuccessPage);
