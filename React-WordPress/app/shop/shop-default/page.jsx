"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductsByCategory } from '~/store/product/action';
import { WPGetProducts } from '~/store/wp/action';
import ShopBanner from '~/app/components/partials/shop/ShopBanner';
import ShopBrands from '~/app/components/partials/shop/ShopBrands';
import WPWidgetCategories from '~/wp-components/shop/WPWidgetCategories';
import WPWidgetBrand from '~/wp-components/shop/WPWidgetBrand';
import WPWidgetFilterByPrices from '~/wp-components/shop/WPWidgetFilterByPrices';
import WPShopProducts from '~/wp-components/shop/WPShopProducts';
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPShopCategories from '~/wp-components/shop/WPShopCategories';
import { scrollPageToTop } from '~/utilities/common-helpers';
import { useSearchParams } from 'next/navigation';


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}

const WPShopDefaultPage = () => {
    const searchParams = useSearchParams()
    const paramsCategory = searchParams.get("category")

    const query = {category:paramsCategory}
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

    async function getProductOnChangeURL(url) {
        const nextPid = url.split('category=').pop();
        if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
            const queries = {
                page: 1,
                per_page: 18,
                category: nextPid,
            };
            dispatch(WPGetProducts(queries));
            getCategory(nextPid);
        } else {
            const queries = {
                page: 1,
                per_page: 18,
            };
            dispatch(WPGetProducts(queries));
        }
    }

    useEffect(() => {
        if (query) {
            const queries = {
                page: 1,
                per_page: 18,
            };
            dispatch(WPGetProducts(queries));

            if (query.category) {
                dispatch(getProductsByCategory(query.category));
                getCategory(query.category);
            } else {
            }
        }

        router.events.on('routeChangeStart', getProductOnChangeURL);

        return () => {
            router.events.off('routeChangeStart', getProductOnChangeURL);
        };
    }, [dispatch]);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Shop">
                <div className="ps-page--shop">
                    <div className="container">
                        <ShopBanner />
                        <ShopBrands />
                        <WPShopCategories sidebar={true} />
                        <div className="ps-layout--shop">
                            <div className="ps-layout__left">
                                <Suspense fallback={null}>
                                    <WPWidgetCategories
                                        activeID={query && query.category}
                                    />
                                </Suspense>
                                <WPWidgetBrand />
                                <WPWidgetFilterByPrices />
                            </div>
                            <div className="ps-layout__right">
                                <WPShopProducts sidebar={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};


export default WPShopDefaultPage;
