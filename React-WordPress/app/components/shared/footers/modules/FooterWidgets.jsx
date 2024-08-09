import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { DashboardDomain } from "~/repositories/WP/WPRepository";

const FooterWidgets = (auth) => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title text-white">Contact us</h4>
            <div className="widget_content">
                <p>
                    <a href="mailto:info@shafn.com<" className="text-white">
                        info@shafn.com
                    </a>
                </p>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link legacyBehavior href="/privacy-policy" scroll={false}>
                        <a className="text-white">Policy</a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href="/terms-and-conditions" scroll={false}>
                        <a className="text-white">Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/shipping" scroll={false}>
                        <a className="text-white">Shipping</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/return" scroll={false}>
                        <a className="text-white">Return</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/page/faqs" scroll={false}>
                        <a className="text-white">FAQs</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link legacyBehavior href="/page/about-us" scroll={false}>
                        <a className="text-white">About Us</a>
                    </Link>
                </li>
                {/* <li>
                    <Link legacyBehavior href="/page/blank" scroll={false}>
                        <a className="text-white">Affilate</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/page/blank" scroll={false}>
                        <a className="text-white">Career</a>
                    </Link>
                </li> */}
                <li>
                    <Link legacyBehavior href="/page/contact-us" scroll={false}>
                        <a className="text-white">Contact</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Bussiness</h4>
            <ul className="ps-list--link">
                {/* <li>
                    <Link legacyBehavior href="/page/about-us" scroll={false}>
                        <a className="text-white">Our Press</a>
                    </Link>
                </li> */}
                <li>
                    <Link legacyBehavior href="/account/checkout" scroll={false}>
                        <a className="text-white">Checkout</a>
                    </Link>
                </li>
                {auth.isLoggedIn && (
                    <li>
                        <Link legacyBehavior href="/account/user-information" scroll={false}>
                            <a className="text-white">My account</a>
                        </Link>
                    </li>
                )}
                <li>
                    <Link legacyBehavior href="/shop" scroll={false}>
                        <a className="text-white">Shop</a>
                    </Link>
                </li>
                <p>
                    <Link legacyBehavior href={"https://www.seller.shafn.com/"} scroll={false}>
                        <a className="text-white">Become A Vendor</a>
                    </Link>
                </p>
                <p>
                    <Link legacyBehavior href="/vendors" scroll={false}>
                        <a className="text-white">Vendor Stores</a>
                    </Link>
                </p>
                <p>
                    <Link legacyBehavior href="/account/order-tracking" scroll={false}>
                        <a className="text-white">Track your order</a>
                    </Link>
                </p>
                <p>
                    <Link legacyBehavior href="/account/register" scroll={false}>
                        <a className="text-white">Sell on shafN</a>
                    </Link>
                </p>
            </ul>
        </aside>
    </div>
);

export default connect((state) => state.auth)(FooterWidgets);
