import React from 'react';
import OrderTracking from '~/app/components/partials/account/OrderTracking';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const OrderTrackingPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Order Tracking">
            <div className="ps-page--simple">
                <OrderTracking />
            </div>
        </WPLayout>
    </div>
);

export default OrderTrackingPage;
