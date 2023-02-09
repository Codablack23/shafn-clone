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
            per_page: 4,
        };

        const WPCategories = await WPProductRepository.getProductCategories(
            params,
            productReqSource.token
        );

        if (WPCategories) {
            let categories = [];
            for (let i = 0; i < 2; i++) {
                // random index must not exceed categories length - 1
                let randomIndex = Math.floor(
                    Math.random() * WPCategories.length
                );
                categories.push(WPCategories[randomIndex]);
            }
            setCategories(categories);
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
            {categories.map((category,i) => (
                <WPProductList
                    key={category?category.id:i}
                    categoryID={category ?category.id:""}
                    title={category?category.name:""}
                />
            ))}
        </>
    );
}

export default RandomCategories;
