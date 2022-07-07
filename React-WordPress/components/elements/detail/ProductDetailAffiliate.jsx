import React from 'react';

import DefaultDescription from './modules/description/DefaultDescription';
import ThumbnailAffiliate from './modules/thumbnail/ThumbnailAffiliate';
import InformationAffiliate from './modules/information/InformationAffiliate';
import product from '../../../public/static/data/product';

const ProductDetailAffiliate = () => {
    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <ThumbnailAffiliate product={product.sample} />
                <InformationAffiliate product={product.sample} />
            </div>
            <DefaultDescription />
        </div>
    );
};

export default ProductDetailAffiliate;
