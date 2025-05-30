import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Slider from 'react-slick';

import Product from '../../../../elements/products/Product';
import { carouselStandard } from '../../../../../utilities/carousel-helpers';
import { getColletionBySlug } from '../../../../../utilities/product-helper';

class Market2ConsumerElectronics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { categories, collectionSlug } = this.props;
        const products = getColletionBySlug(categories, collectionSlug);
        return (
            <section className="ps-product-list">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Consumer Electronics</h3>
                        <ul className="ps-section__links">
                            <li>
                                <Link legacyBehavior href="/shop">
                                    <a>New Arrivals</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="/shop">
                                    <a>Best seller</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="/shop">
                                    <a>Must Popular</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="/shop">
                                    <a>View All</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">
                        <Slider
                            {...carouselStandard}
                            className="ps-carousel outside">
                            {products.map(product => (
                                <div className="item" key={product.id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(state => state.collection)(Market2ConsumerElectronics);
