import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useDispatch, connect } from 'react-redux';
import { getCart } from '~/store/cart/action';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPPayment from '~/wp-components/account/WPPayment';

const PaymentPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <WPLayout>
            <div className="ps-page--simple">
                <WPPayment />
            </div>
        </WPLayout>
    );
};

export default connect()(PaymentPage);
