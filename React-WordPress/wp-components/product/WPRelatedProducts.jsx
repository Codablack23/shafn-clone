import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { carouselFullwidth } from '@/utilities/carousel-helpers';
import WPProductSelf from '@/wp-components/elements/products/WPProductSelf';
import WPRelatedProduct from '../elements/products/WPRelatedProduct';

const WPRelatedProducts = ({ products }) => {
    const ref = useRef(null)
    let productItems;
    if (products) {
        productItems = products.map((item) => (
            // <div className="slide-item" key={item}>
                <SplideSlide>
                    <WPRelatedProduct productID={item} />
                </SplideSlide>
            // </div>
        ));
    }

    return (
        <div className={`ps-section--default ps-related-products `}>
            <div className="ps-section__header">
                <h3>Related products</h3>
            </div>
            <Splide
            ref={ref}
            aria-label="My Favorite Images"
            options={{
                perPage:products.length < 7?products.length:7,
                type:"loop",
                rewind:true,
                breakpoints:{
                    960:{
                        perPage:3
                    },
                    600:{
                        perPage:1,
                        arrows:null
                    }
                }
            }}>
                {productItems}
            </Splide>
            {/* <div className="ps-section__content"> */}
                {/* <Slider
                    {...carouselFullwidth}
                    infinite={products && products.length < 7 ? false : true}
                    className="ps-carousel">
                    {productItems}
                </Slider> */}
            {/* </div> */}
        </div>
    );
};

export default WPRelatedProducts;
