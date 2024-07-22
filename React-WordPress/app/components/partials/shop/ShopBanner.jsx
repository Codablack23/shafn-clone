
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function ShopBanner(){

    const sliderOptions = {
        perPage:1,
        type:"loop",
        gap:"2em",
        arrows:false,
        interval:10000,
        speed:500,
        autoplay:true,
        pagination:true,
        rewind:true,
    }
    return (
        <div className="ps-shop-banner">
            <Splide aria-label="My Favorite Images" options={sliderOptions}>
                <SplideSlide>
                    <img
                        src="/static/img/slider/shop-default/1.jpg"
                        alt="martfury"
                    />
                </SplideSlide>
                <SplideSlide>
                    <img
                        src="/static/img/slider/shop-default/2.jpg"
                        alt="martfury"
                    />
                </SplideSlide>
            </Splide>
        </div>
    );
}

