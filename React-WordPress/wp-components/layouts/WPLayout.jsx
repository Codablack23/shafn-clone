import React from 'react';
import Head from 'next/head';
//import WPNavigationBottom from '~/wp-components/shared/mobile/WPNavigationBottom';
import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newsletters from '~/components/partials/commons/Newletters';
import WPHeaderDefault from '~/wp-components/shared/headers/WPHeaderDefault';
import WPHeaderMobile from '../shared/mobile/WPHeaderMobile';
// import WPHeaderMarketPlace from '~/wp-components/shared/headers/WPHeaderMarketPlace';
// import WPHeaderMobile from '~/wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '~/wp-components/shared/mobile/WPNavigationBottom';

const WPLayout = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="shafn">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderDefault />
            <WPHeaderMobile/>
            <WPNavigationBottom />
            {children}
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
            {/* <WPHeaderMobile /> */}
            {/*<SubscribePopup active={subscribe} />*/}
            {/* <WPHeaderMarketPlace/>*/}
        </div>
    );
};

export default WPLayout;
