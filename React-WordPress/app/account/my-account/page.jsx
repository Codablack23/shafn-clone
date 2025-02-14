"use client";
import React, { Component } from 'react';

import MyAccount from '@/app/components/partials/account/MyAccount';
import { scrollPageToTop } from '@/utilities/common-helpers';
import WPLayout from '@/wp-components/layouts/WPLayout';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div ref={scrollPageToTop}>
                <WPLayout>
                    <div className="ps-page--my-account">
                        <MyAccount />
                    </div>
                </WPLayout>
            </div>
        );
    }
}

export default MyAccountPage;
