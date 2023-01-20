import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import HomeBanner from "~/components/partials/homepage/home-default/HomeBanner";
import HomeAdsColumns from "~/components/partials/homepage/home-default/HomeAdsColumns";
import { getCollections } from "~/store/collection/action";
import WPLayoutHomeDefault from "~/wp-components/layouts/WPLayoutHomeDefault";
import WPNewArrivals from "~/wp-components/homepage/WPNewArrivals";
import WPDealOfDay from "~/wp-components/homepage/WPDealOfDay";
import WPProductList from "~/wp-components/homepage/WPProductList";
import WPRecentlyViewed from "~/wp-components/homepage/WPRecentlyViewed";
import { getBannersBySlugs, getPromotionsBySlugs } from "~/store/media/action";
import ModalCookie from "~/components/elements/modalCookie";
import { useState } from "react";
import { motion } from "framer-motion";

const Index = (auth) => {
    const [isCookiesShowing, setIsCookiesShowing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setIsShowing(true);
        }, 4000);
        setTimeout(() => {
            setIsCookiesShowing(true);
        }, 5000);
        const collectionsSlug = [
            "deal-of-the-day",
            "consumer-electronics",
            "clothings",
            "garden-and-kitchen",
            "new-arrivals-products",
            "fullwidth-consumer-electronic-best-seller",
            "fullwidth-consumer-electronic-most-popular",
            "fullwidth-clothing-best-sellers",
            "fullwidth-clothing-most-popular",
            "fullwidth-kitchen-most-popular",
            "fullwidth-kitchen-best-sellers",
        ];
        const bannerSlugs = ["banner-home-fullwidth"];
        const promotionSlugs = ["home_fullwidth_promotions"];
        dispatch(getBannersBySlugs(bannerSlugs));
        dispatch(getPromotionsBySlugs(promotionSlugs));
        dispatch(getCollections(collectionsSlug));
    }, []);

    return (
        <WPLayoutHomeDefault title={process.env.NEXT_PUBLIC_TITLE_DESCRIPTION}>
            <HomeBanner />

            <WPDealOfDay />

            <HomeAdsColumns />

            {/* <HomeDefaultTopCategories /> */}

            <WPProductList categoryID={21} title="Art" />

            <WPProductList categoryID={24} title="Clothing" />

            <WPNewArrivals />

            {auth.isLoggedIn && <WPRecentlyViewed />}

            <motion.div animate={{ opacity: isCookiesShowing ? 1 : 0 }}>
                <div>
                    <ModalCookie />
                </div>
            </motion.div>
        </WPLayoutHomeDefault>
    );
};

const mapStateToProps = (state) => state.auth;

export default connect(mapStateToProps)(Index);
