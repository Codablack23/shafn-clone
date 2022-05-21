import React, { Component } from 'react';

import MyAccount from '~/components/partials/account/MyAccount';
import WPLayout from '~/wp-components/layouts/WPLayout';

class MyAccountPage extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef(null);
    }

    componentDidMount() {
        if (this.containerRef.current) {
            setTimeout(() => {
                this.containerRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 250);
        }
    }
    render() {
        return (
            <div ref={this.containerRef}>
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
