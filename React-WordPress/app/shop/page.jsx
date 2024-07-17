"use client";

import React, { useEffect, useState } from "react";
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

export default function WPShopPage() {
    // const dispatch = useDispatch();
    // const router = useRouter();
    const params = useSearchParams()
    const category = params.get("categories")

    const [categoryName, setCategoryName] = useState(null);

    // async function getCategory(id) {
    //     const category = await WPProductRepository.getCategoryByID(35);
    //     console.log({category})
    //     if (category) {
    //         setCategoryName(category.name);
    //         return category;
    //     } else {
    //         return null;
    //     }
    // }

    // async function getShopOnChangeUrl(url) {
    //     const isShopRoute = url.includes("/shop");
    //     const categoryId = url.split("category=").pop();
    //     console.log({
    //         categoryId
    //     })
    //     if (
    //         isShopRoute &&
    //         categoryId !== "" &&
    //         isNaN(parseInt(categoryId)) === false
    //     ) {
    //         const queries = {
    //             page: 1,
    //             per_page: 24,
    //             category: categoryId,
    //         };

    //         dispatch(WPGetProducts(queries));
    //         getCategory(categoryId);
    //     } else {
    //         const queries = {
    //             page: 1,
    //             per_page: 24,
    //         };
    //         dispatch(WPGetProducts(queries));
    //     }
    // }

    async function getProducts(){
        if(category){
            const queries = {page: 1,per_page: 24,category,};
            // dispatch(WPGetProducts(queries));
            // getCategory(category);
        }else{
            const queries = { page: 1,per_page: 24,};
            // dispatch(WPGetProducts(queries));
        }
    }

    useEffect(() => {
        getProducts();
        // if (query) {
        //     const queries = {
        //         page: 1,
        //         per_page: 24,
        //     };
        //     dispatch(WPGetProducts(queries));

        //     if (query.category) {
        //         dispatch(getProductsByCategory(query.category));
        //         getCategory(query.category);
        //     } else {
        //     }
        // }

        // router.events.on("routeChangeStart", getShopOnChangeUrl);

        // return () => {
        //     router.events.off("routeChangeStart", getShopOnChangeUrl);
        // };
    }, [category]);

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
                                <WPWidgetCategories
                                    activeID={category?category:""}
                                    page={"shop"}
                                />
                                {/* <WPWidgetBrand /> */}
                                <WPWidgetFilterByPrices />
                            </div>
                            <div className="ps-layout__right">
                                <WPShopProducts />
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayoutFullwidth>
        </div>
    );
};

// WPShopPage.getInitialProps = async ({ query }) => {
//     return { query: query };
// };

// export default connect()(WPShopPage);
