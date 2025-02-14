"use client";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Router, { useRouter } from "next/navigation";
import WPProductDetail from "@/wp-components/elements/products/WPProductDetail";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import WPHeaderProduct from "@/wp-components/shared/headers/WPHeaderProduct";
import WPRelatedProducts from "@/wp-components/product/WPRelatedProducts";
import SkeletonProductDetail from "@/app/components/elements/skeletons/SkeletonProductDetail";
import WPWidgetProductsSameBrand from "@/wp-components/product/WPWidgetProductsSameBrand";
import WPProductWidgets from "@/wp-components/product/WPProductWidgets";
import WPLayoutProductDetail from "@/wp-components/layouts/WPLayoutProductDetail";
import WPHeaderDefault from "@/wp-components/shared/headers/WPHeaderDefault";
import WPModuleDefaultDescription from "@/wp-components/elements/products/modules/WPModuleDefaultDescription";


import { addRecentlyViewedProduct } from "@/store/recently-viewed-products/action";
import { scrollPageToTop } from "@/utilities/common-helpers";

//make this function a default export
// do it like this
// export default function WPProductDetailPage({pid}){
export default function WPProductDetailPage({ params }){
    // const dispatch = useDispatch()
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [productVariations, setProductVariations] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState(null);

    const slugs = params.pid.split("-");
    const pid = slugs[slugs.length - 1];
    // Get your product by ID from API
    async function getProduct(productID) {
        // console.log(productID)
        const WPProduct = await WPProductRepository.getProductByID(productID);
        if (WPProduct) {
            // Get related product data
            if (WPProduct.related_ids) {
                setRelatedProducts(WPProduct.related_ids);
            }
            setProduct(WPProduct);
            if (WPProduct.variations.length > 0) {
                // Get variants
                const WPPRroductVariations =
                    await WPProductRepository.getProductVariantsByID(productID);

                if (WPPRroductVariations) {
                    setProductVariations(WPPRroductVariations);
                }
            }

            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            // router.push("/page/page-404", "/404");
        }
        console.log(WPProduct)
        return WPProduct;
    }

    // async function getProductOnChangeURL(url) {
    //     const isProductRoute = url.includes("/product/");
    //     const nextPid = url.split("-").pop();
    //     if (
    //         isProductRoute &&
    //         nextPid !== "" &&
    //         isNaN(parseInt(nextPid)) === false
    //     ) {
    //         setLoading(true);
    //         await getProduct(nextPid);
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        console.log(pid);
        if (pid) {
            getProduct(parseInt(pid))
        }

    }, [router]);

    // View area
    let productView, headerView, widgetView;
    if (loading || product === null) {
        headerView = <WPHeaderDefault />;
        productView = <SkeletonProductDetail />;
    } else {
        headerView = <WPHeaderProduct product={product} />;
        productView = (
            <WPProductDetail
                product={product}
                variations={productVariations && productVariations}
                activeVariant={activeVariant}
                setActiveVariant={setActiveVariant}
            />
        );
        widgetView = (
            <WPProductWidgets product={product} variant={activeVariant}>
                {relatedProducts && relatedProducts.length > 0 && (
                    <WPWidgetProductsSameBrand
                        products={relatedProducts}
                        isVariant={true}
                        product
                    />
                )}
            </WPProductWidgets>
        );
    }

    return (
        <div ref={scrollPageToTop}>
            <WPLayoutProductDetail
                title={product ? product.name : "Loading..."}>
                <WPHeaderDefault />
                <div className="ps-page--product mt-3">
                    <div className="ps-container">
                        <div className="row">
                            <div className="col-lg-8">{productView}</div>
                            <div className="col-lg-4" style={{ width: "100%" }}>
                                {widgetView}
                            </div>
                        </div>
                        <div className="d-lg-none">
                        <WPModuleDefaultDescription product={product}/>
                        </div>
                        {relatedProducts && relatedProducts.length > 0 && (
                            <WPRelatedProducts products={relatedProducts} />
                        )}
                    </div>
                </div>
            </WPLayoutProductDetail>
        </div>
    );
};
// delete this on every page
