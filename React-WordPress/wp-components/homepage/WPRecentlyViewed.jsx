import React, { useEffect, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import WPProductHorizontal from "~/wp-components/elements/products/WPProductHorizontal";
import SkeletonProductHorizontal from "~/app/components/elements/skeletons/SkeletonProductHorizontal";

const WPRecentlyViewed = ({ products }) => {
    let productsView;

    if (products && products.length === 0) {
        productsView = (
            <div className="alert alert-info" role="alert">
                You have not viewed any products yet
            </div>
        );
    } else {
        productsView = products.map((item) => (
            <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                key={item.id}>
                <WPProductHorizontal product={item} />
            </div>
        ));
    }

    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>Recently Viewed</h3>
                </div>
                <div className="ps-section__content">
                    <div className="row">{productsView}</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.recentlyViewedProducts;
};

export default connect(mapStateToProps)(WPRecentlyViewed);
