import React from 'react';
import RecentViewedProducts from '~/app/components/partials/account/RecentViewedProducts';
import { scrollPageToTop } from '~/utilities/common-helpers';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RecentViewedProductsPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <RecentViewedProducts />
            </div>
        </WPLayout>
    </div>
);

export default RecentViewedProductsPage;
