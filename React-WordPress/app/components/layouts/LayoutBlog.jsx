import React from 'react';
import Head from 'next/head';
import HeaderDefault from '@/app/components/shared/headers/HeaderDefault';

import NavigationList from '@/app/components/shared/navigation/NavigationList';

import Newletters from '@/app/components/partials/commons/Newletters';
import FooterDefault from '@/app/components/shared/footers/FooterDefault';
import BreadCrumb2 from '@/app/components/elements/BreadCrumb2';
const LayoutBlog = ({ children, breadcrumb, title = 'Blog' }) => {
    return (
        <div className="layout--product">
           {/* <Head>
                <title>Martfury - {title}</title>
            </Head>

            <HeaderDefault />
            <NavigationList />*/}
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                        <BreadCrumb2 breacrumb={breadcrumb} />
                    </div>
                    {children}
                </div>
            </div>
            <Newletters />
            <FooterDefault />
        </div>
    );
};

export default LayoutBlog;
