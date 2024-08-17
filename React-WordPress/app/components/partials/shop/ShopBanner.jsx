
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function ShopBanner(){

    const sliderOptions = {
        perPage:1,
        type:"loop",
        gap:"2em",
        arrows:false,
        height:500,
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
                    <div style={{height:"500px"}}>
                            <img
                                src="/static/img/slider/shop-default/1.jpg"
                                alt="martfury"
                                style={{height:"500px", width:"100%",objectFit:"cover"}}
                            />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                        <img
                            src="/static/img/slider/shop-default/2.jpg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    );
}

