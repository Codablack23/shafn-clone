import React, { useEffect, useRef } from 'react';
import Register from '~/components/partials/account/Register';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RegisterPage = () => {
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
            <WPLayout title="Register">
                <div className="ps-page--my-account">
                    <Register />
                </div>
            </WPLayout>
        </div>
    );
};

export default RegisterPage;
