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
    //             <Link href={`/shop?category=${item.id}`}>
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
    //                 <Link href="/shop">
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
        <aside className="widget widget_shop font-poppins">
            <h4 className="font-bold mb-4" style={{textTransform:"uppercase"}}>Categories</h4><br />
            <div>
                <div style={{ marginLeft: 10, marginBlock: 10 }}>
                    <Link href="/shop">
                        <a
                            className={
                                activeID === undefined
                                    ? "ml-2 mt-4 mb-4 font-bold w3-text-black"
                                    : "ml-2 mt-4 mb-4 font-bold"
                            }>
                            All
                        </a>
                    </Link>
                </div>
                <Collapse
                    ghost
                    expandIconPosition="right"
                    style={{ marfinLeft: 0 }}>
                    {Categories.map((c, i) => (
                        <Panel
                            style={{ padding: "0px",marginBottom:"6px" }}
                            header={<b className="m-0">{c.name}</b>}
                            key={`${c.name}-${i + 1}`}>
                            {c.sub_cat.map((sc, i) => (
                                <div key={sc.title} style={{marginBottom:"8px"}}>
                                    <p className="w-text-black" style={{marginBottom:-5,color:"black"}}>
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
                                        return (
                                            <Link
                                                href={`/${page}?category=${cat_id}`}
                                                key={
                                                    Math.random() *
                                                    Math.random()
                                                }>
                                                <a
                                                    className={`d-block category-link font-bold mt-2 mb-2 ${
                                                        parseInt(activeID) ===
                                                        cat_id
                                                            ? "active"
                                                            : ""
                                                    }`}>
                                                    {sub_c.name}
                                                </a>
                                            </Link>
                                        );
                                    })}
                                    <br />
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
