import Link from "next/link";

const items = (new Array(8)).fill("").map((_,index)=>`${index}-${_}`)

export default function ShopByCategory(){
    return(
        <section className="py-[64px]">
            <div className="max-w-[1196px] px-[16px] mx-auto">
                <header className="flex py-[16px] items-center justify-between">
                    <p className="text-header font-semibold text-[20px] text-[#242B36]">Shop By Category</p>
                    <Link href="/shop">
                     <button className="px-[32px] text-white py-[8px] text-[16px] bg-[#FE5A00] text-header">See All</button>
                    </Link>
                </header>
                <div className="grid grid-cols-4 gap-x-[10px] gap-y-[32px] mt-[32px]">
                    {items.map(item=>{
                        return (
                           <Link key={item} href={"/shop"}>
                            <div className="text-center">
                                <div className="mb-[10px] max-w-[150px] h-[150px] mx-auto bg-[rgba(36,43,54,0.1)] rounded-full overflow-hidden flex items-center justify-center">
                                    <img className="object-contain" src="/static/images/product.png" alt="" />
                                </div>
                                <p className="text-[18px] font-semibold text-header">BRUSH AND SPONGE</p>
                            </div>
                           </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}