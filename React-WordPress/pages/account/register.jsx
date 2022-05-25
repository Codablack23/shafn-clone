import React from 'react';
import Register from '~/components/partials/account/Register';
import { scrollPageToTop } from '~/utilities/common-helpers';

import WPLayout from '~/wp-components/layouts/WPLayout';

const RegisterPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Register">
            <div className="ps-page--my-account">
                <Register />
            </div>
        </WPLayout>
    </div>
);

export default RegisterPage;
