import React, { useEffect, useRef } from 'react';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';

import WPLayout from '~/wp-components/layouts/WPLayout';

const InvoiceDetailPage = () => {
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
                    <InvoiceDetail />
                </div>
            </WPLayout>
        </div>
    );
};

export default InvoiceDetailPage;
