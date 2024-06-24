import React from "react";
import Head from "next/head";
import WPHeaderMobile from "~/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "~/wp-components/shared/mobile/WPNavigationBottom";
// import Newletters from '~/app/components/partials/commons/Newletters';
import FooterDefault from "~/app/components/shared/footers/FooterDefault";

const WPLayoutProductDetail = ({ children, title = "Homepage" }) => {
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
        <div className="shafn">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderMobile />
            <WPNavigationBottom />
            {children}
            {/* <Newletters /> */}
            <FooterDefault />
        </div>
    );
};

export default WPLayoutProductDetail;
