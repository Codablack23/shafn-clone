import React, { useState } from 'react';
import DefaultDescription from '~/components/elements/detail/modules/description/DefaultDescription';
import WPModuleProductDetailThumbnail from '~/wp-components/elements/products/modules/WPModuleProductDetailThumbnail';
import WPModuleProductDetailInformation from '~/wp-components/elements/products/modules/WPModuleProductDetailInformation';
import WPModuleDefaultDescription from '~/wp-components/elements/products/modules/WPModuleDefaultDescription';

const WPProductDetail = ({ product, variations }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);

    function handleChangeSize(newSize) {
        if (newSize !== selectedSize) {
            setSelectedSize(newSize.toLowerCase());
        }
        variations.forEach((item) => {
            if (item.attributes.some((attr) => attr.option === newSize)) {
                setActiveVariant(item);
            }
        });
    }
    function handleChangeColor(newColor) {
        if (newColor !== selectedColor) {
            setSelectedColor(newColor.toLowerCase());
        }
        variations.forEach((item) => {
            if (item.attributes.some((attr) => attr.option === newColor)) {
                setActiveVariant(item);
            }
        });
    }

    // Views
    let sizesView;
    let colorsView;

    if (product) {
        if (variations) {
            // Sizes View
            const WPProductSizes = product.attributes.find(
                (item) => item.name === 'Size'
            );

            if (WPProductSizes) {
                const sizeItems = WPProductSizes.options.map((item, index) => (
                    <option
                       value={item.toLowerCase()}
                        className={`ps-variant ps-variant--size ${
                            selectedSize === item.toLowerCase() && 'active'
                        }`}
                        onClick={(e) => handleChangeSize(item)}
                        key={index}>
                            {item}
                    </option>
                ));
                sizesView = (
                    <div className="ps-product__variations">
                        <figure>
                            <p className='text-center text-lg-left'>Size</p>
                            <div className="rounded-pill m-auto m-lg-0 custom--select"
                        
                            >
                            <select 
                            value={selectedSize}
                            onChange={(e)=>{handleChangeSize(e.target.value)}}
                            >
                                {sizeItems}
                            </select>
                            </div>
                         
                        </figure>
                    </div>
                );
            } else {
                sizesView = <p>Size not found.</p>;
            }

            // Colors View
            const WPProductColors = product.attributes.find(
                (item) => item.name === 'Color'
            );

            if (WPProductColors) {
                const colorItems = WPProductColors.options.map(
                    (item, index) => (
                        <div
                            className={`ps-variant ps-variant--size w3-circle ${
                                selectedColor === item.toLowerCase() && 'active'
                            }`}
                            style={{
                                backgroundColor: item.toLowerCase(),
                                borderRadius: 20,
                            }}
                            onClick={(e) => handleChangeColor(item)}
                            key={index}>
                            {/* <span
                                className="ps-variant__size text-uppercase">
                                {item}
                            </span> */}
                        </div>
                    )
                );

                colorsView = (
                    <div className="ps-product__variations">
                        <figure>
                            <figcaption>Color</figcaption>
                            {colorItems}
                        </figure>
                    </div>
                );
            } else {
                colorsView = <p>Color not found</p>;
            }
        }
    }

    if (!variations) {
        return (
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="ps-product__header">
                    <WPModuleProductDetailThumbnail product={product} />
                    <WPModuleProductDetailInformation product={product} />
                </div>
                <WPModuleDefaultDescription product={product}/>
            </div>
        );
    } else {
        return (
            <div
                className="ps-product--detail ps-product--fullwidth"
                style={{ paddingBottom: 0 }}>
                <div className="ps-product__header">
                    <WPModuleProductDetailThumbnail
                        product={product}
                        variant={activeVariant}
                    />
                    <WPModuleProductDetailInformation
                        product={product}
                        variant={activeVariant && activeVariant}>
                        <>
                            {colorsView}
                            {sizesView}
                        </>
                    </WPModuleProductDetailInformation>
                </div>
                <DefaultDescription product={product}/>
            </div>
        );
    }
};
export default WPProductDetail;
