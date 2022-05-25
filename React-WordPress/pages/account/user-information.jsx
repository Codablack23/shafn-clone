import React from 'react';
import UserInformation from '~/components/partials/account/UserInformation';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const UserInformationPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <UserInformation />
            </div>
        </WPLayout>
    </div>
);

export default UserInformationPage;
