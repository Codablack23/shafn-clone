import React from 'react';
import Invoices from '~/components/partials/account/Invoices';
import { scrollPageToTop } from '~/utilities/common-helpers';
import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <Invoices />
            </div>
        </WPLayout>
    </div>
);

export default MyAccountPage;
