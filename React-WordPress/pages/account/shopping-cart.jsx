import React from 'react';
import WPShoppingCart from '~/wp-components/account/WPShoppingCart';
import WPLayout from '~/wp-components/layouts/WPLayout';

const ShoppingCartPage = () => {
    return (
        <WPLayout>
            <div className="ps-page--simple">
                <WPShoppingCart />
            </div>
        </WPLayout>
    );
};

export default ShoppingCartPage;
