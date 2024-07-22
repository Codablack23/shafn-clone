"use client";
import React from "react";
import Head from "next/head";
// import WPHeaderMobile from '~/wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from "~/wp-components/shared/mobile/WPNavigationBottom";
import FooterDefault from "~/app/components/shared/footers/FooterDefault";
import Newsletters from "~/app/components/partials/commons/Newletters";
import WPHeaderMarketPlace from "~/wp-components/shared/headers/WPHeaderMarketPlace";
import { useCart } from "@/redux-store/hooks/useCart";
import useWishList from "@/redux-store/hooks/useWishList";

const WPLayoutHomeMarketPlace = ({ children, title }) => {
   useCart()
   useWishList()

    return (
        <div className="martfury">
            <Head>
            </Head>
            <WPHeaderMarketPlace />
            {/* <WPHeaderMobile /> */}
            <WPNavigationBottom />
            {/*<SubscribePopup active={subscribe} />*/}
            {children}
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};

export default WPLayoutHomeMarketPlace;
