import React from 'react';
import Login from '~/components/partials/account/Login';
import { scrollPageToTop } from '~/utilities/common-helpers';

import WPLayout from '~/wp-components/layouts/WPLayout';

const LoginPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Login">
            <div className="ps-page--my-account">
                <Login />
            </div>
        </WPLayout>
    </div>
);

export default LoginPage;
