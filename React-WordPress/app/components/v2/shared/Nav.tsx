"use client";

import CartIcon from "@/icons/cart";
import FavouriteIcon from "@/icons/favourite";
import UserIcon from "@/icons/user";
import Link from "next/link";

const categories = [
    {name:"Shop"},
    {name:"Makeup"},
    {name:"Face"},
    {name:"Perfume"},
    {name:"Hair"},
    {name:"Body"},
    {name:"Baby & Kids"},
    {name:"Brands"},
    {name:"Sales"},
]


export default function Nav() {
    return (
        <nav className="max-w-[1196px] z-[100] gap-x-[24px] px-[16px] top-0 py-4 flex justify-between sticky mx-auto">
            <div className="flex item-center gap-x-8">
                <div className="bg-white h-[50px] rounded-full w-[50px] flex items-center justify-center">
                    <img src="/static/img/favi.png" className="h-[50px] w-[50px]" alt="" />
                </div>
                <div className="bg-white w-[50px] h-[50px] rounded-[30px] flex items-center justify-center">
                    <i className="bi bi-search text-4xl"></i>
                </div>
            </div>
             <div className="bg-white w-[content] gap-x-[16px] rounded-[40px] flex justify-center px-[24px] py-[8px] items-center rounded-35px">
                    {categories.map(category=>(
                        <Link href="/">
                            <button className="font-semibold text-header text-[#242B36] uppercase">{category.name}</button>
                        </Link>
                    ))}
                </div>
            <div className="flex items-center gap-x-[8px]">
                <div className="flex px-[16px] py-[8px] rounded-[35px] gap-x-[10px] items-center bg-white justify-between">
                    <p className="text-header font-semibold text-[rgba(36,43,54,0.75)]">
                        EUR - £
                    </p>
                    <i className="bi bi-chevron-down"></i>
                </div>
                <button className="bg-white h-[36px] w-[36px] rounded-full flex items-center justify-center relative">
                    <FavouriteIcon/>
                </button>
                <button className="bg-white h-[36px] w-[36px] rounded-full flex items-center justify-center relative">
                    <CartIcon/>
                </button>
                <button className="bg-white  flex rounded-full items-center justify-center relative">
                   <UserIcon/>
                </button>
            </div>
        </nav>
    )
}