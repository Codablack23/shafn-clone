import React from "react";
import Head from "next/head";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import SwicherDemo from "~/components/shared/switcher-demo/SwitcherDemo";
import WPHeaderDefault from "~/wp-components/shared/headers/WPHeaderDefault";
import WPHeaderMobile from "~/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "~/wp-components/shared/mobile/WPNavigationBottom";

const WPLayoutHomeDefault = ({ children, title }) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.NEXT_PUBLIC_TITLE + " | " + title;
    } else {
        titleView =
            process.env.NEXT_PUBLIC_TITLE +
            " | " +
            process.env.NEXT_PUBLIC_TITLE_DESCRIPTION;
    }

    return (
        <div className="martfury" id="shafn">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderDefault />
            <WPHeaderMobile />
            <WPNavigationBottom />
            <main id="homepage-1">{children}</main>
            <FooterFullwidth />
            {/*<SwicherDemo />*/}
            {/*<SubscribePopup active={subscribe} />*/}
        </div>
    );
};

export default WPLayoutHomeDefault;
