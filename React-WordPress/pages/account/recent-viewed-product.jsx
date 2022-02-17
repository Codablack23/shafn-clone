import React from 'react';
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RecentViewedProductsPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <RecentViewedProducts />
            </div>
        </WPLayout>
    );
};

export default RecentViewedProductsPage;
