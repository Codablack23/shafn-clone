import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';

import MenuCategoriesDropdown from '@/app/components/shared/menus/MenuCategoriesDropdown';
import CurrencyDropdown from '@/app/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '@/app/components/shared/headers/modules/LanguageSwicher';
import menuData from '@/public/static/data/menu';
import Menu from '@/app/components/elements/menu/Menu';

class WPNavigationDefault extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <nav className="navigation bg-white">
                <div className="ps-container">
                    <div className="navigation__left">
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="navigation__right">
                        <Menu data={menuData.WPMenu} className="menu" />
                        <ul className="navigation__extra">
                            <li>
                                <Link legacyBehavior href="/account/register">
                                    <a>Sell on shafN</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="/account/order-tracking">
                                    <a>Track your order</a>
                                </Link>
                            </li>
                            {/* <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default WPNavigationDefault;
