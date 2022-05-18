import React, { useEffect, useRef } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';

import WPLayout from '~/wp-components/layouts/WPLayout';

const LoginPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);
    return (
        <div ref={containerRef}>
            <WPLayout title="Login">
                <div className="ps-page--my-account">
                    <Login />
                </div>
            </WPLayout>
        </div>
    );
};

export default LoginPage;
