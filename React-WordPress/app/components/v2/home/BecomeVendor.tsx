export default function BecomeVendorSection(){
    return (
        <section className="bg-[#654F3F] text-white py-[64px]">
            <div className="max-w-[1196px] mx-auto px-[16px]">
                <div className="flex gap-y-[16px] flex-col-reverse lg:flex-row min-h-[350px] justify-between items-center">
                    <div className="lg:!text-left text-center ">
                        <p className="text-header font-bold text-white text-[24px] lg:text-[36px]">Own a Beauty Brand?</p>
                        <p className="text-white text-[12px]  lg:text-[16px] mb-[24px]">Sell your beauty products on a growing platform built for brands like yours. <br /> Easy setup. Fast payouts. Real customers.</p>
                        <button className="px-[32px] text-header text-[12px] lg:text-[16px] py-[8px] font-semibold bg-[#FE5A00] text-white">Apply to Sell</button>
                    </div>
                    <div>
                        <img className="lg:max-w-[400px] max-w-[250px] h-[250px] lg:h-[400px] rounded-full" src="/static/images/become-vendor.png" alt="Become-a-vendor-image" />
                    </div>
                </div>
            </div>
        </section>
    )
}