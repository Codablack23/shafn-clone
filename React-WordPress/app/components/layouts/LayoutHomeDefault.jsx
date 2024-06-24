import React from 'react';
import Head from 'next/head';
import FooterFullwidth from '~/app/components/shared/footers/FooterFullwidth';
import SwicherDemo from '~/app/components/shared/switcher-demo/SwitcherDemo';
import HeaderDefault from '~/app/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/app/components/shared/headers/HeaderMobile';
import NavigationList from '~/app/components/shared/navigation/NavigationList';
import SubscribePopup from '~/app/components/shared/SubscribePopup';

const LayoutHomeDefault = ({ children, title = 'Homepage' }) => {
    return (
        <div className="__site-layout">
            <Head>
                <title>ShafN {title}</title>
            </Head>
            {/*<HeaderDefault />
            <HeaderMobile />
            <NavigationList />*/}
            {/* <SubscribePopup active={subscribe} />*/}
            <main id="homepage-1">{children}</main>
            <FooterFullwidth />
            {/*<SwicherDemo />*/}
        </div>
    );
};

export default LayoutHomeDefault;
