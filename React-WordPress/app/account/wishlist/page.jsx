import React from 'react';
import WPLayout from '@/wp-components/layouts/WPLayout';
import WPWishlist from '@/wp-components/account/WPWishlist';


const WishlistPage = () => (
    <div>
        <WPLayout title="Wishlist">
            <div className="ps-page--simple">
                <WPWishlist />
            </div>
        </WPLayout>
    </div>
);

export default WishlistPage;
