"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const items = (new Array(3)).fill("").map((_, index) => `${index}-${_}`)



export default function PopularStores() {
    return (
        <section className="bg-[#654F3F] py-[64px]">
            <p className="text-header font-semibold text-center text-[24px] uppercase text-white py-[16px]">Popular Stores</p>
            <div className="pl-[72px]">
                <Swiper

                    spaceBetween={50}
                    slidesPerView={1.8}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {items.map(item => {
                        return (
                            <SwiperSlide key={item}>
                                <div className="min-h-[350px] text-white p-[16px] left-0 h-full w-full rounded-[45px] bg-[#4E3C30] backdrop-blur-sm">
                                    <div className="space-y-[10px]">
                                        <div className="h-[200px] w-full rounded-[16px]">
                                            <img src="/promotion-images/promotion-2.jpg" className="w-full rounded-[45px] h-[200px] object-cover" alt="" />
                                        </div>
                                        <div className="flex-1 p-[16px]">
                                            <p className="text-[24px] text-white text-header font-bold">SHAFN SHOP</p>
                                            <p className="text-white text-header">40 Beauty Product(s)</p>
                                            <div className="flex items-center gap-x-4 my-2">
                                                <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                <i className="bi bi-star-fill text-2xl text-[#FE5A00]"></i>
                                                <p className="text-white text-header font-semibold">4.5</p>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <button className="px-[32px] text-header text-[14px] py-[8px] font-semibold bg-[#FE5A00] text-white">VISIT STORE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}