import React from 'react';
import Head from 'next/head';
import WPHeaderMobile from '~/wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '~/wp-components/shared/mobile/WPNavigationBottom';
// import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const WPLayoutProductDetail = ({ children, title = 'Homepage' }) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }
    return (
        <div className="shafn">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderMobile />
            {/* <WPNavigationBottom /> */}
            {children}
            {/* <Newletters /> */}
            <FooterDefault />
        </div>
    );
};

export default WPLayoutProductDetail;
