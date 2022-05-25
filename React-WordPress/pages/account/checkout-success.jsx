import React, { useEffect } from 'react';
import { getCart } from '~/store/cart/action';
import { connect, useDispatch } from 'react-redux';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const CheckoutSuccessPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div ref={scrollPageToTop}>
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
