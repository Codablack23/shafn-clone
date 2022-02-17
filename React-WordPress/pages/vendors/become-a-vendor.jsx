import React from 'react';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import Newletters from '~/components/partials/commons/Newletters';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BecomeAVendorPage = () => {
    return (
        <WPLayout title="Become a vendor">
            <div className="ps-page--single">
                <VendorBanner />
                <VendorAbout />
                <VendorMileStone />
                <VendorBestFees />
                <VendorTestimonials />
                <VendorFaqs />
                <VendorBanner />
                <Newletters layout="container" />
            </div>
        </WPLayout>
    );
};

export default BecomeAVendorPage;
