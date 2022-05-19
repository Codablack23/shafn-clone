import React, { useEffect, useRef } from 'react';
import WPShoppingCart from '~/wp-components/account/WPShoppingCart';
import WPLayout from '~/wp-components/layouts/WPLayout';

const ShoppingCartPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout>
                <div className="ps-page--simple">
                    <WPShoppingCart />
                </div>
            </WPLayout>
        </div>
    );
};

export default ShoppingCartPage;
