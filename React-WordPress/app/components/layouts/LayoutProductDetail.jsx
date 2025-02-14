import React from 'react';
import Head from 'next/head';
import NavigationList from '@/app/components/shared/navigation/NavigationList';
import HeaderMobileProduct from '@/app/components/shared/header-mobile/HeaderMobileProduct';
import Newletters from '@/app/components/partials/commons/Newletters';
import FooterDefault from '@/app/components/shared/footers/FooterDefault';

const LayoutProductDetail = ({ children, title = 'Homepage' }) => {
    return (
        <div className="layout--product">
            <Head>
                <title>ShafN {title ? '-' + title : ''}</title>
            </Head>
           {/* <HeaderMobileProduct />*/}
            <NavigationList />
            {children}
            <Newletters />
            <FooterDefault />
        </div>
    );
};

export default LayoutProductDetail;
