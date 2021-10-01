import React, { useState } from 'react';
import DefaultDescription from '~/components/elements/detail/modules/description/DefaultDescription';
import WPModuleProductDetailThumbnail from '~/wp-components/elements/products/modules/WPModuleProductDetailThumbnail';
import WPModuleProductDetailInformation
    from '~/wp-components/elements/products/modules/WPModuleProductDetailInformation';
import WPModuleDefaultDescription from '~/wp-components/elements/products/modules/WPModuleDefaultDescription';

const WPProductDetail = ({ product, variations }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);

    async function handleChangeSize(newSize) {
        if (newSize !== selectedSize) {
            setSelectedSize(newSize.toLowerCase());
        }
       variations.forEach(item => {
           if (item.attributes.some(attr => attr.option === newSize)) {
               setActiveVariant(item);
           }
        });
    }

    // Views
    let sizesView;

    if (product) {
        if (variations) {
            const WPProductSizes = product.attributes.find(
                (item) => item.name === 'Size',
            );
            if (WPProductSizes) {
                const sizeItems = WPProductSizes.options.map((item, index) => (
                    <div
                        className={`ps-variant ps-variant--size ${
                            selectedSize === item.toLowerCase() && 'active'
                        }`}
                        onClick={(e) => handleChangeSize(item)} key={index}>
                        <span className='ps-variant__size text-uppercase'>
                            {item}
                        </span>
                    </div>
                ));
                sizesView = (
                    <div className='ps-product__variations'>
                        <figure>
                            <figcaption>
                                Size: <strong> Choose an option</strong>
                            </figcaption>
                            {sizeItems}
                        </figure>
                    </div>
                );
            } else {
                sizesView = <p>Size not found.</p>;
            }
        }
    }

    if (!variations) {
        return (
            <div className='ps-product--detail ps-product--fullwidth'>
                <div className='ps-product__header'>
                    <WPModuleProductDetailThumbnail product={product} />
                    <WPModuleProductDetailInformation product={product} />
                </div>
                <WPModuleDefaultDescription />
            </div>
        );
    } else {
        return (
            <div className='ps-product--detail ps-product--fullwidth'>
                <div className='ps-product__header'>
                    <WPModuleProductDetailThumbnail
                        product={product}
                        variant={activeVariant}
                    />
                    <WPModuleProductDetailInformation
                        product={product}
                        variant={activeVariant && activeVariant}>
                        {/*  {colorsView}*/}
                        {sizesView}
                    </WPModuleProductDetailInformation>
                </div>
                <DefaultDescription />
            </div>
        );
    }
};
export default WPProductDetail;
