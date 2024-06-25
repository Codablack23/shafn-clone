import React, { useEffect } from 'react';
import HeaderNav from '~/app/components/shared/navigation/NewNavigation';
import { stickyHeader } from '~/utilities/common-helpers';
import Logo from '~/app/components/elements/common/Logo';
import MenuCategoriesDropdown from '~/app/components/shared/menus/MenuCategoriesDropdown';
import SearchHeader from '~/app/components/shared/headers/modules/SearchHeader';
import WPNavigationDefault from '~/wp-components/shared/navigations/WPNavigationDefault';
import WPHeaderActions from '~/wp-components/shared/headers/WPHeaderActions';
import WPSearchHeader from '~/wp-components/shared/headers/WPSearchHeader';

const WPHeaderDefault = () => {
    useEffect(() => {
            window.addEventListener('scroll', stickyHeader);
    }, []);
    return (
        <header
            className="header bg-white"
            data-sticky="true"
            id="headerSticky">
            <div className="header-top bg-white">
                <div className="bg-white">
                    <div className="custom-header-center bg-white">
                        <Logo/>
                        <div className="custom-header-search header-lg">
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
