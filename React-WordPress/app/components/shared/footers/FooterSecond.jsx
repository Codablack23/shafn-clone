import React from 'react';
import Link from 'next/link';

const FooterSecond = () => (
    <footer className="ps-footer ps-footer--2">
        <div className="container">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        Quick links
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>Term & Condition</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>Shipping</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>Return</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/faqs">
                                                <a>FAQs</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Company</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link legacyBehavior href="/page/about-us">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/product/affiliate">
                                                <a>Affilate</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>Career</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page/contact-us">
                                                <a>Contact</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Bussiness</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link legacyBehavior href="/blog">
                                                <a>Our Press</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/account/checkout">
                                                <a>Checkout</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/account/login">
                                                <a>My account</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/shop">
                                                <a>Shop</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <aside className="widget widget_newletters">
                            <h4 className="widget-title">Newsletter</h4>
                            <form
                                className="ps-form--newletter"
                                action="#"
                                method="get">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                    <button className="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google-plus" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="ps-footer__copyright">
                <p>© 2018 Martfury. All Rights Reserved</p>
                <p>
                    <span>We Using Safe Payment For:</span>
                    <Link legacyBehavior href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/1.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link legacyBehavior href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/2.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link legacyBehavior href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/3.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link legacyBehavior href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/4.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link legacyBehavior href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/5.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    </footer>
);

export default FooterSecond;
