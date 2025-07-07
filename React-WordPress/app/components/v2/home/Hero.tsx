import { Navbar } from "../shared/";

export default function HeroSection() {
    return (
        <>
            <div className="h-[600px] relative">
                <Navbar />
                <img src="/v2/home/hero.png" className="absolute top-0 left-0 w-full h-full object-right object-cover" alt="hero" />
                <div className="relative h-[500px] max-w-[1196px] px-[16px] mx-auto flex items-center w-full">
                    <div className="flex-1 max-w-[500px] mx-auto lg:!mx-0 lg:!text-left text-center ">
                        <p className="text-white text-header text-[36px] leading-[44px] md:text-[48px] pb-[16px] md:leading-[52px]">BEAUTY <br /> <b>PRODUCTS</b> <br /> & <b>COSMETIC</b></p>
                        <button className="px-[32px] text-header font-semibold py-[8px] text-[18px]  bg-[#FE5A00] text-white">SHOP NOW</button>
                    </div>
                </div>
            </div>
        </>
    )
}