import React from 'react';

import Wishlist from '~/components/partials/account/Wishlist';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPWishlist from '~/wp-components/account/WPWishlist';

const WishlistPage = () => {
    return (
        <WPLayout title="Wishlist">
            <div className="ps-page--simple">
                <WPWishlist />
            </div>
        </WPLayout>
    );
};

export default WishlistPage;
