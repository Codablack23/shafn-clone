

export default function CategoryMap() {
  return (
    <div className="flex flex-col items-center justify-center my-20">
        <p className="items-center font-extrabold italic mb-20 text-5xl max-sm:text-4xl font-sans ">Shop by Category</p>
        <div className="grid grid-cols-6 max-sm:grid-cols-3 gap-20 max-sm:gap-6">

        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=16"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl font-semibold text-white opacity-70 -mt-3 absolute">Makeup</p>
        </div> 

        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=24"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl font-semibold text-white opacity-70 -mt-3 absolute">Face</p>
        </div> 

        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=24"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl font-semibold text-white opacity-70 -mt-3 absolute">Perfume</p>
        </div>           
          
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=24"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl font-semibold text-white opacity-70 -mt-3 absolute">Hair</p>
        </div> 

        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=22"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl font-semibold text-white opacity-70 -mt-3 absolute">Body</p>
        </div>           
          
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <a href="/shop?category=235"><div className="w-60 h-60 max-sm:w-32 max-sm:h-32 mb-6 text-red-500 relative rounded-full bg-black hover:bg-red-500"></div></a>
          <p className="text-3xl max-sm:text-xl/6 font-semibold text-white opacity-70 text-center -mt-3 absolute">Baby <br className="md:hidden"/> & <br className="md:hidden"/> Kids</p>
        </div> 
        </div>

    </div>
  )
}
