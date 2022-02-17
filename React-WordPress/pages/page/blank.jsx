import React from 'react';
import BlankContent from '~/components/partials/page/Blank';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlankPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--single">
                <BlankContent />
            </div>
        </WPLayout>
    );
};

export default BlankPage;
