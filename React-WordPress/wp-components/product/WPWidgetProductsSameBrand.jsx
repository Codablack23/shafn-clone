import React from 'react';
import WPProductSelf from '~/wp-components/elements/products/WPProductSelf';

const WPWidgetProductsSameBrand = ({ products }) => {
    let productItemsView;
    if (products) {
        productItemsView = products.map((item, index) => {
            if (index < 2) {
                return <div style={{maxWidth:250}}>
                    <WPProductSelf productID={item} key={index} />
                </div>;
            }
        });
    } else {
        productItemsView = <p>No product found.</p>;
    }
    return (
        <aside className="widget widget_same-brand d-none d-lg-block" style={{border:"none"}}>
            <h3 className='text-center bg-white'>Same Brand</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WPWidgetProductsSameBrand;
