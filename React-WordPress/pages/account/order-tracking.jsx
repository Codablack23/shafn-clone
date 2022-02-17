import React from 'react';
import OrderTracking from '~/components/partials/account/OrderTracking';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WPLayout from '~/wp-components/layouts/WPLayout';

const OrderTrackingPage = () => {
    return (
        <WPLayout title="Order Tracking">
            <div className="ps-page--simple">
                <OrderTracking />
            </div>
        </WPLayout>
    );
};

export default OrderTrackingPage;
