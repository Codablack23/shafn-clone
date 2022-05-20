import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import Shipping from '~/components/partials/account/Shipping';
import { getCart } from '~/store/cart/action';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPShipping from '~/wp-components/account/WPShipping';

const ShippingPage = () => {
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
                    <WPShipping />
                </div>
            </WPLayout>
        </div>
    );
};

export default connect()(ShippingPage);
