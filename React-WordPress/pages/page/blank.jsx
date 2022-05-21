import React, { useEffect, useRef } from 'react';
import BlankContent from '~/components/partials/page/Blank';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlankPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout>
                <div className="ps-page--single">
                    <BlankContent />
                </div>
            </WPLayout>
        </div>
    );
};

export default BlankPage;
