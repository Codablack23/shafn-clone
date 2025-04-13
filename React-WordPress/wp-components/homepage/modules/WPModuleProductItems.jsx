import React from "react";
import { carouselFullwidth } from "@/utilities/carousel-helpers";
import WPProduct from "@/wp-components/elements/products/WPProduct";
import Slider from "react-slick";

const WPModuleProductItems = ({ products }) => {
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? "16px" : "80px";
    const gridCol = isMobile ? "1fr 1fr" : "1fr 1fr 1fr"

    return (
        <div style={{maxWidth: "900px", margin:"auto",display:"grid", gridTemplateColumns: gridCol, gap: gap }}  >
            {products.map((product) => (
                <div className="" key={product.id}>
                    <WPProduct product={product} /> 
                </div>
            ))}
        </div>
    );
};

export default WPModuleProductItems;
