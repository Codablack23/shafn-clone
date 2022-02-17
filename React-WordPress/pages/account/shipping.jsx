import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Shipping from '~/components/partials/account/Shipping';
import { getCart } from '~/store/cart/action';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPShipping from '~/wp-components/account/WPShipping';

const ShippingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <WPLayout>
            <div className="ps-page--simple">
                <WPShipping />
            </div>
        </WPLayout>
    );
};

export default connect()(ShippingPage);
