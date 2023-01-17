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
                    className="w-100 d-flex justify-content-between"
                    style={{
                        alignItems: "center",
                    }}>
                    <Link href="/account/compare">
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
                            <span>
                                <i>{compare && compare.compareTotal}</i>
                            </span>
                        </span>
                    </Link>
                    <Link href="/account/wishlist">
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
                            <span>
                                <i>{wishlist.wishlistTotal}</i>
                            </span>
                        </span>
                    </Link>
                    {/* <Link href="/">
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
