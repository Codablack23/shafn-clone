"use client";
import React, { Suspense } from "react";
import ShopContent from "./ShopContent"
import WPLayoutFullwidth from "@/wp-components/layouts/WPLayoutFullwidth";


export default function WPShopPage() {

    return (
        <div >
            <WPLayoutFullwidth title="Shop">
                <Suspense fallback={null}>
                    <ShopContent/>
                </Suspense>
            </WPLayoutFullwidth>
        </div>
    );
};

