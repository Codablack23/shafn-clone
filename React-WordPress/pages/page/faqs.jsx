import React from 'react';
import FaqsContent from '../../components/partials/page/FaqsContent';
import Newletters from '../../components/partials/commons/Newletters';
import WPLayout from '~/wp-components/layouts/WPLayout';

const FaqsPage = () => {
    return (
        <WPLayout title="FAQ">
            <div className="ps-page--single">
                <div className="container">
                    <FaqsContent />
                </div>
            </div>
            <Newletters layout="container" />
        </WPLayout>
    );
};

export default FaqsPage;
