import React from "react";
import Link from "next/link";

const FooterWidgets = () => (
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
        <Link href={"https://shafn.com/page/blank"} scroll={false}>
            <a className="text-white">Policy</a>
          </Link>
        </li>

        <li>
        <Link href={"https://shafn.com/page/blank"} scroll={false}>
            <a className="text-white">Term & Condition</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/page/blank"} scroll={false}>
            <a className="text-white">Shipping</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/page/blank"} scroll={false}>
            <a className="text-white">Return</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/page/faqs"} scroll={false}>
            <a className="text-white">FAQs</a>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className="widget widget_footer">
      <h4 className="widget-title text-white">Company</h4>
      <ul className="ps-list--link">
        <li>
        <Link href={"https://shafn.com/page/about-us"} scroll={false}>
            <a className="text-white">About Us</a>
          </Link>
        </li>
        {/* <li>
                    <Link href="/page/blank" scroll={false}>
                        <a className="text-white">Affilate</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank" scroll={false}>
                        <a className="text-white">Career</a>
                    </Link>
                </li> */}
        <li>
        <Link href={"https://shafn.com/page/contact-us"} scroll={false}>
            <a className="text-white">Contact</a>
          </Link>
        </li>
      </ul>
    </aside>
    <aside className="widget widget_footer">
      <h4 className="widget-title text-white">Business</h4>
      <ul className="ps-list--link">
        {/* <li>
                    <Link href="/page/about-us" scroll={false}>
                        <a className="text-white">Our Press</a>
                    </Link>
                </li> */}
        <li>
        <Link href={"https://shafn.com/account/checkout"} scroll={false}>
            <a className="text-white">Checkout</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/shop"} scroll={false}>
            <a className="text-white">Shop</a>
          </Link>
        </li>
        <li>
          <Link href={"https://www.seller.shafn.com/"} scroll={false}>
            <a className="text-white">Become A Vendor</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/vendors"} scroll={false}>
            <a className="text-white">Vendor Stores</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/account/order-tracking"} scroll={false}>
            <a className="text-white">Track your order</a>
          </Link>
        </li>
        <li>
        <Link href={"https://shafn.com/account/register"} scroll={false}>
            <a className="text-white">Sell on shafN</a>
          </Link>
        </li>
      </ul>
    </aside>
  </div>
);

export default FooterWidgets;
