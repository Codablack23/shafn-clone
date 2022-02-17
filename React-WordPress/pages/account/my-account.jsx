import React, { Component } from 'react';

import MyAccount from '~/components/partials/account/MyAccount';
import WPLayout from '~/wp-components/layouts/WPLayout';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WPLayout>
                <div className="ps-page--my-account">
                    <MyAccount />
                </div>
            </WPLayout>
        );
    }
}

export default MyAccountPage;
