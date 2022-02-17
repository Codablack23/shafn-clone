import React from 'react';
import Register from '~/components/partials/account/Register';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RegisterPage = () => {
    return (
        <WPLayout title="Register">
            <div className="ps-page--my-account">
                <Register />
            </div>
        </WPLayout>
    );
};

export default RegisterPage;
