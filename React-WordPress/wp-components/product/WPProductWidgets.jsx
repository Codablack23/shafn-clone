import React from "react";
// import Link from "next/link";
import WPModuleProductInformation from "../../wp-components/elements/products/modules/WPModuleProductInformation";
// import { connect } from "react-redux";
// import {
//     WPProductDetailBrandView,
//     WPProductDetailCategoriesView,
//     WPProductDetailRatingView,
//     WPProductDetailShortDescView,
//     WPProductDetailTagsView,
// } from "~/utilities/WPHelpers";

const WPProductWidgets = ({ product, variant, children }) => {
    return (
        <section>
            {/* <aside className="widget widget_product widget_features">
                <p>
                    <i className="icon-network"></i> Shipping worldwide
                </p>
                <p>
                    <i className="icon-3d-rotate"></i> Free 7-day return if
                    eligible, so easy
                </p>
                <p>
                    <i className="icon-receipt"></i> Supplier give bills for this
                    product.
                </p>
                <p>
                    <i className="icon-credit-card"></i> Pay online or when
                    receiving goods
                </p>
            </aside>
            <aside className="widget widget_sell-on-site">
            </aside> */}
            <WPModuleProductInformation
                product={product}
                variant={variant}
                isWidget
            />

            {/* <aside className="widget widget_ads">
                <Link href="/shop">
                    <a>
                        <img src="/static/img/ads/product-ads.png" alt="shafn" />
                    </a>
                </Link>
            </aside> */}

            {children}
        </section>
    );
};

export default WPProductWidgets;
