import React from "react";
import Link from "next/link";

const FooterWidgets = () => (
  <div className="ps-footer__widgets">

        <aside className="widget widget_footer">
            <h4 className="widget-title text-white footer-lists">Contact us</h4>
            <ul className="ps-list--link">
               
                <li>
                    <Link legacyBehavior href="/return" scroll={false}>
                        <a className="text-white">info@shafn.com</a>
                    </Link>
                </li>
            </ul>
        </aside>

        <aside className="widget widget_footer">
            <h4 className="widget-title text-[#161824] footer-lists text-white ">Quick links</h4>
            <ul className="ps-list--link footer-list ">
                <li>
                    <Link legacyBehavior href="/privacy-policy" scroll={false}>
                        <a className="text-white">Policy</a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href="https://shafn.com/terms-and-conditions" scroll={false}>
                        <a className="text-white">Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="https://shafn.com/shipping" scroll={false}>
                        <a className="text-white">Shipping</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="https://shafn.com/return" scroll={false}>
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
            <h4 className="widget-title text-white footer-lists">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link legacyBehavior href="https://shafn.com/page/about-us" scroll={false}>
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
                    <Link legacyBehavior href="https://shafn.com/page/contact-us" scroll={false}>
                        <a className="text-white">Contact</a>
                    </Link>
                </li>
            </ul>
        </aside>

        <aside className="widget widget_footer">
            <h4 className="widget-title text-white footer-lists">Business</h4>
            <ul className="ps-list--link ">
                {/* <li>
                    <Link legacyBehavior href="/page/about-us" scroll={false}>
                        <a className="text-white">Our Press</a>
                    </Link>
                </li> */}
                <li>
                    <Link legacyBehavior href="https://shafn.com/account/checkout" scroll={false}>
                        <a className="text-white">Checkout</a>
                    </Link>
                </li>

                    <li>
                        <Link legacyBehavior href="https://shafn.com/shop" scroll={false}>
                            <a className="text-white">My account</a>
                        </Link>
                    </li>

                <li>
                    <Link legacyBehavior href="https://shafn.com/shop" scroll={false}>
                        <a className="text-white">Shop</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href={"https://www.seller.shafn.com/"} scroll={false}>
                        <a className="text-white added-bottom">Become A Vendor</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="https://shafn.com/vendors" scroll={false}>
                        <a className="text-white added-bottom">Vendor Stores</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="https://shafn.com/account/order-tracking" scroll={false}>
                        <a className="text-white added-bottom">Track your order</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="https://shafn.com/account/register" scroll={false}>
                        <a className="text-white added-bottom">Sell on shafN</a>
                    </Link>
                </li>
            </ul>
        </aside>

  </div>
);

export default FooterWidgets;
