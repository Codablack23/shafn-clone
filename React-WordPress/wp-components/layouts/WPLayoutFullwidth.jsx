"use client";
import FooterFullwidth from "@/app/components/shared/footers/FooterFullwidth";
import WPHeaderDefault from "@/wp-components/shared/headers/WPHeaderDefault";
import WPHeaderMobile from "@/wp-components/shared/mobile/WPHeaderMobile";
import WPNavigationBottom from "@/wp-components/shared/mobile/WPNavigationBottom";
import { useCart } from "@/redux-store/hooks/useCart";
import useWishList from "@/redux-store/hooks/useWishList";

const WPLayoutFullwidth = ({ children, title }) => {
    useCart()
    useWishList()

    return (
        <div className="shafn">
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
