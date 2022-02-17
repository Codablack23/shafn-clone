import React from 'react';
import Invoices from '~/components/partials/account/Invoices';
import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <Invoices />
            </div>
        </WPLayout>
    );
};

export default MyAccountPage;
