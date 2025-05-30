import React, { Component } from 'react';
import Link from 'next/link';
import { Tabs } from 'antd';
import Slider from 'react-slick';
import Product from '../../../../elements/products/Product';
import ProductHorizontal from '../../../../elements/products/ProductHorizontal';
import { getColletionBySlug } from '../../../../../utilities/product-helper';
import { connect } from 'react-redux';
import { carouselSingle } from '../../../../../utilities/carousel-helpers';

const { TabPane } = Tabs;

class Market3ConsumerElectronics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { categories, collectionSlug } = this.props;
        const products = getColletionBySlug(categories, collectionSlug);
        return (
            <div className="ps-block--product-box">
                <div className="ps-block__header">
                    <h3>
                        <i className="icon-laundry"></i> Consumer Electronic
                    </h3>
                    <ul>
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>TV Televisions</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>Air Conditioner</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>Washing Machine</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>Refrigerator</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/shop">
                                <a>Microwave</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-block__content">
                    <div className="ps-block__left">
                        <Slider {...carouselSingle} className="ps-carousel">
                            <div className="item">
                                <Link legacyBehavior href="/shop">
                                    <a>
                                        <img
                                            src="/static/img/promotions/home-5/electronic-1.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="item">
                                <Link legacyBehavior href="/shop">
                                    <a>
                                        <img
                                            src="/static/img/promotions/home-5/electronic-2.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </Slider>
                        <div className="ps-block__products">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="New Arrivals" key="1">
                                    <div className="row">
                                        {products.map((product, index) => {
                                            if (index < 4) {
                                                return (
                                                    <div
                                                        className="col-md-3 col-sm-4 col-6"
                                                        key={product.id}>
                                                        <Product
                                                            product={product}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </TabPane>
                                <TabPane tab="Best Seller" key="2">
                                    <div className="row">
                                        {products.map((product, index) => {
                                            if (index > 1 && index < 6) {
                                                return (
                                                    <div
                                                        className="col-md-3 col-sm-4 col-6"
                                                        key={product.id}>
                                                        <Product
                                                            product={product}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </TabPane>
                                <TabPane tab="Sale" key="3">
                                    <div className="row">
                                        {products.map((product, index) => {
                                            if (index > 0 && index < 5) {
                                                return (
                                                    <div
                                                        className="col-md-3 col-sm-4 col-6"
                                                        key={product.id}>
                                                        <Product
                                                            product={product}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="ps-block__right">
                        <figure>
                            <figcaption>Recommended For You</figcaption>
                            {products.map((product, index) => {
                                if (index < 5) {
                                    return (
                                        <ProductHorizontal
                                            product={product}
                                            key={product.id}
                                        />
                                    );
                                }
                            })}
                        </figure>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state.collection)(Market3ConsumerElectronics);
