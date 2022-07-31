import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import WPProductDetail from "~/wp-components/elements/products/WPProductDetail";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPHeaderProduct from "~/wp-components/shared/headers/WPHeaderProduct";
import WPRelatedProducts from "~/wp-components/product/WPRelatedProducts";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import WPWidgetProductsSameBrand from "~/wp-components/product/WPWidgetProductsSameBrand";
import WPProductWidgets from "~/wp-components/product/WPProductWidgets";
import WPLayoutProductDetail from "~/wp-components/layouts/WPLayoutProductDetail";
import WPHeaderDefault from "~/wp-components/shared/headers/WPHeaderDefault";

import { addRecentlyViewedProduct } from "~/store/recently-viewed-products/action";
import { scrollPageToTop } from "~/utilities/common-helpers";

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [productVariations, setProductVariations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState(null);

    // Get your product by ID from API
    async function getProduct(productID) {
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
            await router.push("/page/page-404", "/404");
        }
        return WPProduct;
    }

    async function getProductOnChangeURL(url) {
        const nextPid = url.split("-").pop();
        if (nextPid !== "" && isNaN(parseInt(nextPid)) === false) {
            setLoading(true);
            await getProduct(nextPid);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isNaN(pid)) {
            Router.push("/page/page-404");
        }

        if (pid) {
            const collectionsParams = [
                "customer_bought",
                "shop-recommend-items",
                "widget_same_brand",
            ];
            getProduct(pid)
                .then((res) => dispatch(addRecentlyViewedProduct(res)))
                .catch((err) => console.log(err));
        }

        router.events.on("routeChangeStart", getProductOnChangeURL);

        return () => {
            router.events.off("routeChangeStart", getProductOnChangeURL);
        };
    }, []);

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
            />
        );
        widgetView = (
            <WPProductWidgets product={product}>
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
            <Head>
                {product && (
                    <>
                        <meta property="og:title" content={product.name} />
                        <meta property="og:type" content="product" />
                        <meta
                            property="og:image"
                            content={product.images[0].src}
                        />
                        <meta
                            property="og:url"
                            content={window.location.href}
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                    </>
                )}
            </Head>
            <WPLayoutProductDetail
                title={product ? product.name : "Loading..."}>
                <WPHeaderDefault />
                <div className="ps-page--product mt-3">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <div className="ps-page__left">{productView}</div>
                            <div className="" style={{ width: "100%" }}>
                                {widgetView}
                            </div>
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

WPProductDetailPage.getInitialProps = async ({ query }) => {
    let product_id = query.pid.split("-").pop();

    return { pid: product_id };
};

export default connect()(WPProductDetailPage);
