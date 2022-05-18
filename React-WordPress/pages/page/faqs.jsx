import React, { useEffect, useRef } from 'react';
import FaqsContent from '../../components/partials/page/FaqsContent';
import Newletters from '../../components/partials/commons/Newletters';
import WPLayout from '~/wp-components/layouts/WPLayout';

const FaqsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="FAQ">
                <div className="ps-page--single">
                    <div className="container">
                        <FaqsContent />
                    </div>
                </div>
                <Newletters layout="container" />
            </WPLayout>
        </div>
    );
};

export default FaqsPage;
