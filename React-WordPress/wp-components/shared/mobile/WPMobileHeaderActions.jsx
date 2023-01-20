import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from '~/components/shared/headers/modules/AccountQuickLinksMobile';

const WPMobileHeaderActions = (props) => {
    const { auth,compare,wishlist } = props;
    const { cartTotal } = props.cart;
    let quickLinksView;
    if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
        quickLinksView = <AccountQuickLinksMobile />;
    } else {
        quickLinksView = (
            <div className="">
                <Link href="/account/login">
                    <i className="bi bi-person text-white action-links"></i>
                </Link>
            </div>
        );
    }

    return (
        <div className="header-mobile-actions">
             <Link href="/account/compare">
                <a className="action-links w3-hover-lightgrey">
                    <i className="bi bi-bell text-white" aria-hidden="true"></i>
                    <span  className='sub'>
                        {compare && compare.compareTotal}
                    </span>
                </a>
            </Link>
            <Link href="/account/wishlist">
                <a className="action-links w3-hover-lightgrey">
                    <i className="bi bi-heart text-white"></i>
                    <span  className='sub'>
                       {wishlist.wishlistTotal}
                    </span>
                </a>
            </Link> 
            <Link href="/account/shopping-cart">
                <a className="action-links">
                    <i className="bi bi-cart text-white"></i>
                    <span className='sub'>
                       {cartTotal ? cartTotal : 0}
                    </span>
                </a>
            </Link>
            {quickLinksView}
        </div>
    );
};

export default connect((state) => state)(WPMobileHeaderActions);
