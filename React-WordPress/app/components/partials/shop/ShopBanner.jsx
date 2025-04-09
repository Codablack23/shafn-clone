
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
                    <a href="/shop?category=242" className="absolute cursor-pointer bottom-0 md:ml-80 md:mb-64 mb-32 ml-10 md:py-[48px] py-3 md:px-12 px-7 text-white font-bold md:text-4xl text-[20px] bg-[#50B2D0] shadow-xl shadow-[#3b5e69] rounded-3xl">Shop Now!</a>
                     <p className="absolute right-0 md:mr-28 mr-10 md:mt-28 mt-20 text-white font-bold md:w-[600px] w-[200px] md:text-[50px] text-[32px] leading-tight md:tracking-[0.2em]">Gentle Care For Your Little One's Delicate Skin</p>
                            <img
                                src="/static/img/slider/shop-sidebar/image1.jpeg"
                                alt="martfury"
                                style={{height:"500px", width:"100%",objectFit:"cover"}}
                            />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <a href="/shop?category=193" className="absolute cursor-pointer bottom-0 md:ml-80 md:mb-64 mb-32 ml-10 md:py-[48px] py-3 md:px-12 px-7 text-white font-bold md:text-4xl text-[20px] bg-[#544679] shadow-xl shadow-[#1f1822] rounded-3xl">Shop Now</a>
                    <p className="absolute right-0 md:mr-28 mr-20 md:mt-28 mt-20 text-white font-bold md:w-[600px] w-[150px] md:text-[50px] text-[32px] leading-tight md:tracking-[0.2em]">Soft Nourished Hand At Your Fingertips</p>
                        <img
                            src="/static/img/slider/shop-sidebar/image2.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <a href="/shop?category=117" className="absolute cursor-pointer bottom-0 md:ml-80 md:mb-64 mb-32 ml-10 md:py-[48px] py-3 md:px-12 px-7 text-white font-bold md:text-4xl text-[20px] bg-[#C99C48] shadow-xl shadow-[#211716] rounded-3xl">Shop Now</a>
                      <p className="absolute bottom-0 right-0 md:mr-16 mr-8 md:mb-28 mb-80 text-white font-bold md:w-[600px] w-[200px] md:text-[50px] text-[32px] leading-tight md:tracking-[0.2em]">Elevate Your Presence, One Spritz At A Time</p>  
                        <img
                            src="/static/img/slider/shop-sidebar/image3.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <a href="/shop?category=185" className="absolute cursor-pointer bottom-0 md:ml-80 md:mb-64 mb-32 ml-10 md:py-[48px] py-3 md:px-12 px-7 text-white font-bold md:text-4xl text-[20px] bg-[#4C9977] shadow-xl shadow-[#222c24] rounded-3xl">Shop Now</a>
                      <p className="absolute right-0 md:mr-28 mr-10 md:mt-28 mt-20 text-white font-bold md:w-[600px] w-[200px] md:text-[50px] text-[32px] leading-tight md:tracking-[0.2em]">Glow Confidently With Skin That Radiate Care</p>  
                        <img
                            src="/static/img/slider/shop-sidebar/image4.jpeg"
                            alt="martfury"
                            style={{height:"500px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div style={{height:"500px"}}>
                    <a href="/shop?category=117" className="absolute cursor-pointer bottom-0 md:ml-80 md:mb-64 mb-32 ml-10 md:py-[48px] py-3 md:px-12 px-7 text-white font-bold md:text-4xl text-[20px] bg-[#D67777] shadow-xl shadow-[#443032] rounded-3xl"> Shop Now </a>
                      <p className="absolute right-0 md:mr-28 mr-0 md:mt-28 mt-20 text-white font-bold md:w-[600px] w-[200px] md:text-[50px] text-[32px] leading-tight md:tracking-[0.2em]">Unleash Your Essence With Every scent</p>  
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

