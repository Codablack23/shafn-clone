import React from 'react';

import EditAddress from '~/components/partials/account/EditAddress';

import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <EditAddress />
            </div>
        </WPLayout>
    );
};

export default MyAccountPage;
