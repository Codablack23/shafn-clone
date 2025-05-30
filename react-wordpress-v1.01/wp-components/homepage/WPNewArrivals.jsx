import React, { useEffect, useState } from "react";
import Link from "next/link";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPProductHorizontal from "~/wp-components/elements/products/WPProductHorizontal";
import SkeletonProductHorizontal from "~/components/elements/skeletons/SkeletonProductHorizontal";
import axios from "axios";

let productReqSource;
const WPNewArrivals = () => {
    const [productItems, setProductItems] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        const params = {
            pages: 1,
            per_page: 8,
        };
        const categoryQueries = {
            page: 1,
            per_page: 4,
        };
        const WPProducts = await WPProductRepository.getProducts(
            params,
            productReqSource.token
        );
        const WPCategories = await WPProductRepository.getProductCategories(
            categoryQueries
        );
        if (WPProducts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setProductItems(WPProducts.items);
        }
        if (WPCategories) {
            setCategories(WPCategories);
        }
    }

    useEffect(() => {
        productReqSource = axios.CancelToken.source();
        getProducts();

        return () => {
            if (productReqSource) {
                productReqSource.cancel();
            }
        };
    }, []);

    // Views
    let productsView, categoriedView;
    if (categories) {
        categoriedView = categories?.items.map((item) => (
            <li key={item.id}>
                <Link legacyBehavior href={`/shop?category=${item.slug}`}>
                    <a
                        className="ps-document"
                        dangerouslySetInnerHTML={{
                            __html: `${item.name}`,
                        }}></a>
                </Link>
            </li>
        ));
    }
    if (!loading) {
        if (productItems) {
            productsView = productItems.map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 "
                    key={item.id}>
                    <WPProductHorizontal product={item} />
                </div>
            ));
        }
    } else {
        const tempArr = [1, 2, 3, 4, 5, 6, 7, 8];
        productsView = tempArr.map((item) => (
            <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                key={item}>
                <SkeletonProductHorizontal />
            </div>
        ));
    }

    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="">
                    <h3>Hot New Arrivals</h3>
                    {/* <ul className="ps-section__links">
                        {categoriedView}
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul> */}
                </div>
                <div className="ps-section__content">
                    <div className="row">{productsView}</div>
                </div>
            </div>
        </div>
    );
};

export default WPNewArrivals;
