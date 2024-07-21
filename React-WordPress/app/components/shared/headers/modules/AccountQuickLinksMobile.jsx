
import Link from "next/link";
import Router from "next/navigation";
// import { logOut } from "../../../../store/auth/action";
import { Dropdown, Menu } from "antd";
export default function AccountQuickLinks() {
  

    const handleLogout = (e) => {
        e.preventDefault();
        // this.props.dispatch(logOut());
        // Router.push("/");
    };

    const accountLinks = [
            {
                text: "Account Information",
                url: "/account/user-information",
            },
            // {
            //     text: 'Notifications',
            //     url: '/account/notifications',
            // },
            {
                text: "Invoices",
                url: "/account/invoices",
            },
            {
                text: "Address",
                url: "/account/addresses",
            },
            // {
            //     text: 'Recent Viewed Product',
            //     url: '/account/recent-viewed-product',
            // },
            {
                text: "Wishlist",
                url: "/account/wishlist",
            },
        ];
        const menu = (
            <Menu>
                {accountLinks.map((link) => (
                    <Menu.Item key={link.url}>
                        <Link legacyBehavior href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a href="#" onClick={this.handleLogout.bind(this)}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown menu={menu} placement="bottomLeft">
                <Link legacyBehavior
                    href="/account/user-information"
                    className="header__extra ps-user--mobile">
                    <i
                        className="icon-user text-white"
                        style={{ cursor: "pointer" }}></i>
                </Link>
            </Dropdown>
        );
}

