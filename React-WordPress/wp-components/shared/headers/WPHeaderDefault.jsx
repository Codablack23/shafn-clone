import React, { useEffect } from 'react';

import { stickyHeader } from '~/utilities/common-helpers';
import Logo from '~/components/elements/common/Logo';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import WPNavigationDefault from '~/wp-components/shared/navigations/WPNavigationDefault';
import WPHeaderActions from '~/wp-components/shared/headers/WPHeaderActions';
import WPSearchHeader from '~/wp-components/shared/headers/WPSearchHeader';

const WPHeaderDefault = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);
    return (
        <header
            className="header bg-white"
            data-sticky="true"
            id="headerSticky">
            <div className="header__top bg-white">
                <div className="ps-container bg-white">
                    <div className="header__left bg-white">
                        <Logo />
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="header__center bg-white">
                        <WPSearchHeader />
                    </div>
                    <div className="header__right bg-white">
                        <WPHeaderActions />
                    </div>
                </div>
            </div>
            <WPNavigationDefault />
        </header>
    );
};

export default WPHeaderDefault;
