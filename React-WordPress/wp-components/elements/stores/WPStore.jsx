import React from "react";
import Rating from "~/components/elements/Rating";
import Link from "next/link";

const WPStore = ({ store }) => {
    let query = `${store.store_name.toLowerCase().replace(/ /g, "-")}-${
        store.id
    }`.trim();

    return (
        <article className="ps-block--store-2">
            <div
                className="ps-block__content bg--cover"
                style={{
                    background: `url('/static/img/vendor/store/default-store-banner.png')`,
                }}>
                <figure>
                    <h4>{store.store_name}</h4>
                    <div className="ps-block__rating">
                        <Rating />
                    </div>
                    <p>
                        {store.address.street_1} {store.address.city}{" "}
                        {store.address.state} {store.address.zip},{" "}
                        {store.address.country}
                    </p>
                    {/* <p>
                        <i className="icon-telephone"></i>{' '}
                        {store.phone && store.phone}
                    </p> */}
                </figure>
            </div>
            <div className="ps-block__author p-3">
                <a className="store-profile" href="#">
                    <img src={store.gravatar} alt="martfury" />
                </a>
                <Link legacyBehavior href="/store/[pid]" as={`/store/${query}`}>
                    <a className="ps-btn"> Visit Store</a>
                </Link>
            </div>
        </article>
    );
};

export default WPStore;
