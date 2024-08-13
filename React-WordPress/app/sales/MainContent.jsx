"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import WPWidgetCategories from "~/wp-components/sales/WPWidgetCategories";
import WPSalesProducts from "~/wp-components/sales/WPSalesProducts";
import WPWidgetFilterByPrices from "~/wp-components/sales/WPWidgetFilterByPrices";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import { useSearchParams } from "next/navigation";

export default function MainContent(){

    const [currentPage,setCurrentPage] = useState(1);
    const router = useRouter();
    const params = useSearchParams()
    const category = params.get("category")

    const [WPLoading, setWPLoading] = useState(true)
    const [WPProducts, setWPProducts] = useState(null)


    async function getProducts(page=currentPage,per_page=24){
        setCurrentPage(page);
        let productReqSource;
        if(!category){
            const queries = {
                page,
                per_page,
                on_sale:true
            }
            productReqSource = axios.CancelToken.source();
            setWPLoading(true)
            const res = await WPProductRepository.getProducts(queries,productReqSource.token)
            setWPLoading(false)
            if(res){
                setWPProducts(res)
            }
            return;
        }
        const queries = {
            page,
            per_page: 24,
            category,
            on_sale:true
        }
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
        <div className="ps-page--shop">
            <div className="ps-container">
                <div className="ps-layout--shop">
                    <div className="ps-layout__left">
                            <WPWidgetCategories
                                activeID={category?category:""}
                                page={"sales"}
                            />
                        <WPWidgetFilterByPrices />
                    </div>
                    <div className="ps-layout__right">
                        <WPSalesProducts
                            WPProducts={WPProducts}
                            WPLoading={WPLoading}
                            handlePagination={getProducts}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}