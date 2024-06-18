import React from 'react';
import WPStores from '~/wp-components/store/WPStores';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const VendorPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Vendors">
            <div className="ps-page--single ps-page--vendor">
                <WPStores />
            </div>
        </WPLayout>
    </div>
);

export default VendorPage;
