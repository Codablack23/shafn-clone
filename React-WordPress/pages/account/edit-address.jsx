import React from 'react';

import EditAddress from '~/components/partials/account/EditAddress';
import { scrollPageToTop } from '~/utilities/common-helpers';

import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <EditAddress />
            </div>
        </WPLayout>
    </div>
);

export default MyAccountPage;
