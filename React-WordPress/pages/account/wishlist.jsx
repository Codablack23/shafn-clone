import React, { useEffect, useRef } from 'react';

import Wishlist from '~/components/partials/account/Wishlist';
import WPLayout from '~/wp-components/layouts/WPLayout';

import WPWishlist from '~/wp-components/account/WPWishlist';

const WishlistPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="Wishlist">
                <div className="ps-page--simple">
                    <WPWishlist />
                </div>
            </WPLayout>
        </div>
    );
};

export default WishlistPage;
