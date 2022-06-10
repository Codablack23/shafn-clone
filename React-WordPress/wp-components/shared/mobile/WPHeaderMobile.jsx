import React from 'react';
import Link from 'next/link';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import MobileHeaderActions from '~/components/shared/headers/modules/MobileHeaderActions';
import WPMobileHeaderActions from '~/wp-components/shared/mobile/WPMobileHeaderActions';
import WPSearchHeader from '~/wp-components/shared/headers/WPSearchHeader';
import Logo from '~/components/elements/common/Logo';

const WPHeaderMobile = () => {
    return (
        <header className="header--mobile bg-white">
            <div className="header-mobile-top w-100" style={{
                backgroundColor:'#2A3147',
            }}>
                <div className="d-flex align-items-center">
                    <p className='text-white'>
                        <Link href={"/"}>
                            <a className="ps__logo-mobile">
                                <img src={'/static/img/Logo-dark.png'} alt="" />
                            </a>
                        </Link>
                    </p>
                </div>
                <div className='flex'>
                <WPMobileHeaderActions />
                </div>
                {/* <div className="header__right">
                    <ul className="navigation__extra">
                        <li>
                            <Link href="/vendor/become-a-vendor">
                                <a className='text-white'>Sell on Martfury</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/order-tracking">
                                <a className='text-white'>Tract your order</a>
                            </Link>
                        </li>
                        <li>
                            <CurrencyDropdown />
                        </li>
                        <li>
                            <LanguageSwicher />
                        </li>
                    </ul>
                </div> */}
            </div>
            {/* <div className="navigation--mobile bg-white">
                <div className="navigation__left bg-white">
                    <Link href="/">
                        <a
                            className="ps-logo"
                            style={{
                                color: '#2A3147',
                                fontSize: '30px',
                                fontWeight: 900,
                            }}>
                            ShafN
                        </a>
                    </Link>
                </div>
                <WPMobileHeaderActions />
            </div> */}
            <div className='search-mobile'>
                <WPSearchHeader/>
            </div>
        </header>
    );
};

export default WPHeaderMobile;
