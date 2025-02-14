import React from 'react';
import FaqsContent from '@/app/components/partials/page/FaqsContent';
import WPLayout from '@/wp-components/layouts/WPLayout';

const FaqsPage = () => (
    <div>
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
