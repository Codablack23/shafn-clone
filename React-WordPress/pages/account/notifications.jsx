import React from 'react';

import Addresses from '~/components/partials/account/Addresses';
import Notifications from '~/components/partials/account/Notifications';

import WPLayout from '~/wp-components/layouts/WPLayout';

const AccountNotificationsPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <Notifications />
            </div>
        </WPLayout>
    );
};

export default AccountNotificationsPage;
