import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import AccountQuickLinksMobile from "@/app/components/shared/headers/modules/AccountQuickLinksMobile";
import { useAppSelector } from "@/redux-store/hooks";

export default function WPMobileHeaderActions(){
    const { auth, compare, wishlist,cart } = useAppSelector(state=>state);
    const { cartTotal } = cart;
    let quickLinksView;
    if (auth && auth.isLoggedIn) {
        quickLinksView = <AccountQuickLinksMobile />;
    } else {
        quickLinksView = (
            <div className="">
                <Link legacyBehavior href="/account/login">
                    <i
                        className="bi bi-person text-white action-links"
                        style={{ cursor: "pointer" }}></i>
                </Link>
            </div>
        );
    }

    return (
        <div className="header-mobile-actions">
            <Link legacyBehavior href="/account/compare">
                <a className="action-links w3-hover-lightgrey">
                    <i className="bi bi-bell text-white" aria-hidden="true"></i>
                    <span  className='sub'>
                        {compare && compare.compareTotal}
                    </span>
                </a>
            </Link>
            <Link legacyBehavior href="/account/wishlist">
                <a className="action-links w3-hover-lightgrey">
                    <i className="bi bi-heart text-white"></i>
                    <span className="sub">{wishlist.wishlistTotal}</span>
                </a>
            </Link>
            <Link legacyBehavior href="/account/shopping-cart">
                <a className="action-links">
                    <i className="bi bi-cart text-white"></i>
                    <span className="sub">{cartTotal ? cartTotal : 0}</span>
                </a>
            </Link>
            {quickLinksView}
        </div>
    );
};

