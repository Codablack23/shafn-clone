import React from "react";
import { carouselFullwidth } from "~/utilities/carousel-helpers";
import WPProduct from "~/wp-components/elements/products/WPProduct";
import Slider from "react-slick";
import { ErrorBoundary } from "react-error-boundary";

const WPModuleProductItems = ({ products }) => {
    const handleUIError = (error, info) => {
        console.error(error);
        console.log(info);
    };

    return (
        <Slider
            {...carouselFullwidth}
            infinite={products.length > 7 ? true : false}
            className="ps-carousel outside">
            {products.map((product) => (
                <ErrorBoundary onError={handleUIError}>
                    <div className="item" key={product.id}>
                        <WPProduct product={product} />
                    </div>
                </ErrorBoundary>
            ))}
        </Slider>
    );
};

export default WPModuleProductItems;
