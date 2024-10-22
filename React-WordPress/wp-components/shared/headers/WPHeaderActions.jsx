"use client";
import Link from "next/link";
import AccountQuickLinks from "~/app/components/shared/headers/modules/AccountQuickLinks";
import WPMiniCart from "~/wp-components/shared/headers/WPMiniCart";
import { useAppSelector } from "@/redux-store/hooks";
import AutoCountryDetector from "@/app/components/AutoCountryDetector";
import useAuth from "@/redux-store/hooks/useAuth";

export default function  WPHeaderActions(){
        const {authState:auth} = useAuth()

        const compare = useAppSelector(state=>state.compare)
        const wishlist = useAppSelector(state=>state.wishlist)

        // const { compare, wishlist, auth } = this.props;
        // Views
        let accountView = <AccountQuickLinks isLoggedIn={auth.isLoggedIn} />;
        return (
            <div className="" style={{flex:"2"}}>
                <div
                    className="d-flex"
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                        marginBottom:"8px"

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
                    <AutoCountryDetector/>
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
                                    height: 16,
                                    right: "-2px",
                                    width: 16,
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


// const mapStateToProps = (state) => {
//     return state;
// };

// export default connect(mapStateToProps)(WPHeaderActions);
