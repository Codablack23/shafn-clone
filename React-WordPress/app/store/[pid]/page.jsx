"use client"

import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Router from "next/router";
import WPStoreInformation from "@/wp-components/store/WPStoreInformation";
import WPVendorRepository from "@/repositories/WP/WPVendorRepository";
import SkeletonVendorInformation from "@/app/components/elements/skeletons/SkeletonVendorInformation";
import { SkeletonBanner } from "@/app/components/elements/skeletons/SkeletonVendorInformation";
import WPLayout from "@/wp-components/layouts/WPLayout";
import WPVendorProducts from "@/wp-components/store/WPVendorProducts";
import { generateTempArray, scrollPageToTop } from "@/utilities/common-helpers";
import SkeletonProduct from "@/app/components/elements/skeletons/SkeletonProduct";
import { useRouter } from 'next/router';


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}

const Banner = ({ store }) => (
    <div className="custom-banner">
        <img src={store.banner} />
        <div className="img-profile-container">
            <img src={store.gravatar} />
        </div>
    </div>
);

export default function WPStorePage ({ params }){

    let store_id = params.pid.split("-").pop();
    let query= { pid: store_id };

    const [loading, setLoading] = useState(true);
    const [storeID, setStoreID] = useState(null);
    const [storeProfile, setStoreProfile] = useState(null);
    const [storeProducts, setStoreProducts] = useState(null);

    async function getVendorInformations(id) {
        const profile = await WPVendorRepository.getStoreByID(id);
        const vendorProducts = await WPVendorRepository.getProductOfStoreByID(
            id,
            { per_page: 12 }
        );

        if (profile) {
            await setStoreProfile(profile);
        }

        if (vendorProducts) {
            await setStoreProducts(vendorProducts);                                                                                                                                          
        }

        setTimeout(
            function () {
                setLoading(false);
            }.bind(this),
            250
        );
    }

    useEffect(() => {
        if (query) {
            const { pid } = query;
            if (!isNaN(pid)) {
                setStoreID(pid);
                getVendorInformations(pid);
            } else {
                Router.push("/page/page-404");
            }
        }
    }, [params,query]);

    // Views
    let storeInformationView, storeProductsView, bannerView;

    if (!loading) {
        storeInformationView = <WPStoreInformation store={storeProfile} />;
        bannerView = <Banner store={storeProfile} />;
        if (storeProducts) {
            storeProductsView = (
                <WPVendorProducts products={storeProducts} id={storeID} />
            );
        }
    } else {
        storeInformationView = <SkeletonVendorInformation />;
        bannerView = <SkeletonBanner />;
        const skeletonItems = generateTempArray(8).map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        storeProductsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div ref={scrollPageToTop}>
            <WPLayout
                title={storeProfile ? storeProfile.store_name : "Loading..."}>
                <div className="ps-page--single ps-page--vendor">
                    <div className="ps-vendor-store">
                        <div className="container">
                            {bannerView}
                            <div className="ps-section__container">
                                <div className="ps-section__left">
                                    {storeInformationView}
                                </div>
                                <div className="ps-section__right">
                                    {storeProductsView}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

