import React, { useEffect, useState } from "react";
// import Link from "next/link";
import Slider from "react-slick";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import SkeletonProduct from "~/app/components/elements/skeletons/SkeletonProduct";
import { carouselFullwidth } from "~/utilities/carousel-helpers";
import WPProductDealOfDay from "~/wp-components/elements/products/WPProductDealOfDay";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import CountDownSimple from "~/app/components/elements/CountDownSimple";

let productReqSource;
const WPDealOfDay = () => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getSectionProducts() {
        const params = {
            pages: 1,
            per_page: 15,
        };
        const WPProducts = await WPProductRepository.getProducts(
            params,
            productReqSource.token
        );

        if (WPProducts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setProductItems(WPProducts.items);
        }
    }

    useEffect(() => {
        productReqSource = axios.CancelToken.source();
        getSectionProducts();

        return () => {
            if (productReqSource) {
                productReqSource.cancel();
            }
        };
    }, []);

    // Views
    let productItemsView;

    if (!loading) {
        if (productItems && productItems.length > 0) {
            const slideItems = productItems.map((item) => (
                <SplideSlide>
                    <WPProductDealOfDay product={item} key={item.id} />
                </SplideSlide>
            ));
            productItemsView = (
                <Splide
                aria-label="My Favorite Images"
                options={{
                    perPage:6,
                    type:"loop",
                    gap:"2em",
                    pagination:true,
                    height:380,
                    padding:{
                        bottom:"8em",
                        top: "8em"
                    },
                    rewind:true,
                    breakpoints:{
                        1240:{
                            perPage:6,
                        },
                        960:{
                            perPage:3
                        },
                        600:{
                            perPage:1,
                            arrows:false,
                        }
                    }
                }}>
                    {slideItems}
                </Splide>
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4, 5, 6];
        const skeletons = tempArr.map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }
    return (
        <div className="ps__deal-container ps-container">
            <hr />
            <div className="ps__deal-section">
                <div>
                {productItemsView}
                </div>
            </div>
        </div>
    );
};

export default WPDealOfDay;
