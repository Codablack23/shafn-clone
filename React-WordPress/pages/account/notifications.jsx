import React, { useEffect, useRef } from 'react';

import Addresses from '~/components/partials/account/Addresses';
import Notifications from '~/components/partials/account/Notifications';

import WPLayout from '~/wp-components/layouts/WPLayout';

const AccountNotificationsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout>
                <div className="ps-page--my-account">
                    <Notifications />
                </div>
            </WPLayout>
        </div>
    );
};

export default AccountNotificationsPage;
