import React from 'react';
import Newsletters from '~/components/partials/commons/Newletters';
import Addresses from '~/components/partials/account/Addresses';
import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => {
    return (
        <WPLayout title="Address">
            <div className="ps-page--my-account">
                <Addresses />
            </div>
            <Newsletters layout="container" />
        </WPLayout>
    );
};

export default MyAccountPage;
