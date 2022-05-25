import React from 'react';
// import Newsletters from '~/components/partials/commons/Newletters';
import Addresses from '~/components/partials/account/Addresses';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const MyAccountPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Address">
            <div className="ps-page--my-account">
                <Addresses />
            </div>
            {/* <Newsletters layout="container" /> */}
        </WPLayout>
    </div>
);

export default MyAccountPage;
