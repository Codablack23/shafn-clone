import { getItemBySlug } from "@/utilities/product-helper";
import Promotion from "@/app/components/elements/media/Promotion";
import BannerItem from "~/app/components/elements/media/BannerItem";
import { useAppSelector } from "@/redux-store/hooks";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRef } from "react";

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
    height: 600,
}

export default function HomeBanner () {
    // const { banners, promotions } = props;
    const ref = useRef()
    const media = useAppSelector((state)=>state.media)
    const {banners,promotions} = media

    console.log(ref)
    const bannerData = {
      items:[
        {
            id:1,
            image:{
                url:"/images/slider1.jpg"
            }
        },
        {
            id:2,
            image:{
                url:"/images/slider2.jpg"
            }
        },
        {
            id:3,
            image:{
                url:"/images/slider9.jpg"
            }
        },
        {
            id:4,
            image:{
                url:"/images/slider10.jpg"
            }
        },
        {
            id:5,
            image:{
                url:"/images/slider5.jpg"
            }
        },
      ]
    }
    const promotionData = getItemBySlug(
        promotions,
        "home_fullwidth_promotions"
    );
    let promotion1, promotion2;

    if (promotionData) {
        promotion1 = getItemBySlug(promotionData.items, "main_1");
        promotion2 = getItemBySlug(promotionData.items, "main_2");
    }

    // Views
    let bannersView;
    if (bannerData) {
        bannersView = bannerData.items.map((item) => (
            <SplideSlide key={item.id}>
                <BannerItem source={item}/>
            </SplideSlide>
        ));
    }
    
    return (
        <div className="ps-home-banner ps-home-banner--1 my-10 mt-14">
            <div className="ps-container flex gap-2">
                <div className="flex-[2]">
                    <div className="flex-[2]">
                        {bannerData !== null ? (
                        <Splide ref={ref} aria-label="My Favorite Images" options={sliderOptions}>
                            {bannersView}
                        </Splide>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div 
                className="md:flex md:flex-1 md:flex-col hidden">
                    <div className="mb-2 ">
                        <Promotion
                            link="/shop"
                            image={promotion1 ?null : null}
                            defImage={"/static/images/slider3.jpg"}
                        />
                    </div>
                    <Promotion
                        link="/shop"
                        image={promotion2 ? null : null}
                        defImage={"/static/images/slider12.jpg"}
                    />
                </div>
            </div>
        </div>
    );
};


