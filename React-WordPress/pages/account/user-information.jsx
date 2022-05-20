import React, { useEffect, useRef } from 'react';
import UserInformation from '~/components/partials/account/UserInformation';
import WPLayout from '~/wp-components/layouts/WPLayout';

const UserInformationPage = () => {
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
                    <UserInformation />
                </div>
            </WPLayout>
        </div>
    );
};

export default UserInformationPage;
