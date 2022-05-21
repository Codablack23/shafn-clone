import React, { useEffect, useRef } from 'react';
import OrderTracking from '~/components/partials/account/OrderTracking';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WPLayout from '~/wp-components/layouts/WPLayout';

const OrderTrackingPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="Order Tracking">
                <div className="ps-page--simple">
                    <OrderTracking />
                </div>
            </WPLayout>
        </div>
    );
};

export default OrderTrackingPage;
