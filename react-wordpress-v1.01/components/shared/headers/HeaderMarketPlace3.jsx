import React, { Component } from 'react';

import Link from 'next/link';
import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import Menu from '../../elements/menu/Menu';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';
import CurrencyDropdown from './modules/CurrencyDropdown';
import LanguageSwicher from './modules/LanguageSwicher';
import { stickyHeader } from '../../../utilities/common-helpers';

class HeaderMarketPlace3 extends Component {
    constructor({ props }) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    render() {
        return (
            <header className="header header--market-place-3" id="headerSticky">
                <div className="header__top">
                    <div className="container">
                        <div className="header__left">
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
                            <Link legacyBehavior href="/home/market-place-3">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo_light.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <ElectronicHeaderActions />
                        </div>
                    </div>
                </div>
                <nav className="navigation">
                    <div className="container">
                        <div className="navigation__left">
                            <div className="menu--product-categories">
                                <div className="menu__toggle active">
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
                        <div className="navigation__right">
                            <ul className="menu menu--recent-view">
                                <li className="menu-item-has-children">
                                    <Link legacyBehavior href="/page/blank">
                                        <a>Your Recently Viewed</a>
                                    </Link>
                                    <div className="navigation__recent-products">
                                        <p>
                                            <Link legacyBehavior href="/page/blank">
                                                <a>
                                                    See all your recently viewed
                                                    items
                                                </a>
                                            </Link>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navigation__extra">
                                <li>
                                    <Link legacyBehavior href="/vendor/become-a-vendor">
                                        <a>Sell on Martfury</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link legacyBehavior href="/account/order-tracking">
                                        <a>Tract your order</a>
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
                </nav>
            </header>
        );
    }
}

export default HeaderMarketPlace3;
