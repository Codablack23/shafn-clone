import React from 'react';
import Register from '~/app/components/partials/account/Register';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RegisterPage = () => (
    <div>
        <WPLayout title="Register">
            <div className="ps-page--my-account">
                <Register />
            </div>
        </WPLayout>
    </div>
);

export default RegisterPage;
