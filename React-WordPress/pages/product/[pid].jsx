import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import WPProductDetail from '~/wp-components/elements/products/WPProductDetail';
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import WPHeaderProduct from '~/wp-components/shared/headers/WPHeaderProduct';
import WPRelatedProducts from '~/wp-components/product/WPRelatedProducts';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import WPWidgetProductsSameBrand from '~/wp-components/product/WPWidgetProductsSameBrand';
import WPProductWidgets from '~/wp-components/product/WPProductWidgets';
import WPLayoutProductDetail from '~/wp-components/layouts/WPLayoutProductDetail';
import WPHeaderDefault from '~/wp-components/shared/headers/WPHeaderDefault';

import { addRecentlyViewedProduct } from '~/store/recently-viewed-products/action';

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const containerRef = useRef(null);

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
                    // console.log('Product::', WPProduct);
                    // console.log('Variations::', WPPRroductVariations);
                    setProductVariations(WPPRroductVariations);
                }
            }

            /* NOTE: This throws an error when uncommented */
            // setTimeout(
            //     function () {
            //         setLoading(false);
            //     }.bind(this),
            //     250
            // );
        } else {
            await router.push('/page/page-404', '/404');
        }
        return WPProduct;
    }

    async function getProductOnChangeURL(url) {
        const nextPid = url.split('/').pop();
        if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
            setLoading(true);
            await getProduct(nextPid);
        }
    }

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }

        if (isNaN(pid)) {
            Router.push('/page/page-404');
        }

        if (pid) {
            const collectionsParams = [
                'customer_bought',
                'shop-recommend-items',
                'widget_same_brand',
            ];
            getProduct(pid)
                .then((res) => dispatch(addRecentlyViewedProduct(res)))
                .catch((err) => console.log(err));
        }

        router.events.on('routeChangeStart', getProductOnChangeURL);

        return () => {
            router.events.off('routeChangeStart', getProductOnChangeURL);
        };
    }, []);

    // View area
    let productView, headerView;
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
    }

    return (
        <div ref={containerRef}>
            <WPLayoutProductDetail
                title={product ? product.name : 'Loading...'}>
                <WPHeaderDefault />
                <div className="ps-page--product">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <div className="ps-page__left">{productView}</div>
                            <div className="" style={{ width: '100%' }}>
                                <WPProductWidgets product={product}>
                                    <WPWidgetProductsSameBrand
                                        products={relatedProducts}
                                        isVariant={true}
                                        product
                                    />
                                </WPProductWidgets>
                            </div>
                        </div>
                        <WPRelatedProducts products={relatedProducts} />
                    </div>
                </div>
            </WPLayoutProductDetail>
        </div>
    );
};

WPProductDetailPage.getInitialProps = async ({ query }) => {
    let product_id = query.pid.split('-').pop();

    return { pid: product_id };
};

export default connect()(WPProductDetailPage);
