import React, { useEffect, useState } from "react";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import axios from "axios";
import WPProductList from "./WPProductList";

let productReqSource;
function RandomCategories() {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        const params = {
            page: 1,
            perPage: 30,
        };

        const WPCategories = await WPProductRepository.getProductCategories(
            params,
            productReqSource.token
        );


        if (WPCategories) {
            const shuffledCategories = WPCategories.items.sort(() => 0.5 - Math.random());
            const selectedCategories = shuffledCategories.slice(0, 2);
            setCategories(selectedCategories);
        }
    }

    useEffect(() => {
        productReqSource = axios.CancelToken.source();
        getCategories();
        return () => {
            if (productReqSource) {
                productReqSource.cancel();
            }
        };
    }, []);

    return (
        <>
        <div className="" >
            {categories &&
              categories.map((category) => (
                <WPProductList
                    key={category.id}
                    categoryID={category.id}
                    title={category.name}
                />
            ))}
        </div>
        </>
    );
}

export default RandomCategories;
