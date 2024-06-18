import React from 'react';

import DefaultDescription from './modules/description/DefaultDescription';
import ThumbnailSidebar from './modules/thumbnail/ThumbnailSidebar';
import InformationSidebar from './modules/information/InformationSidebar';
import product from '../../../public/static/data/product';

const ProductDetailSidebar = () => (
    <div className="ps-product--detail ps-product--fullwidth">
        <div className="ps-product__header">
            <ThumbnailSidebar product={product.extended} />
            <InformationSidebar product={product.extended} />
        </div>
        <DefaultDescription />
    </div>
);

export default ProductDetailSidebar;
