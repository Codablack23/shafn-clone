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
            console.log(WPCategories.items);
            let categories = [];
            for (let i = 0; i < 2; i++) {
                // random index must not exceed categories length - 1
                let randomIndex = Math.floor(
                    Math.random() * WPCategories.items.length
                );

                console.log(randomIndex)

                categories.push(WPCategories.items[randomIndex]);
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
