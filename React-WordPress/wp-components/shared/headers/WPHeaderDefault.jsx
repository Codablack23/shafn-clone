import React, { useEffect } from 'react';
import HeaderNav from '~/components/shared/navigation/NewNavigation';
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
                    <div className="custom-header-center bg-white">
                        <Logo/>
                        <div className="custom-header-search">
                         <WPSearchHeader />
                        </div>
                        <WPHeaderActions />
                    </div>
                </div>
            </div>
            {/* <WPNavigationDefault /> */}
            <HeaderNav />
        </header>
    );
};

export default WPHeaderDefault;
