import React, { useState } from "react";
import { Slider } from "antd";
import { connect, useDispatch } from "react-redux";
import { WPGetProducts } from "~/store/wp/action";
import { useRouter } from 'next/router';


//make this function a default export
//export default function WPProductDetailPage({pid}){

export default function WPProductDetailPage ({pid}){
    const dispatch = useDispatch()
    const router = useRouter();

}


const WPWidgetFilterByPrices = () => {
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);

    const handleFilterByPrices = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
        const queries = {
            page: 1,
            per_page: 20,
            min_price: value[0],
            max_price: value[1],
        };
        dispatch(WPGetProducts(queries));
    };
// #d92282
// #ff083a

    return (
        <aside className="widget widget_shop font-bold">
            <h4 className="font-bold" style={{textTransform:"uppercase"}}>By Price</h4>
            <div className="widget__conent">
                <Slider
                    range
                    defaultValue={[0, 2000]}
                    max={2000}
                    onAfterChange={(value) => handleFilterByPrices(value)}
                />
                <p className="font-bold">
                    Price: ${minPrice} - ${maxPrice}
                </p>
            </div>
        </aside>
    );
};


