import React, { Component } from "react";

import Slider from "react-slick";
import { getItemBySlug } from "@/utilities/product-helper";
import Promotion from "@/app/components/elements/media/Promotion";
import BannerItem from "~/app/components/elements/media/BannerItem";
import { useAppSelector } from "@/redux-store/hooks";

export default function HomeBanner (props) {
    // const { banners, promotions } = props;
    const media = useAppSelector((state)=>state.media)
    const {banners,promotions} = media
    const carouselSetting = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // const bannerData = getItemBySlug(banners, "banner-home-fullwidth");
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
            <BannerItem source={item} key={item.id} />
        ));
    }

    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left" style={{height:"480px",marginBottom:18}}>
                    {bannerData !== null ? (
                        <Slider arrows={false} autoplaySpeed={5000}   {...carouselSetting} className="ps-carousel">
                            {bannersView}
                        </Slider>
                    ) : (
                        ""
                    )}
                </div>
                <div className="ps-section__right">
                    <Promotion
                        link="/shop"
                        image={promotion1 ?null : null}
                        defImage={"/static/images/slider3.jpg"}
                    />
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


