import CartIcon from "@/icons/cart";
import FavouriteIcon from "@/icons/favourite";
import UserIcon from "@/icons/user";
import Link from "next/link";

export default function BottomBar() {
    return (
        <div className="fixed lg:hidden bottom-[10px] z-[100] left-0 w-full">
            <div className="bg-white text-[#242B36] flex p-3 items-center shadow-lg mx-auto left-0  w-10/12 rounded-[45px]">
                <button className="flex-1 h-[36px] flex items-center justify-center"><i className="bi bi-list text-[28px]"></i></button>
                <Link className="flex-1 h-[36px] flex items-center justify-center" href={"/"}><button><FavouriteIcon height={28} width={28}/></button></Link>
                <Link className="flex-1 h-[36px] flex items-center justify-center" href={"/"}><button><CartIcon height={28} width={28}/></button></Link>
                <Link className="flex-1 h-[36px] flex items-center justify-center" href={"/"}><button><UserIcon height={28} width={28}/></button></Link>
            </div>
        </div>
    )
}