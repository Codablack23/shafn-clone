import React from 'react';
import BlankContent from '~/app/components/partials/page/Blank';
import { scrollPageToTop } from '~/utilities/common-helpers';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlankPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--single">
                <BlankContent />
            </div>
        </WPLayout>
    </div>
);

export default BlankPage;
