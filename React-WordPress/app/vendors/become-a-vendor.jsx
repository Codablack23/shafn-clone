import React from 'react';
import VendorBanner from '~/app/components/partials/vendor/VendorBanner';
import VendorAbout from '~/appcomponents/partials/vendor/VendorAbout';
import VendorMileStone from '~/app/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/app/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/app/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/app/components/partials/vendor/VendorFaqs';
// import Newletters from '~/app/components/partials/commons/Newletters';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const BecomeAVendorPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Become a vendor">
            <div className="ps-page--single">
                <VendorBanner />
                <VendorAbout />
                <VendorMileStone />
                <VendorBestFees />
                <VendorTestimonials />
                <VendorFaqs />
                <VendorBanner />
                {/* <Newletters layout="container" /> */}
            </div>
        </WPLayout>
    </div>
);

export default BecomeAVendorPage;
