import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import PanelMenu from "~/components/shared/panel/PanelMenu";
import PanelSearch from "~/components/shared/panel/PanelSearch";
import PanelCategories from "~/components/shared/panel/PanelCategories";
import Link from "next/link";
import { Categories } from '~/components/shared/navigation/categories';
import { Collapse } from 'antd';

const DrawerMobile = ({ closeEvent, visibleStatus, children }) => {
    return (
        <Drawer
            className="ps-panel--mobile"
            placement="right"
            closable={false}
            onClose={closeEvent}
            open={true}>
            {children}
        </Drawer>
    );
};
const SideBar=({shown,handleClose})=>{
    const {Panel} = Collapse

    return( 
    <aside className={`shafn-sidebar-mobile w3-card ${shown?"shown":""}`}>
        <div className="shafn-mobile-header">
            <p>Menu</p>
            <button className="close-btn" onClick={handleClose}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
        <div className="mt-5 p-3">
            <div style={{marginLeft:10,marginBlock:10}}>
                <Link href="/shop">
                    <a className={"ml-2 mt-4 mb-4 w3-text-black"}><b>Shop</b></a>
                </Link>
            </div>
            <Collapse ghost expandIconPosition="right" style={{marfinLeft:0}}>
                {Categories.map((c,i)=>(
                <Panel style={{paddingLeft:"0px"}} header={<b>{c.name}</b>} key={i+1} >
                    {c.sub_cat.map((sc,i)=>(
                    <div>
                        <p className='w-text-black'><b>{sc.title}</b></p>
                        {sc.categories.map(sub_c=>(
                            <Link href="/shop">
                            <a className="d-block mt-2 mb-2">{sub_c.name}</a>
                            </Link>
                        ))}
                    </div>
                    ))}
                </Panel>
                ))}
            </Collapse>
             <div style={{marginLeft:10,marginBlock:10}}>
             <Link href="/vendors">
                 <a className={"ml-2 mt-4 mb-4 w3-text-black"}><b>Brand</b></a>
             </Link>
         </div>
          <div style={{marginLeft:10,marginBlock:20}}>
          <Link href="/sales">
              <a className={"ml-2 mt-4 mb-4 w3-text-black"}><b>Sales</b></a>
          </Link>
      </div>
        </div>
    </aside>
    )
}
const WPNavigationBottom = () => {
    const [activeDrawer, setActiveDrawer] = useState({
        menu: true,
        cart: false,
        search: false,
        categories: false,
    });
    const [isDrawerShow, setIsDrawerShow] = useState(false);
    const handleDrawerClose = () => {
        setIsDrawerShow(false);
        setActiveDrawer({
            menu: false,
            cart: false,
            search: false,
            categories: false,
        });
    };
    const handleShowMenuDrawer = () => {
        setIsDrawerShow(true);
        setActiveDrawer({
            menu: !activeDrawer.menu,
            cart: false,
            search: false,
            categories: false,
        });
    };

    const handleShowSearchDrawer = () => {
        setActiveDrawer({
            menu: false,
            cart: false,
            search: !activeDrawer.search,
            categories: false,
        });
        setIsDrawerShow(true);
    };
    const handleShowCategoriesDrawer = () => {
        setActiveDrawer({
            menu: false,
            cart: false,
            search: false,
            categories: !activeDrawer.categories,
        });
        setIsDrawerShow(true);
    };
    // Views

    const menuDrawerView = (
        <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
                <h3>Menu</h3>
                <span className="ps-panel__close" onClick={handleDrawerClose}>
                    <i className="icon-cross"></i>
                </span>
            </div>
            <div className="ps-panel__content">
                <PanelMenu />
            </div>
        </div>
    );
    const categoriesDrawerView = (
        <div className="ps-panel--wrapper">
            <div
                className="ps-panel__header"
                style={{
                    backgroundColor: "#2A3147",
                }}>
                <h3>Categories</h3>
                <span className="ps-panel__close" onClick={handleDrawerClose}>
                    <i className="icon-cross text-white"></i>
                </span>
            </div>
            <div className="ps-panel__content">
                <PanelCategories />
            </div>
        </div>
    );
    const searchDrawerView = (
        <div className="ps-panel--wrapper">
            <div className="ps-panel__header">
                <h3>Search</h3>
                <span className="ps-panel__close" onClick={handleDrawerClose}>
                    <i className="icon-cross"></i>
                </span>
            </div>
            <div className="ps-panel__content">
                <PanelSearch />
            </div>
        </div>
    );
    let drawerView;
    if (activeDrawer.menu === true) {
        drawerView = menuDrawerView;
    }
    if (activeDrawer.search === true) {
        drawerView = searchDrawerView;
    }

    if (activeDrawer.categories === true) {
        drawerView = categoriesDrawerView;
    }

    return (
        <div className="navigation--list">
            {/* <DrawerMobile visibleStatus={isDrawerShow}>
                {drawerView}
            </DrawerMobile> */}
            <SideBar 
            shown={isDrawerShow}
            handleClose={()=>setIsDrawerShow(false)}
            />

            <div className="navigation__content">
                {/* <a
                    className={`navigation__item ${
                        activeDrawer.menu === true && 'active'
                    }`}
                    onClick={handleShowMenuDrawer}>
                    <i className="icon-menu"></i>
                    <span> Menu</span>
                </a> */}
                <a
                    className={`navigation__item`}
                    onClick={()=>setIsDrawerShow(prev=>!prev)}>
                    <i className="icon-list4"></i>
                </a>
                {/* <a
                    className={`navigation__item ${
                        activeDrawer.search === true && 'active'
                    }`}
                    onClick={handleShowSearchDrawer}>
                    <i className="icon-magnifier"></i>
                    <span> Search</span>
                </a> */}
                <Link href="/account/shopping-cart">
                    <a className="navigation__item">
                        <i className="icon-bag2"></i>
                        <span> Cart</span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default connect((state) => state.setting)(WPNavigationBottom);
