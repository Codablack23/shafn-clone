export default function BecomeVendorSection(){
    return (
        <section className="bg-[#654F3F] text-white py-[64px]">
            <div className="max-w-[1196px] mx-auto px-[16px]">
                <div className="flex min-h-[350px] justify-between items-center">
                    <div>
                        <p className="text-header font-bold text-white text-[36px]">Own a Beauty Brand?</p>
                        <p className="text-white mb-[24px]">Sell your beauty products on a growing platform built for brands like yours. <br /> Easy setup. Fast payouts. Real customers.</p>
                        <button className="px-[32px] text-header text-[16px] py-[8px] font-semibold bg-[#FE5A00] text-white">Apply to Sell</button>
                    </div>
                    <div>
                        <img className="max-w-[400px] h-[400px] rounded-full" src="/static/images/become-vendor.png" alt="Become-a-vendor-image" />
                    </div>
                </div>
            </div>
        </section>
    )
}