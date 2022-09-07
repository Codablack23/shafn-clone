import React from "react";
import Rating from "~/components/elements/Rating";
import SocialShareButtons from "~/components/elements/media/SocialShareButtons";

const WPStoreInformation = ({ store }) => {
    // views
    let storeBannerView;
    let storeGravatarView;

    if (store.banner) {
        storeBannerView = <img src={store.banner} alt={store.store_name} />;
    } else {
        storeBannerView = (
            <img src="/static/img/vendor/vendor-store.jpg" alt="martfury" />
        );
    }

    if (store.gravatar) {
        storeGravatarView = <img src={store.gravatar} alt={store.store_name} />;
    } else {
        storeGravatarView = (
            <img src="/static/img/vendor/vendor-store.jpg" alt="martfury" />
        );
    }

    return (
        <div className="ps-block--vendor m-md-0 m-sm-auto w3-white">
            {/* <div className="ps-block__thumbnail">{storeBannerView}</div>
            <div className="ps-block__thumbnail">{storeGravatarView}</div> */}
            <div className="ps-block__container w3-white">
                <div className="ps-block__header">
                    <h4>{store.store_name}</h4>

                    <Rating
                        rating={Math.round(Number(store.rating.rating)) || 0}
                    />
                    <p>
                        {store.rating.count === 0
                            ? "No Ratings"
                            : store.rating.count === 1
                            ? "1 Rating"
                            : `${store.rating.count} Ratings`}
                    </p>
                    <p>
                        Registered on <strong>{store.registered}</strong>
                    </p>
                </div>
                <div className="ps-block__divider"></div>
                <div className="ps-block__content">
                    <p>
                        <strong>Address:</strong>{" "}
                        {`${store.address.street_1}, `}
                        {`${store.address.city}, `}
                        {`${store.address.state}, `}
                        {`${store.address.country}, `}
                        {`${store.address.zip}, `}
                    </p>
                    {store.show_email && (
                        <p>
                            <strong>Email:</strong>
                            {store.email}
                        </p>
                    )}
                </div>
                {/* <div className="ps-block__footer">
                    <p>
                        Call us directly
                        <strong>{store.phone}</strong>
                    </p>
                    <p>or Or if you have any question</p>
                    <a
                        className="ps-btn ps-btn--fullwidth"
                        href=""
                        style={{ borderRadius: "30px" }}>
                        Contact Seller
                    </a>
                </div> */}
                <div className="share m-3">
                    <p className="w3-text-grey">Share on social media</p>
                    <div className="d-flex justify-content-between">
                        <SocialShareButtons url={window.location.href} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WPStoreInformation;
