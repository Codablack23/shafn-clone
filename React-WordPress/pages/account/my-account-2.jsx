import React, { Component } from 'react';
import MyAccount2 from '~/components/partials/account/MyAccount2';
import WPLayout from '~/wp-components/layouts/WPLayout';

class MyAccountPage2 extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef(null);
    }

    componentDidMount() {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }
    render() {
        return (
            <div ref={this.containerRef}>
                <WPLayout>
                    <div className="ps-page--my-account">
                        <MyAccount2 />
                    </div>
                </WPLayout>
            </div>
        );
    }
}

export default MyAccountPage2;
