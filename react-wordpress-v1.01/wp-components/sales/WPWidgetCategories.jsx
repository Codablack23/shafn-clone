import React, { useEffect, useState } from "react";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import { serializeQuery } from "~/repositories/Repository";
import Link from "next/link";
import Spiner from "~/components/elements/common/Spiner";
import SkeletonWidgetBrands from "~/components/elements/skeletons/SkeletonWidgetBrands";
import { Categories } from "~/components/shared/navigation/categories";
import { Collapse } from "antd";

const WPWidgetCategories = ({ activeID, page }) => {
    const [loading, setLoading] = useState(true);
    const [categoryItems, setCategoryItems] = useState(null);
    async function getCategoryItems() {
        const queries = {
            pages: 1,
            per_page: 99,
        };
        const categories = await WPProductRepository.getProductCategories(
            queries
        );
        if (categories) {
            setTimeout(function () {
                setLoading(false);
            }, 500);
            setCategoryItems(categories.items);
        }
        return categories;
    }

    useEffect(() => {
        getCategoryItems();
    }, []);

    // let categoryItemsView;
    // if (categoryItems && categoryItems.length > 0 && !loading) {
    //     const items = categoryItems.map((item) => (
    //         <li key={item.id}>
    //             <Link legacyBehavior href={`/shop?category=${item.id}`}>
    //                 <a
    //                     className={
    //                         activeID === item.id.toString() ? 'active' : ''
    //                     }
    //                     dangerouslySetInnerHTML={{
    //                         __html: `${item.name}`,
    //                     }}></a>
    //             </Link>
    //         </li>
    //     ));
    //     categoryItemsView = (
    //         <ul className="ps-list--categories">
    //             <li>
    //                 <Link legacyBehavior href="/shop">
    //                     <a className={activeID === undefined ? 'active' : ''}>
    //                         All
    //                     </a>
    //                 </Link>
    //             </li>
    //             {items}
    //         </ul>
    //     );
    // } else {
    //     categoryItemsView = <SkeletonWidgetBrands />;
    // }
    const { Panel } = Collapse;

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            <div>
                <div style={{ marginLeft: 10, marginBlock: 10 }}>
                    <Link legacyBehavior href="/shop">
                        <a
                            className={
                                activeID === undefined
                                    ? "ml-2 mt-4 mb-4 w3-text-black"
                                    : ""
                            }>
                            All
                        </a>
                    </Link>
                </div>
                <Collapse
                    ghost
                    expandIconPosition="end"
                    style={{ marfinLeft: 0 }}>
                    {Categories.map((c, i) => (
                        <Panel
                            style={{ paddingLeft: "0px" }}
                            header={<b>{c.name}</b>}
                            key={`${c.name}-${i + 1}`}>
                            {c.sub_cat.map((sc, i) => (
                                <div key={sc.title}>
                                    <p className="w-text-black">
                                        <b>{sc.title}</b>
                                    </p>
                                    {sc.categories.map((sub_c) => {
                                        const cat = categoryItems
                                            ? categoryItems.find(
                                                  ({ name }) =>
                                                      name
                                                          .replace("&amp;", "&")
                                                          .toLowerCase()
                                                          .trim() ==
                                                      sub_c.name
                                                          .toLowerCase()
                                                          .trim()
                                              )
                                            : "";
                                        const cat_id = cat ? cat.id : "";
                                        return  (
                                            <Link legacyBehavior
                                                href={`/${page}?category=${cat_id}`}
                                                key={
                                                    Math.random() *
                                                    Math.random()
                                                }>
                                                <a
                                                    className={`d-block mt-2 mb-2 ${
                                                        parseInt(activeID) ===
                                                        cat_id
                                                            ? "w3-text-orange"
                                                            : ""
                                                    }`}>
                                                    {sub_c.name}
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </div>
                            ))}
                        </Panel>
                    ))}
                </Collapse>
            </div>
            {/* {categoryItemsView} */}
        </aside>
    );
};

export default WPWidgetCategories;
