"use client";
import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import MarketPlaceProductBox from '~/app/components/partials/homepage/marketplace/MarketPlaceProductBox';
import MarketPlacePromotion from '~/app/components/partials/homepage/marketplace/MarketPlacePromotions';
import MarketPlaceDealOfDay from '~/app/components/partials/homepage/marketplace/MarketPlaceDealOfDay';
import MarketPlaceSiteFeatures from '~/app/components/partials/homepage/marketplace/MarketPlaceSiteFeatures';
import MarketPlaceHomeBanner from '~/app/components/partials/homepage/marketplace/MartketPlaceHomeBanner';
import { getCategories, getCollections } from '~/store/collection/action';
import WPLayoutHomeMarketPlace from '~/wp-components/layouts/WPLayoutHomeMarketPlace';
import { scrollPageToTop } from '~/utilities/common-helpers';
import { useRouter } from 'next/router';


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}

const HomeMarketPlacePage = () => {

    useEffect(() => {
        const collectionsSlug = ['deal-of-the-day'];
        const categoriesSlug = [
            'clothing-and-parel',
            'consumer-electrics',
            'computers-and-technologies',
            'garden-and-kitchen',
            'health-and-beauty',
        ];

    }, []);

    return (
        <div className="site-content" ref={scrollPageToTop}>
            <WPLayoutHomeMarketPlace title="Home Marketplace 1">
                <main id="homepage-3">
                    <MarketPlaceHomeBanner />
                    <MarketPlaceSiteFeatures />
                    <MarketPlacePromotion />
                    <MarketPlaceDealOfDay collectionSlug="deal-of-the-day" />
                    <MarketPlaceProductBox />
                </main>
            </WPLayoutHomeMarketPlace>
        </div>
    );
};
export default HomeMarketPlacePage;
