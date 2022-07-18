import React, { useState } from "react";
import DefaultDescription from "~/components/elements/detail/modules/description/DefaultDescription";
import WPModuleProductDetailThumbnail from "~/wp-components/elements/products/modules/WPModuleProductDetailThumbnail";
import WPModuleProductDetailInformation from "~/wp-components/elements/products/modules/WPModuleProductDetailInformation";
import WPModuleDefaultDescription from "~/wp-components/elements/products/modules/WPModuleDefaultDescription";

const WPProductDetail = ({ product, variations }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);

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

    function handleAttributeChange(newOption) {
        variations.forEach((item) => {
            if (item.attributes.some((attr) => attr.option === newOption)) {
                setActiveVariant(item);
            }
        });
    }

    // Views
    let colorsView;
    let attributesView;

    if (product) {
        if (variations) {
            // Colors View
            const WPProductColors = product.attributes.find(
                (item) => item.name === "Color"
            );

            if (WPProductColors) {
                const colorItems = WPProductColors.options.map((item) => (
                    <div
                        key={item}
                        className={`ps-variant ps-variant--size w3-circle ${
                            selectedColor === item.toLowerCase() && "active"
                        }`}
                        style={{
                            backgroundColor: item.toLowerCase(),
                            borderRadius: 20,
                        }}
                        onClick={() => handleChangeColor(item)}
                    />
                ));

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

            // Attributes View

            const variationAttributes = product.attributes.filter(
                (attribute) => attribute.name !== "Color" && attribute.variation
            );

            attributesView = variationAttributes.map((attribute) => (
                <div className="ps-product__variations">
                    <figure>
                        <p className="text-center text-lg-left">
                            {attribute.name}
                        </p>

                        <div className="rounded-pill m-auto m-lg-0 custom--select">
                            <select
                                onChange={(e) => {
                                    handleAttributeChange(e.target.value);
                                }}>
                                {attribute.options.map((option) => (
                                    <option
                                        key={option}
                                        className="ps-variant ps-variant--size">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </figure>
                </div>
            ));
        }
    }

    if (!variations) {
        return (
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="ps-product__header">
                    <WPModuleProductDetailThumbnail product={product} />
                    <WPModuleProductDetailInformation product={product} />
                </div>
                <WPModuleDefaultDescription product={product} />
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
                            {attributesView}
                        </>
                    </WPModuleProductDetailInformation>
                </div>
                <DefaultDescription product={product} />
            </div>
        );
    }
};
export default WPProductDetail;
