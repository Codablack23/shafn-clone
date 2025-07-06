"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import Link from "next/link";

const items = (new Array(8)).fill("").map((_, index) => `${index}-${_}`)


export default function NewArrivalsSection() {
    return (
        <section className="py-[64px]">
            <div className="max-w-[1196px] px-[16px] mx-auto">
                <header className="flex py-[16px] items-center justify-between">
                    <p className="text-header font-semibold text-[20px] text-[#242B36]">HOT NEW ARRIVALS</p>
                    <Link href="/shop">
                        <button className="px-[32px] text-white py-[8px] text-[16px] bg-[#FE5A00] text-header">See All</button>
                    </Link>
                </header>
                <div className="py-[32px]">
                    <Swiper

                        spaceBetween={50}
                        slidesPerView={5}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {items.map(item => {
                            return (
                                <SwiperSlide key={item}>
                                    <div className="">
                                        <div className="mb-[10px] max-w-[150px] h-[150px] mx-auto rounded-full overflow-hidden flex items-center justify-center">
                                            <img className="object-contain h-[120px]" src="/static/images/product.png" alt="" />
                                        </div>
                                        <div>
                                            <p className="">Shafn</p>
                                            <p className="text-[14px] font-semibold text-header">BRUSH AND SPONGE</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}