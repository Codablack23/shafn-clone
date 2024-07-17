import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getProductsByCategory } from "~/store/product/action";
import { WPGetOnSaleProducts } from "~/store/sales/action";

import WPWidgetCategories from "~/wp-components/sales/WPWidgetCategories";

import WPWidgetFilterByPrices from "~/wp-components/sales/WPWidgetFilterByPrices";
import WPSalesProducts from "~/wp-components/sales/WPSalesProducts";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPLayoutFullwidth from "~/wp-components/layouts/WPLayoutFullwidth";
// import WPShopCategories from "~/wp-components/shop/WPShopCategories";
import { scrollPageToTop } from "~/utilities/common-helpers";
import { useRouter } from 'next/router';


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}

const WPSalesPage = ({ query }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [categoryName, setCategoryName] = useState(null);

    async function getCategory(id) {
        const category = await WPProductRepository.getCategoryByID(id);
        if (category) {
            setCategoryName(category.name);
            return category;
        } else {
            return null;
        }
    }

    async function getSalesOnChangeUrl(url) {
        const isSalesRoute = url.includes("/sales");
        const categoryId = url.split("category=").pop();
        if (
            isSalesRoute &&
            categoryId !== "" &&
            isNaN(parseInt(categoryId)) === false
        ) {
            const queries = {
                page: 1,
                per_page: 24,
                category: categoryId,
                on_sale: true,
            };
            dispatch(WPGetOnSaleProducts(queries));
            getCategory(categoryId);
        } else {
            const queries = {
                page: 1,
                per_page: 24,
                on_sale: true,
            };
            dispatch(WPGetOnSaleProducts(queries));
        }
    }

    useEffect(() => {
        if (query) {
            const queries = {
                page: 1,
                per_page: 24,
                on_sale: true,
            };
            dispatch(WPGetOnSaleProducts(queries));

            if (query.category) {
                dispatch(getProductsByCategory(query.category));
                getCategory(query.category);
            } else {
            }
        }

        router.events.on("routeChangeStart", getSalesOnChangeUrl);

        return () => {
            router.events.off("routeChangeStart", getSalesOnChangeUrl);
        };
    }, [dispatch]);

    return (
        <div ref={scrollPageToTop}>
            <WPLayoutFullwidth title="Sales">
                <div className="ps-page--shop">
                    <div className="ps-container">
                        <div className="ps-layout--shop">
                            <div className="ps-layout__left">
                                <WPWidgetCategories
                                    activeID={query && query.category}
                                    page={"sales"}
                                />
                                <WPWidgetFilterByPrices />
                            </div>
                            <div className="ps-layout__right">
                                <WPSalesProducts />
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayoutFullwidth>
        </div>
    );
};

WPSalesPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPSalesPage);
