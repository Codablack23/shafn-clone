import React, { useEffect, useRef } from 'react';
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RecentViewedProductsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout>
                <div className="ps-page--my-account">
                    <RecentViewedProducts />
                </div>
            </WPLayout>
        </div>
    );
};

export default RecentViewedProductsPage;
