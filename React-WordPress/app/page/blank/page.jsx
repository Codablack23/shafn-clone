import React from 'react';
import BlankContent from '~/app/components/partials/page/Blank';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlankPage = () => (
    <div>
        <WPLayout>
            <div className="ps-page--single">
                <BlankContent />
            </div>
        </WPLayout>
    </div>
);

export default BlankPage;
