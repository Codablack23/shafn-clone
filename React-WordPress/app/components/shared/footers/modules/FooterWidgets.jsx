import React, { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { DashboardDomain } from "@/repositories/WP/WPRepository";
import Modal from "./Modal.jsx";

const FooterWidgets = (auth) => {
    // const router = useRouter()

    // const [showModal, setShowModal] = useState(false);

    // const Modal = ({ onClose, children, title }) => {
    //     const handleCloseClick = (e) => {
    //         e.preventDefault();

    //         setTimeout(() => {
    //             onClose();
    //         }, 5000);
    //     }
    // };


    // const handleClick = () => {
    //     setTimeout(() => {
    //         router.push('/');
    //     }, 5000);
    // }




    return (

    <div className="ps-footer__widgets">

        <aside className="widget widget_footer">
            <h4 className="widget-title text-white ">Contact us</h4>
            <ul className="ps-list--link">
               
                <button openModal={()=>setIsOpen(true)}>        
                    <Link legacyBehavior href="#" scroll={false}>
                        <a className="text-white">info@shafn.com</a>
                    </Link>
                </button>

                {/* {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        Hello from the modal!
                    </Modal>
                } */}
                    
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title text-white ">Quick links</h4>
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
            <h4 className="widget-title text-white">Business</h4>
            <ul className="ps-list--link ">
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
                <li>
                    <Link legacyBehavior href={"https://www.seller.shafn.com/"} scroll={false}>
                        <a className="text-white added-bottom">Become A Vendor</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/vendors" scroll={false}>
                        <a className="text-white added-bottom">Vendor Stores</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/account/order-tracking" scroll={false}>
                        <a className="text-white added-bottom">Track your order</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/account/register" scroll={false}>
                        <a className="text-white added-bottom">Sell on shafN</a>
                    </Link>
                </li>
            </ul>
        </aside>
        
    </div>
) };

export default connect((state) => state.auth)(FooterWidgets);
