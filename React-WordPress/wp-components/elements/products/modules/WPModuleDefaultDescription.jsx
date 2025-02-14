import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import PartialSpecification from "@/app/components/elements/detail/modules/description/PartialSpecification";
import PartialReview from "@/app/components/elements/detail/modules/description/PartialReview";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import axios from "axios";

const { TabPane } = Tabs;
let reviewSource;
const WPModuleDefaultDescription = ({ product }) => {
    const [reviews, setReviews] = useState([]);

    function expandDesc(e) {
        const desc = document.querySelector("#desc");
        if (desc.style.maxHeight) {
            desc.style.maxHeight = null;
            e.target.innerText = "Read More";
        } else {
            desc.style.maxHeight = "500px";
            e.target.innerText = "Show Less";
        }
    }
    let descView;
    if (product) {
        if (product.description) {
            descView = (
                <div className="ps-document">
                    <div
                        id="desc"
                        className="ps__desc-md"
                        dangerouslySetInnerHTML={{
                            __html: `${product.description}`,
                        }}></div>
                    <span onClick={expandDesc} className="ps__read-more">
                        Read More
                    </span>
                </div>
            );
        }
    } else {
        descView = (
            <p>
                <i>This product hasn't description.</i>
            </p>
        );
    }

    async function getReviews() {
        const product_id = window.location.pathname.split("-").pop();
        const reviews = await WPProductRepository.getReviews(
            reviewSource.token
        );

        if (reviews) {
            const product_reviews = reviews.filter(
                (r) => r.product_id.toString() === product_id.toString()
            );
            setReviews(product_reviews);
        }
    }

    useEffect(() => {
        reviewSource = axios.CancelToken.source();
        getReviews();
        return () => {
            if (reviewSource) {
                reviewSource.cancel();
            }
        };
    }, []);

    const tabStyle = {marginBottom:0}
    return (
        <div className="font-poppins">
            <div className="ps-product__content ps-tab-root">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<p className="font-bold" style={tabStyle}>Description</p>} key="1">
                        {descView}
                    </TabPane>
                    <TabPane tab={<p className="font-bold" style={tabStyle}>Specification</p>} key="2">
                        <PartialSpecification
                            attributes={product?.attributes}
                        />
                    </TabPane>
                    <TabPane tab={<p className="font-bold" style={tabStyle}>Reviews({reviews.length})</p>} key="4">
                        <PartialReview />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default WPModuleDefaultDescription;
