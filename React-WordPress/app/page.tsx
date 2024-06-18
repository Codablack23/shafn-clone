"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { connect, useDispatch } from "react-redux";
import HomeBanner from "~/app/components/partials/homepage/home-default/HomeBanner";
import HomeAdsColumns from "~/app/components/partials/homepage/home-default/HomeAdsColumns";
import { getCollections } from "~/store/collection/action";
import WPLayoutHomeDefault from "~/wp-components/layouts/WPLayoutHomeDefault";
import WPNewArrivals from "~/wp-components/homepage/WPNewArrivals";
import WPDealOfDay from "~/wp-components/homepage/WPDealOfDay";
import WPProductList from "~/wp-components/homepage/WPProductList";
import WPRecentlyViewed from "~/wp-components/homepage/WPRecentlyViewed";
import { getBannersBySlugs, getPromotionsBySlugs } from "~/store/media/action";
import ModalCookie from "~/app/components/elements/modalCookie";
import { useState } from "react";
import RandomCategories from "~/wp-components/homepage/RandomCategories";
import AdSection from "~/app/components/partials/homepage/AdSection";

export default function Home() {
    const [isCookiesShowing, setIsCookiesShowing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
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

    // console.log(auth)
    return (
        <WPLayoutHomeDefault title={process.env.NEXT_PUBLIC_TITLE_DESCRIPTION}>
            <HomeBanner />

            <WPDealOfDay />

            <HomeAdsColumns />

            <RandomCategories />
            <AdSection/>
            <WPNewArrivals />

            {/* {auth.isLoggedIn && <WPRecentlyViewed />} */}
            <motion.div animate={{ opacity: isCookiesShowing ? 1 : 0 }}>
                <div>
                    <ModalCookie />
                </div>
            </motion.div>
        </WPLayoutHomeDefault>
    );
};

