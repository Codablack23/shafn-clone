"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const items = (new Array(3)).fill("").map((_, index) => `${index}-${_}`)

export default function FeaturedProductsSection() {
    return (
        <section className="py-[64px]">
            <div className="max-w-[1196px] mx-auto px-[16px]">
                <header className="flex py-[16px] items-center justify-between">
                    <p className="text-header font-semibold text-[20px] text-[#242B36]">FEATURED PRODUCTS</p>
                    <Link href="/shop">
                        <button className="px-[32px] text-white py-[8px] text-[16px] bg-[#FE5A00] text-header">Shop Now</button>
                    </Link>
                </header>
                <div className="w-full max-w-[1196px]">
                    <div></div>
                    <div className="flex-1">
                        <Swiper

                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {items.map(item => {
                                return (
                                    <SwiperSlide key={item}>
                                        <div className="">
                                            <div className="flex items-center w-full border  p-[32px] border-[rgba(36,43,54,0.5)]">
                                                <div className="flex-1 space-y-[8px]">
                                                <p className="">CODABLACK BEAUTY SHOP</p>
                                                <p className="text-header font-semibold text-[20px]">BRUSH AND SPONGE</p>
                                                <div className="flex items-center gap-x-4 my-2">
                                                    <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                    <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                    <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                    <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                    <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                    <p className="text-header font-semibold">4.5</p>
                                                </div>
                                                <p>£100.58</p>
                                                <p className="font-light mb-[8px]">Looking for a gift for new parents? With this package, you will steal the show. The Mini & me set contains a nourishing cream for sensitive baby skin and a nice adult shower foam for parents. ....</p>
                                                <button className="border px-[32px] py-[8px] border-[rgba(36,43,54,0.5)] text-[rgba(36,43,54,0.75)] font-semibold text-header">ADD TO CART</button>
                                            </div>
                                            <div className="flex-1">
                                                <div className="max-w-[320px] overflow-clip rounded-full bg-[rgba(254,90,0,0.2)] ml-auto h-[320px]">
                                                    <img className="w-full h-[320px] object-contain" src="/static/images/product-lg.png" alt="" />
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
    )
}