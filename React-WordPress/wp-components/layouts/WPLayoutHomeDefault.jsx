"use client";
import { useCart } from "@/redux-store/hooks/useCart";
import useWishList from "@/redux-store/hooks/useWishList";
import Head from "next/head";
import FooterFullwidth from "~/app/components/shared/footers/FooterFullwidth";
import SwicherDemo from "~/app/components/shared/switcher-demo/SwitcherDemo";
import WPHeaderDefault from "~/wp-components/shared/headers/WPHeaderDefault";
import WPHeaderMobile from "~/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "~/wp-components/shared/mobile/WPNavigationBottom";

const WPLayoutHomeDefault = ({ children, title }) => {
    useCart()
    useWishList()

    return (
        <div className="martfury" id="shafn">
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
