"use client";
import React from 'react';
import { scrollPageToTop } from '@/utilities/common-helpers';
import WPShoppingCart from '@/wp-components/account/WPShoppingCart';
import WPLayout from '@/wp-components/layouts/WPLayout';

const ShoppingCartPage = () => (
    <div>
        <WPLayout>
            <div className="ps-page--simple">
                <WPShoppingCart />
            </div>
        </WPLayout>
    </div>
);

export default ShoppingCartPage;
