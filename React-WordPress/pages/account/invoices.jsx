import React, { useEffect, useRef } from 'react';
import Invoices from '~/components/partials/account/Invoices';
import WPLayout from '~/wp-components/layouts/WPLayout';

const MyAccountPage = () => {
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
                <div className="ps-page--my-account">
                    <Invoices />
                </div>
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
