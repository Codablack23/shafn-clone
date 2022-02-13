import React from 'react';
import Link from 'next/link';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title text-white">Contact us</h4>
            <div className="widget_content">
                <p>
                    <a href="mailto:info@shafn.com<" className="text-white">info@shafn.com</a>
                </p>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Policy</a>
                    </Link>
                </li>

                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Shipping</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Return</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/faqs">
                        <a className="text-white">FAQs</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">
                        <a className="text-white">About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Affilate</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a className="text-white">Career</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/contact-us">
                        <a className="text-white">Contact</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white">Bussiness</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">
                        <a className="text-white">Our Press</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/checkout">
                        <a className="text-white">Checkout</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/user-information">
                        <a className="text-white">My account</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a className="text-white">Shop</a>
                    </Link>
                </li>
                <p>
                    <i className="icon-store"></i>
                <Link href="/vendor/become-a-vendor">
                    <a className="text-white">Become A Vendor</a>
                </Link>
                </p>
                <p>
                  <Link href="/vendors">
                    <a className="text-white">Vendor Stores</a>
                </Link>
                </p>
            </ul>
        </aside>
    </div>
);

export default FooterWidgets;
