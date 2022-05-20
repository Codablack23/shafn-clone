import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductsByCategory } from '~/store/product/action';
import { WPGetProducts } from '~/store/wp/action';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import WPWidgetCategories from '~/wp-components/shop/WPWidgetCategories';
import WPWidgetBrand from '~/wp-components/shop/WPWidgetBrand';
import WPWidgetFilterByPrices from '~/wp-components/shop/WPWidgetFilterByPrices';
import WPShopProducts from '~/wp-components/shop/WPShopProducts';
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPShopCategories from '~/wp-components/shop/WPShopCategories';

const WPShopDefaultPage = ({ query }) => {
    const containerRef = useRef(null);
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
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }

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
        <div ref={containerRef}>
            <WPLayout title="Shop">
                <div className="ps-page--shop">
                    <div className="container">
                        <ShopBanner />
                        <ShopBrands />
                        <WPShopCategories sidebar={true} />
                        <div className="ps-layout--shop">
                            <div className="ps-layout__left">
                                <WPWidgetCategories
                                    activeID={query && query.category}
                                />
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

WPShopDefaultPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPShopDefaultPage);
