import React, { useEffect, useState } from "react";
import Link from "next/link";
import WPModuleProductItems from "@/wp-components/homepage/modules/WPModuleProductItems";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import SkeletonProduct from "@/app/components/elements/skeletons/SkeletonProduct";

const WPProductList = ({ categoryID, title }) => {
    const [productItems, setProductItems] = useState(null);
    const [currentCollection, setCurrentCollection] = useState("newArrivals");
    const [loading, setLoading] = useState(true);
    const query = {
        page: 1,
        per_page: 7,
        category: categoryID,
    };

    const sectionLinks = [
        {
            title: "New Arrivals",
            name: "newArrivals",
            params: {
                ...query,
            },
        },
        {
            title: "Best seller",
            name: "bestSeller",
            params: {
                page: 1,
                order: "desc",
                orderby: "price",
                category: categoryID,
            },
        },
        {
            title: "Most Popular",
            name: "mostPopular",
            params: {
                page: 1,
                order: "asc",
                orderby: "title",
                category: categoryID,
            },
        },
    ];

    function handleChangeProduct(e, currentItem, params) {
        e.preventDefault();
        setLoading(true);
        setCurrentCollection(currentItem);
        getSectionProducts(params);
    }

    async function getSectionProducts(queries) {
        let params;
        if (queries) {
            params = queries;
        } else {
            params = query;
        }

        const WPProducts = await WPProductRepository.getProducts(params);
        if (WPProducts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);

            setProductItems(WPProducts.items);
            return WPProducts;
        } else {
            setProductItems(null);
            return null;
        }
    }

    useEffect(() => {
        getSectionProducts();
    }, []);

    const sectionLinksView = sectionLinks.map((link) => (
        <li
            className={currentCollection === link.name ? "active" : ""}
            key={link.name}>
            <a onClick={(e) => handleChangeProduct(e, link.name, link.params)}>
                {link.title}
            </a>
        </li>
    ));

    // views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = <WPModuleProductItems products={productItems} />;
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4, 5, 6];
        const skeletons = tempArr.map((item) => (
            <div className="" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="">{skeletons}</div>;
    }

    return (
        <div className="mx-4">
            <div className="">
                <br />
                <div className="my-4 ps-mobile" style={{marginTop:"64px", paddingBottom: "30px", fontSize:"22px"}}>
                    <h3 className="font-bold ps-container capitalize md:ml-7">{title}</h3>
                    {/* <ul className="ps-section__links">
                        {sectionLinksView}
                        <li>
                            <Link legacyBehavior href={`/shop?category=${categoryID}`}>
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul> */}
                </div>
                <div className="">{productItemsView}</div>
                {/* <div className="ps-section__content">{productItemsView}</div> */}
            </div>
        </div>
    );
};

export default WPProductList;
