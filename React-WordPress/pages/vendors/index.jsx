import React, { useEffect, useRef } from 'react';
import WPStores from '~/wp-components/store/WPStores';
import WPLayout from '~/wp-components/layouts/WPLayout';

const VendorPage = () => {
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
            <WPLayout title="Vendors">
                <div className="ps-page--single ps-page--vendor">
                    <WPStores />
                </div>
            </WPLayout>
        </div>
    );
};

export default VendorPage;
