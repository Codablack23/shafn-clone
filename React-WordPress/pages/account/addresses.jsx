import React, { useEffect, useRef } from 'react';
import Newsletters from '~/components/partials/commons/Newletters';
import Addresses from '~/components/partials/account/Addresses';
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
            <WPLayout title="Address">
                <div className="ps-page--my-account">
                    <Addresses />
                </div>
                <Newsletters layout="container" />
            </WPLayout>
        </div>
    );
};

export default MyAccountPage;
