import React, { Component } from 'react';
import MyAccount2 from '~/components/partials/account/MyAccount2';
import WPLayout from '~/wp-components/layouts/WPLayout';

class MyAccountPage2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WPLayout>
                <div className="ps-page--my-account">
                    <MyAccount2 />
                </div>
            </WPLayout>
        );
    }
}

export default MyAccountPage2;
