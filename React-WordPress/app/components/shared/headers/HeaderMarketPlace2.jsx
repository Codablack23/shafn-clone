import React, { Component } from 'react';

import Link from 'next/link';
import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import Menu from '../../elements/menu/Menu';
import CurrencyDropdown from './modules/CurrencyDropdown';
import LanguageSwicher from './modules/LanguageSwicher';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';
import { stickyHeader } from '../../../utilities/common-helpers';

class HeaderMarketPlace2 extends Component {
    constructor({ props }) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    render() {
        const menuMarket2 = [
            {
                text: 'All Categories',
                url: '/shop',
            },
            {
                text: 'Today Deals',
                url: '/shop',
            },
            {
                text: 'Electronics',
                url: '/shop',
            },
            {
                text: 'Clothing',
                url: '/shop',
            },
            {
                text: 'Computers',
                url: '/shop',
            },
            {
                text: 'Furnitures',
                url: '/shop',
            },
            {
                text: 'Mom & baby',
                url: '/shop',
            },
            {
                text: 'Book & More',
                url: '/shop',
            },
        ];
        return (
            <header
                className="header header--standard header--market-place-2"
                id="headerSticky">
                <div className="header__top">
                    <div className="container">
                        <div className="header__left">
                            <p>Welcome to Martfury Online Shopping Store !</p>
                        </div>
                        <div className="header__right">
                            <ul className="header__top-links">
                                <li>
                                    <Link legacyBehavior href="/vendor/store-list">
                                        <a>Store Location</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link legacyBehavior href="/page/blank">
                                        <a>Track Your Order</a>
                                    </Link>
                                </li>
                                <li>
                                    <CurrencyDropdown />
                                </li>
                                <li>
                                    <LanguageSwicher />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header__content">
                    <div className="container">
                        <div className="header__content-left">
                            <Link legacyBehavior href="/home/market-place-2">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        data={menuData.product_categories}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="header__content-center">
                            <SearchHeader />
                            <p>
                                <Link legacyBehavior href="/shop">
                                    <a>iphone x</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>virtual</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>apple</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>wireless</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>simple chair</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>classic watch</a>
                                </Link>
                                <Link legacyBehavior href="/shop">
                                    <a>macbook</a>
                                </Link>
                            </p>
                        </div>
                        <div className="header__content-right">
                            <ElectronicHeaderActions />
                        </div>
                    </div>
                </div>
                <nav className="navigation">
                    <div className="container">
                        <Menu
                            data={menuMarket2}
                            className="menu menu--market-2"
                        />
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderMarketPlace2;
