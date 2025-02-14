import React from "react";
import { carouselFullwidth } from "@/utilities/carousel-helpers";
import WPProduct from "@/wp-components/elements/products/WPProduct";
import Slider from "react-slick";

const WPModuleProductItems = ({ products }) => {
    return (
        <div style={{maxWidth: "550px", margin:"auto",display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px"}}>
            {products.map((product) => (
                <div className="" key={product.id}>
                    <WPProduct product={product} /> 
                </div>
            ))}
        </div>
    );
};

export default WPModuleProductItems;
