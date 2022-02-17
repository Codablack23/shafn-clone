import React from 'react';
import WPStores from '~/wp-components/store/WPStores';
import WPLayout from '~/wp-components/layouts/WPLayout';

const VendorPage = () => {
    return (
        <WPLayout title="Vendors">
            <div className="ps-page--single ps-page--vendor">
                <WPStores />
            </div>
        </WPLayout>
    );
};

export default VendorPage;
