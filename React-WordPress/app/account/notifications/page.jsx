"use client";
import React from 'react';
// import Notifications from '@/app/components/partials/account/Notifications';
import { scrollPageToTop } from '@/utilities/common-helpers';

import WPLayout from '@/wp-components/layouts/WPLayout';

const AccountNotificationsPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                {/* <Notifications /> */}
            </div>
        </WPLayout>
    </div>
);

export default AccountNotificationsPage;
