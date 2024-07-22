"use client"
import React, { Suspense, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getProductsByCategory } from "~/store/product/action";
import { WPGetProducts } from "~/store/wp/action";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPLayout from "~/wp-components/layouts/WPLayout";
import WPProduct from "~/wp-components/elements/products/WPProduct";
import { generateTempArray, scrollPageToTop } from "~/utilities/common-helpers";
import SkeletonProduct from "~/app/components/elements/skeletons/SkeletonProduct";
import { Pagination } from "antd";
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();

}


export default function WPSearchPage(){
    const searchParams = useSearchParams()
    const paramsKeyword = searchParams.get("keyword")

    const query = {keyword:paramsKeyword}

    const [keyword, setKeyword] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // async function getCategory(id) {
    //     const category = await WPProductRepository.getCategoryByID(id);
    //     if (category) {
    //         setCategoryName(category.name);
    //         return category;
    //     } else {
    //         return null;
    //     }
    // }

    // async function getProductOnChangeURL(url) {
    //     const nextPid = url.split("category=").pop();
    //     if (nextPid !== "" && isNaN(parseInt(nextPid)) === false) {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //             category: nextPid,
    //         };
    //         dispatch(WPGetProducts(queries));
    //     } else {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //         };
    //         dispatch(WPGetProducts(queries));
    //     }
    // }

    async function handlePagination(page, pageSize) {
        if (query && query.keyword) {
            setCurrentPage(page);
            const params = {
                page,
                per_page: pageSize,
                search: query.keyword,
            };

            try {
                const WPProducts = await WPProductRepository.getProducts(
                    params
                );

                if (WPProducts) {
                    setProducts(WPProducts);
                }
            } catch (error) {
                notification["error"]({
                    message: "Unable to get products",
                    description:
                        "Please check your data connection and try again.",
                });
            }
        }
    }

    async function getProductResult() {
        if (query && query.keyword) {
            setKeyword(query.keyword);
            const queries = {
                page: 1,
                per_page: 18,
                search: query.keyword,
            };
            setLoading(true);
            const WPProducts = await WPProductRepository.getProducts(queries);

            if (WPProducts || WPProducts === null) {
                setProducts(WPProducts);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            } else {
                setLoading(false);
            }
        }

        /* router.events.on('routeChangeStart', getProductOnChangeURL);

         return () => {
             router.events.off('routeChangeStart', getProductOnChangeURL);
         };*/
    }

    useEffect(() => {
        getProductResult();
    }, []);

    let productItemView, paginationView, countProductsView;

    if (!loading) {
        if (products && products.items) {
            const productItems = products.items.map((item) => (
                <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={item.id}>
                    <WPProduct product={item} />
                </div>
            ));
            productItemView = <div className="row">{productItems}</div>;

            if (products.totalPages > 1) {
                paginationView = (
                    <div className="pb-40">
                        <Pagination
                            total={products && products.totalItems}
                            pageSize={10}
                            responsive={false}
                            current={currentPage}
                            onChange={handlePagination}
                        />
                    </div>
                );
            }
        } else {
            productItemView = (
                <div className="ps-not-found text-center pt-100 pb-100">
                    {/* <img src="static/img/404.png" className="mb-20" /> */}
                    <h3>No Product Found.</h3>
                </div>
            );
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className="col-lg-4 col-md-4 col-sm-6 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div ref={scrollPageToTop}>
            <WPLayout title="Search Result">
                <div className="ps-page--shop">
                    <div className="container">
                        <section className="ps-search-result">
                            {/* <div className="ps-section__header">
                            <h3>Result for: "{keyword}"</h3>
                        </div> */}
                            <div className="ps-section__content">
                                <Suspense fallback={null}>
                                {productItemView}
                                </Suspense>
                            </div>
                            {paginationView}
                        </section>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

