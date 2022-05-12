import React, { Component } from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialReview from './PartialReview';

function DescView({product}){
    let descView;
    if (product) {
        if (product.description) {
            descView = <div className="ps-document">
                <div dangerouslySetInnerHTML={{
                    __html: `${product.description}`,
                }}>
                </div>
            </div>
        }
    }
    else {
        descView = <p><i>This product hasn't description.</i></p>
    }
    return descView
}
class DefaultDescription extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Description" key="1">
                            <DescView product={this.props.product}/>
                        </TabPane>
                        <TabPane tab="Specification" key="2">
                            <PartialSpecification />
                        </TabPane>
                        <TabPane tab="Reviews (1)" key="4">
                            <PartialReview />
                        </TabPane>
                        <TabPane tab="Questions and Answers" key="5">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DefaultDescription;
