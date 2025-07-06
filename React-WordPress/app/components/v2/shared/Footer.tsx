import Link from "next/link";

export default function Footer(){
    return(
        <footer className="bg-[#242B36] py-[64px]">
            <div className="max-w-[1196px] mx-auto px-[16px]">
                <div className="flex gap-[10px]">
                    <div className="flex-[3] py-8 pr-[32px]">
                        <p className="font-medium text-[14px] text-white mb-[10px]">SUSCRIBE TO OUR NEWSLETTER</p>
                        <form className="border-white border flex">
                            <input type="email" required className="flex-1 text-white bg-transparent p-[8px] h-[36px]" placeholder="Your Email" />
                            <button className="bg-white px-[32px] py-[8px] text-header">SUSCRIBE</button>
                        </form>
                        <div className="flex mt-[10px] py-4 items-center gap-x-4">
                            <i className="bi text-white bi-envelope-fill"></i>
                            <p className="text-white">info@shafn.com</p>
                        </div>
                    </div>
                    <div className="flex-[2] px-[32px] p-8 space-y-[10px]">
                        <p className="text-header font-light text-[#D9D9D9] text-[18px]">QUICK LINKS</p>
                        <div className="space-y-[10px]">
                            <Link className="block" href={"/"}><button className="font-bold text-white">Shipping</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">FAQs</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Return Policy</button></Link>
                        </div>
                    </div>
                    <div className="flex-[2] px-[32px] p-8 space-y-[10px]">
                        <p className="text-header font-light text-[#D9D9D9] text-[18px]">COMPANY</p>
                        <div className="space-y-[10px]">
                            <Link className="block" href={"/"}><button className="font-bold text-white">About</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Contact</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Privacy Policy</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Terms and Conditions</button></Link>
                        </div>
                    </div>
                    <div className="flex-[2] px-[32px] space-y-[10px] p-8">
                        <p className="text-header font-light text-[#D9D9D9] text-[18px]">BUSINESS</p>
                        <div className="space-y-[10px]">
                            <Link className="block" href={"/"}><button className="font-bold text-white">Cart</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Checkout</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Shop</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Become a Vendor</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Vendor Stores</button></Link>
                            <Link className="block" href={"/"}><button className="font-bold text-white">Track Your Order</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}