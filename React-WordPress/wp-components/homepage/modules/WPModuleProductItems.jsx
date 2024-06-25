import React from "react";
import { carouselFullwidth } from "~/utilities/carousel-helpers";
import WPProduct from "~/wp-components/elements/products/WPProduct";
import Slider from "react-slick";

const WPModuleProductItems = ({ products }) => {
    return (
        <div
            className="grid grid-cols-2">
            {products.map((product) => (
                <div className="item" key={product.id}>
                    <WPProduct product={product} />
                </div>
            ))}
        </div>
    );
};

export default WPModuleProductItems;
