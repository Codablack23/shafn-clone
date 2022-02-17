import React from 'react';
import UserInformation from '~/components/partials/account/UserInformation';
import WPLayout from '~/wp-components/layouts/WPLayout';

const UserInformationPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--my-account">
                <UserInformation />
            </div>
        </WPLayout>
    );
};

export default UserInformationPage;
