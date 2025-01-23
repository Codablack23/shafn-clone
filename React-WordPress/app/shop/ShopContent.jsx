"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopBanner from "~/app/components/partials/shop/ShopBanner";
import WPWidgetCategories from "~/wp-components/shop/WPWidgetCategories";
import WPWidgetFilterByPrices from "~/wp-components/shop/WPWidgetFilterByPrices";
import WPShopProducts from "~/wp-components/shop/WPShopProducts";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function ShopContent(){
    const [currentPage,setCurrentPage] = useState(1);
    const router = useRouter();
    const params = useSearchParams()
    const category = params.get("category")

    const [WPLoading, setWPLoading] = useState(true)
    const [WPProducts, setWPProducts] = useState(null)


    const getAllProducts = async(page,per_page) => {
        let productReqSource;
        const queries = {page,per_page}
        productReqSource = axios.CancelToken.source();
        setWPLoading(true)
        return await WPProductRepository.getProducts(queries,productReqSource.token)
    }

    async function getProducts(page=currentPage,per_page=16){
        let productReqSource;
        setCurrentPage(page);

        const allProducts = await getAllProducts(page,per_page)

        if(!category){
            if(allProducts){
                setWPProducts(allProducts)
            }
            return;
        }
        const queries = {page,per_page,category}
        productReqSource = axios.CancelToken.source();
        setWPLoading(true)
        const res = await WPProductRepository.getProducts(queries,productReqSource.token)

        setWPLoading(false);
        if(res) return setWPProducts(res);
        if(allProducts) return setWPProducts(allProducts)
    }

    useEffect(() => {
        getProducts();
    }, [category,params,router]);
    return (
    <div className="ps-page--shop">
        <div className="ps-container">
            <ShopBanner />
            {/* <ShopBrands /> */}
            {/* <WPShopCategories /> */}
            <div className="ps-layout--shop">
                <div className="ps-layout__left">
                        <WPWidgetCategories
                            activeID={category?category:""}
                            page={"shop"}
                        />
                    {/* <WPWidgetBrand /> */}
                    <WPWidgetFilterByPrices />
                </div>
                <div className="ps-layout__right">
                    <WPShopProducts
                    WPProducts={WPProducts}
                    WPLoading={WPLoading}
                    currentPage={currentPage}
                    handlePagination = {getProducts}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}