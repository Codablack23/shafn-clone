import React from 'react';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';

import WPLayout from '~/wp-components/layouts/WPLayout';

const InvoiceDetailPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <InvoiceDetail />
            </div>
        </WPLayout>
    );
};

export default InvoiceDetailPage;
