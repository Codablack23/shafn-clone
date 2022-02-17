import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';

import WPLayout from '~/wp-components/layouts/WPLayout';

const LoginPage = () => {
    return (
        <WPLayout title="Login">
            <div className="ps-page--my-account">
                <Login />
            </div>
        </WPLayout>
    );
};

export default LoginPage;
