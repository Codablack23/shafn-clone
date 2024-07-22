"use client";

import React, { Suspense, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getProductsByCategory } from "~/store/product/action";
import { WPGetProducts } from "~/store/wp/action";
import ShopBanner from "~/app/components/partials/shop/ShopBanner";

import WPWidgetCategories from "~/wp-components/shop/WPWidgetCategories";

import WPWidgetFilterByPrices from "~/wp-components/shop/WPWidgetFilterByPrices";
import WPShopProducts from "~/wp-components/shop/WPShopProducts";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPLayoutFullwidth from "~/wp-components/layouts/WPLayoutFullwidth";
// import WPShopCategories from "~/wp-components/shop/WPShopCategories";
import { scrollPageToTop } from "~/utilities/common-helpers";
import { useRouter } from 'next/navigation';
import axios from "axios";


//make this function a default export
//export default function WPProductDetailPage({pid}){


const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}
let productReqSource;
export default function WPShopPage() {

    // const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams()
    const category = params.get("category")

    const [WPLoading, setWPLoading] = useState(true)
    const [WPProducts, setWPProducts] = useState(null)

    // async function getCategory(id) {
    //     const categoryRes = await WPProductRepository.getCategoryByID(category);
    //     console.log({categoryRes})
    //     if (category) {
    //         setCategoryName(category.name);
    //         return category;
    //     } else {
    //         return null;
    //     }
    // }

    async function getProducts(){
        if(!category){
            const queries = {page: 1,per_page: 16}
            productReqSource = axios.CancelToken.source();
            setWPLoading(true)
            const res = await WPProductRepository.getProducts(queries,productReqSource.token)
            setWPLoading(false)
            if(res){
                setWPProducts(res)
            }
            return;
        }
        const queries = {page: 1,per_page: 16,category}
        productReqSource = axios.CancelToken.source();
        setWPLoading(true)
        const res = await WPProductRepository.getProducts(queries,productReqSource.token)
        setWPLoading(false);
        if(res) return setWPProducts(res);
    }

    useEffect(() => {
        getProducts();
    }, [category,params,router]);


    return (
        <div ref={scrollPageToTop}>
            <WPLayoutFullwidth title="Shop">
                <div className="ps-page--shop">
                    <div className="ps-container">
                        <ShopBanner />
                        {/* <ShopBrands /> */}
                        {/* <WPShopCategories /> */}
                        <div className="ps-layout--shop">
                            <div className="ps-layout__left">
                               <Suspense fallback={null}>
                                    <WPWidgetCategories
                                        activeID={category?category:""}
                                        page={"shop"}
                                    />
                               </Suspense>
                                {/* <WPWidgetBrand /> */}
                                <WPWidgetFilterByPrices />
                            </div>
                            <div className="ps-layout__right">
                                <WPShopProducts WPProducts={WPProducts} WPLoading={WPLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayoutFullwidth>
        </div>
    );
};

