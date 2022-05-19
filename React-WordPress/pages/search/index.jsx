import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getProductsByCategory } from '~/store/product/action';
import { WPGetProducts } from '~/store/wp/action';
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPProduct from '~/wp-components/elements/products/WPProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

const WPSearchPage = ({ query }) => {
    const containerRef = useRef(null);
    const [keyword, setKeyword] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(null);

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
        } else {
            const queries = {
                page: 1,
                per_page: 18,
            };
            dispatch(WPGetProducts(queries));
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
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);

        getProductResult();
    }, []);

    let productItemView, countProductsView;

    if (!loading) {
        if (products && products.items) {
            const productItems = products.items.map((item) => (
                <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={item.id}>
                    <WPProduct product={item} />
                </div>
            ));
            productItemView = <div className="row">{productItems}</div>;
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
        <div ref={containerRef}>
            <WPLayout title="Search Result">
                <div className="ps-page--shop">
                    <div className="container">
                        <section className="ps-search-result">
                            {/* <div className="ps-section__header">
                            <h3>Result for: "{keyword}"</h3>
                        </div> */}
                            <div className="ps-section__content">
                                {productItemView}
                            </div>
                        </section>
                    </div>
                </div>
            </WPLayout>
        </div>
    );
};

WPSearchPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPSearchPage);
