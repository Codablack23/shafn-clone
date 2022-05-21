import React, { useEffect, useRef } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useDispatch, connect } from 'react-redux';
import { getCart } from '~/store/cart/action';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPPayment from '~/wp-components/account/WPPayment';

const PaymentPage = () => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div ref={containerRef}>
            <WPLayout>
                <div className="ps-page--simple">
                    <WPPayment />
                </div>
            </WPLayout>
        </div>
    );
};

export default connect()(PaymentPage);
