import React, { Component } from "react";

import { Tabs } from "antd";
const { TabPane } = Tabs;

import PartialDescription from "./PartialDescription";
import PartialSpecification from "./PartialSpecification";
import PartialReview from "./PartialReview";
import WPProductRepository from "~/repositories/WP/WPProductRepository";

function DescView({ product }) {
    let descView;
    if (product && product.description) {
        descView = (
            <div className="ps-document">
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${product.description}`,
                    }}></div>
            </div>
        );
    } else {
        descView = (
            <p>
                <i>This product has no description.</i>
            </p>
        );
    }
    return descView;
}

class DefaultDescription extends Component {

    constructor(props) {
        super(props);
    }
    state = {
     product_reviews:[]   
    }
    async getReviews(){
        const product_id = window.location.pathname.split("-").pop();
        const reviews = await WPProductRepository.getReviews()
        this.setState({
            product_reviews:reviews.filter(r=>r.product_id.toString() === product_id.toString())
        })
    }
    componentDidMount(){
        this.getReviews()
    }
    render() {
        return (
            <div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Description" key="1">
                            <DescView product={this.props.product} />
                        </TabPane>
                        <TabPane tab="Specification" key="2">
                            <PartialSpecification
                                attributes={this.props.product.attributes}
                            />
                        </TabPane>
                        <TabPane tab={`Reviews(${this.state.product_reviews.length})`} key="3">
                            <PartialReview />
                        </TabPane>
                        <TabPane tab="Questions and Answers" key="4">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DefaultDescription;
