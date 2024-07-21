import React from 'react';
import Login from '~/app/components/partials/account/Login';

import WPLayout from '~/wp-components/layouts/WPLayout';

const LoginPage = () => (
    <div>
        <WPLayout title="Login">
            <div className="ps-page--my-account">
                <Login />
            </div>
        </WPLayout>
    </div>
);

export default LoginPage;
