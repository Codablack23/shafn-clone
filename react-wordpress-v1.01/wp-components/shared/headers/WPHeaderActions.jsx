import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import AccountQuickLinks from "~/components/shared/headers/modules/AccountQuickLinks";
import WPMiniCart from "~/wp-components/shared/headers/WPMiniCart";

class WPHeaderActions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { compare, wishlist, auth } = this.props;
        // Views
        let accountView = <AccountQuickLinks isLoggedIn={auth.isLoggedIn} />;
        return (
            <div className="header__actions">
                <div
                    className="w-100 d-flex justify-content-around"
                    style={{
                        alignItems: "center",
                    }}>
                    {/* <Link legacyBehavior href="/account/compare">
                        <span
                            title="Notifications"
                            className="header__extra w3-hover-lightgrey"
                            style={{
                                cursor: "pointer",
                            }}>
                            <i
                                className="bi bi-bell"
                                style={{
                                    fontSize: "22px",
                                    color: "#2A3147",
                                }}></i>
                            <span style={{height:17,right:"-2px",width:17}}>
                                <i>{compare && compare.compareTotal}</i>
                            </span>
                        </span>
                    </Link> */}
                    <Link legacyBehavior href="/account/wishlist">
                        <span
                            title="Wishlist"
                            className="header__extra w3-hover-lightgrey"
                            style={{
                                cursor: "pointer",
                            }}>
                            <i
                                className="bi bi-heart"
                                style={{
                                    fontSize: "22px",
                                    color: "#2A3147",
                                }}></i>
                            <span
                                className="sub"
                                style={{
                                    height: 17,
                                    right: "-2px",
                                    width: 17,
                                }}>
                                <i>{wishlist.wishlistTotal}</i>
                            </span>
                        </span>
                    </Link>
                    {/* <Link legacyBehavior href="/">
                    <a className="header__extra">
                        <i className="fa fa-bell"></i>
                        <span>
                            <i>{wishlist.wishlistTotal}</i>
                        </span>
                    </a>
                </Link> */}
                    <WPMiniCart />
                    {accountView}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(WPHeaderActions);
