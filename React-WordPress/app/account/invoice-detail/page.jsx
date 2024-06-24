import React from 'react';
import InvoiceDetail from '~/app/components/partials/account/InvoiceDetail';
import { scrollPageToTop } from '~/utilities/common-helpers';

import WPLayout from '~/wp-components/layouts/WPLayout';

const InvoiceDetailPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <InvoiceDetail />
            </div>
        </WPLayout>
    </div>
);

export default InvoiceDetailPage;
