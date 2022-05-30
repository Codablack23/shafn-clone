import React, { useEffect } from 'react';
import { getCart } from '~/store/cart/action';
import { connect, useDispatch } from 'react-redux';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPFormCheckout from '~/wp-components/shared/forms/WPFormCheckout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const CheckoutPage = () => {
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
                            {/* <div className="ps-section__header">
                            <h1>Checkout Information</h1>
                        </div> */}
                            <div className="ps-section__content">
                                <WPFormCheckout />
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

export default CheckoutPage;
