import {
    BecomeVendorSection,
    BestDealsSection,
    FeaturedProductsSection,
    Footer,
    HeroSection,
    NewArrivalsSection,
    PopularStoresSection,
    ShopByCategorySection
} from "./components/v2/";


export default function Page(){
    return (
        <main>
            <HeroSection/>
            <ShopByCategorySection/>
            <PopularStoresSection/>
            <BestDealsSection/>
            <BecomeVendorSection/>
            <NewArrivalsSection/>
            <FeaturedProductsSection/>
            <Footer/>
        </main>
    )
}