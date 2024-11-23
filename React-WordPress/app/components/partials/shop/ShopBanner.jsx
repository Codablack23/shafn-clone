
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
                    <p className="absolute bottom-0 ml-14 mb-16 py-14 px-24 text-white font-bold text-6xl bg-[#50B2D0] shadow-xl shadow-[#3b5e69] rounded-3xl" >Shop Now</p>
                     <p className="absolute right-0 mr-28 mt-28 text-white font-bold w-[600px] text-[50px] leading-tight tracking-[0.2em]">Gentle Care For Your Little One's Delicate Skin</p>
                            <img
                                src="/static/img/slider/shop-sidebar/image1.jpeg"
                                alt="martfury"
                                style={{height:"500px", width:"100%",objectFit:"cover"}}
                            />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <p className="absolute bottom-0 ml-14 mb-16 py-14 px-24 text-white font-bold text-6xl bg-[#544679] shadow-xl shadow-[#1f1822] rounded-3xl" >Shop Now</p>
                    <p className="absolute right-0 mr-2 mt-28 text-white font-bold w-[600px] text-[50px] leading-tight tracking-[0.2em]">Soft Nourished Hand At Your Fingertips</p>
                        <img
                            src="/static/img/slider/shop-sidebar/image2.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <p className="absolute bottom-0 ml-14 mb-16 py-14 px-24 text-white font-bold text-6xl bg-[#C99C48] shadow-xl shadow-[#211716] rounded-3xl" >Shop Now</p>
                      <p className="absolute bottom-0 right-0 mr-16 mb-28 text-white font-bold w-[600px] text-[50px] leading-tight tracking-[0.2em]">Elevate Your Presence, One Spritz At A Time</p>  
                        <img
                            src="/static/img/slider/shop-sidebar/image3.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <p className="absolute bottom-0 ml-14 mb-16 py-14 px-24 text-white font-bold text-6xl bg-[#4C9977] shadow-xl shadow-[#222c24] rounded-3xl" >Shop Now</p>
                      <p className="absolute right-0 mr-28 mt-28 text-white font-bold w-[600px] text-[50px] leading-tight tracking-[0.2em]">Glow Confidently With Skin That Radiate Care</p>  
                        <img
                            src="/static/img/slider/shop-sidebar/image4.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <p className="absolute bottom-0 ml-14 mb-16 py-14 px-24 text-white font-bold text-6xl bg-[#D67777] shadow-xl shadow-[#443032] rounded-3xl" >Shop Now</p>
                      <p className="absolute right-0 mr-28 mt-28 text-white font-bold w-[600px] text-[50px] leading-tight tracking-[0.2em]">Unleash Your Essence With Every scent</p>  
                        <img
                            src="/static/img/slider/shop-sidebar/image5.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    );
}

