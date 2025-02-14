import React from 'react';
import Head from 'next/head';
import HeaderDefault from '@/app/components/shared/headers/HeaderDefault';
import NavigationList from '@/app/components/shared/navigation/NavigationList';
import Newletters from '@/app/components/partials/commons/Newletters';
import FooterDefault from '@/app/components/shared/footers/FooterDefault';

import HeaderMobile from '@/app/components/shared/headers/HeaderMobile';

const LayoutPost = ({ children, breadcrumb, title = 'Post' }) => {
    return (
        <div className="layout--post">
          {/*  <HeaderDefault />
            <HeaderMobile />
            <NavigationList />*/}
            {children}
            {/*<Newletters />
            <FooterDefault />*/}
        </div>
    );
};

export default LayoutPost;
