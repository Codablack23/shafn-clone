import React, { useEffect } from "react";
import DefaultDescription from "~/components/elements/detail/modules/description/DefaultDescription";
import WPModuleProductDetailThumbnail from "~/wp-components/elements/products/modules/WPModuleProductDetailThumbnail";
import WPModuleProductDetailInformation from "~/wp-components/elements/products/modules/WPModuleProductDetailInformation";
import WPModuleDefaultDescription from "~/wp-components/elements/products/modules/WPModuleDefaultDescription";

const WPProductDetail = ({
    product,
    variations,
    activeVariant,
    setActiveVariant,
}) => {
    function handleAttributeChange(newOption) {
        variations.forEach((item) => {
            if (item.attributes.some((attr) => attr.option === newOption)) {
                setActiveVariant(item);
            }
        });
    }
    let attributesView;

    if (product) {
        if (variations) {
            const variationAttributes = product.attributes.filter(
                (attribute) => attribute.variation
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

    useEffect(() => {
        if (product) {
            if (variations) {
                const variationAttributes = product.attributes.filter(
                    (attribute) => attribute.variation
                );

                const firstAttributeOption = variationAttributes[0]?.options[0];
                if (firstAttributeOption) {
                    handleAttributeChange(firstAttributeOption);
                }
            }
        }
    }, []);

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
                        variations={variations}
                        variant={activeVariant && activeVariant}>
                        {attributesView}
                    </WPModuleProductDetailInformation>
                </div>
                <DefaultDescription product={product} />
            </div>
        );
    }
};
export default WPProductDetail;
