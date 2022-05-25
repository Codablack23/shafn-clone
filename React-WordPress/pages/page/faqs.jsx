import React from 'react';
import FaqsContent from '../../components/partials/page/FaqsContent';
import WPLayout from '~/wp-components/layouts/WPLayout';
import { scrollPageToTop } from '~/utilities/common-helpers';

const FaqsPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="FAQ">
            <div className="ps-page--single">
                <div className="container">
                    <FaqsContent />
                </div>
            </div>
            {/* <Newletters layout="container" /> */}
        </WPLayout>
    </div>
);

export default FaqsPage;
