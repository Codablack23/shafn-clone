import React from "react";
import Head from "next/head";
import WPHeaderMobile from "@/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "@/wp-components/shared/mobile/WPNavigationBottom";
// import Newletters from '@/app/components/partials/commons/Newletters';
import FooterDefault from "@/app/components/shared/footers/FooterDefault";
import { useCart } from "@/redux-store/hooks/useCart";
import useWishList from "@/redux-store/hooks/useWishList";

const WPLayoutProductDetail = ({ children, title = "Homepage" }) => {

    useCart()
    useWishList()
    return (
        <div className="shafn">
            <WPHeaderMobile />
            <WPNavigationBottom />
            {children}
            {/* <Newletters /> */}
            <FooterDefault />
        </div>
    );
};

export default WPLayoutProductDetail;
