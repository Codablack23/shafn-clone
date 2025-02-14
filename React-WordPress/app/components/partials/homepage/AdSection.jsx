import { Image } from "antd";
import Link from "next/link";
import { useEffect,useState } from "react";
import WPVendorRepository from "@/repositories/WP/WPVendorRepository";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import axios from "axios";
import AdSectionCategory from "./AdSectionCategory";

let productReqSource;
export default function AdSection(){
    const [store, setStore] = useState(null)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [storeQuery, setQuery] = useState("")

    useEffect(()=>{
        async function getStores(){
            const categoryQueries = {
                page: 1,
                per_page: 8,
            }
            const params = {
                pages: 1,
                per_page: 10,
            };
            const WPStores = await WPVendorRepository.getStores(params);
            const WPProducts = await WPProductRepository.getProducts(
                params,
                productReqSource.token
            );
            const WPCategories = await WPProductRepository.getProductCategories(
                categoryQueries
            );
            if(WPCategories){
                setCategories(WPCategories.items)
            }
            if(WPProducts){
               setProducts(WPProducts.items)
            }
            if(WPStores){
                const items = WPStores.items
                if(items){
                    const currentStore = items[Math.floor(Math.random() * (items.length - 1))]
                    let query = `${currentStore.store_name.toLowerCase().replace(/ /g, "-")}-${currentStore.id}`.trim();
                    setStore(currentStore);
                    setQuery(query);
                }
               
            }
        }
        productReqSource = axios.CancelToken.source();
        getStores()

        return () => {
            if (productReqSource) {
                productReqSource.cancel();
            }
        };
    },[])

    return (
        <section className="ps__ad-section my-16 py-16">
            <div className="ps-container ps-grid">
                <AdSectionCategory
                products={products.slice(0,5)}
                categories={categories.length > 1?categories.slice(0,4):[]}
                />
                <AdSectionCategory
                products={products.slice(5)}
                categories={
                    categories.slice(4,8).length > 1
                    ?categories.slice(4,8)
                    :categories.length > 1
                      ?categories.slice(0,4)
                      :[]
                    }
                />
               <Link href={storeQuery?`/store/${storeQuery}`:"/vendors"}>
               <div className="ps-store text-center">
                        <>
                            <p className="text-white title">STORE</p>
                            <div className="store-img-container">
                            {store !== null?(
                                <img
                                src={store.gravatar}
                                alt={store.store_name}
                                />
                            ):null}
                            </div>
                            <p className="text-white title">{store?store.store_name:"Loading Store"}</p>
                        </>
               </div>
               </Link>
                <div className="ps-become-a_vendor">
                    <Link target="_blank" href={"https://seller.shafn.com"}>
                        <button>BECOME A VENDOR</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}