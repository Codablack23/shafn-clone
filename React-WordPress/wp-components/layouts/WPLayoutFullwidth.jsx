import React from "react";
import Head from "next/head";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import WPHeaderDefault from "~/wp-components/shared/headers/WPHeaderDefault";
import WPHeaderMobile from "~/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "~/wp-components/shared/mobile/WPNavigationBottom";

const WPLayoutFullwidth = ({ children, title }) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.TITLE + " | " + title;
    } else {
        titleView = process.env.TITLE + " | " + process.env.TITLE_DESCRIPTION;
    }

    return (
        <div className="shafn">
            <Head>
                <title>{titleView}</title>
            </Head>
            {/* <WPHeaderDefault /> */}
            <WPHeaderDefault />
            <WPHeaderMobile />
            <WPNavigationBottom />
            {children}
            <FooterFullwidth />
            {/* <SubscribePopup active={subscribe} /> */}
        </div>
    );
};

export default WPLayoutFullwidth;
