import React from "react";
import { carouselFullwidth } from "~/utilities/carousel-helpers";
import WPProduct from "~/wp-components/elements/products/WPProduct";
import Slider from "react-slick";

const WPModuleProductItems = ({ products }) => {
    return (
        <div
            style={{maxWidth:"500px",gap:"14px",marginBottom:"80px"}}
            className="flex gap-2 max-w-[400px] justify-center items-center mx-auto">
            {products.map((product) => (
                <div className="" key={product.id}>
                    <WPProduct product={product} /> 
                </div>
            ))}
        </div>
    );
};

export default WPModuleProductItems;
