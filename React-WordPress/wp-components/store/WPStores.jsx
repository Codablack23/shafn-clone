import React, { useEffect, useState } from "react";

import WPVendorRepository from "~/repositories/WP/WPVendorRepository";
import WPStore from "~/wp-components/elements/stores/WPStore";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonVendor from "~/components/elements/skeletons/SkeletonVendor";
import { Spin, notification, Pagination } from "antd";
import ReactHtmlParser from "react-html-parser";

const WPStores = () => {
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    async function getStores() {
        const params = {
            pages: 1,
            per_page: 10,
        };
        const WPStores = await WPVendorRepository.getStores(params);

        if (WPStores) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setStores(WPStores);
        }
    }

    async function search(e) {
        e.preventDefault();
        if (!isSearching) {
            const params = {
                page: 1,
                per_page: 10,
                search: searchKeyword,
            };

            setIsSearching(true);

            try {
                const stores = await WPVendorRepository.getStores(params);

                if (stores && stores.items.length > 0) {
                    setStores(stores);
                } else {
                    notification["info"]({
                        message: `No result found for '${searchKeyword}'`,
                    });
                }
            } catch (error) {
                notification["error"]({
                    message: "Unable to search product",
                    description:
                        error.response === undefined
                            ? ReactHtmlParser(String(error))
                            : ReactHtmlParser(error.response.data.message),
                });
            } finally {
                setIsSearching(false);
            }
        }
    }

    function handleSearchValue(e) {
        setSearchKeyword(e.target.value);
    }

    async function handlePagination(page, pageSize) {
        setCurrentPage(page);
        const params = {
            page,
            per_page: pageSize,
        };

        try {
            const stores = await WPVendorRepository.getStores(params);

            setStores(stores);
        } catch (error) {
            notification["error"]({
                message: "Unable to get stores",
                description: "Please check your data connection and try again.",
            });
        }
    }

    useEffect(() => {
        getStores();
    }, []);

    // Views
    let storesView, paginationView;
    if (!loading) {
        if (stores) {
            storesView = stores?.items.map((item) => (
                <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 "
                    key={item.id}>
                    <WPStore store={item} />
                </div>
            ));

            if (stores.totalPages > 1) {
                paginationView = (
                    <div className="pb-40">
                        <Pagination
                            total={stores && stores.totalItems}
                            pageSize={10}
                            responsive={false}
                            current={currentPage}
                            onChange={handlePagination}
                        />
                    </div>
                );
            }
        } else {
            storesView = <p>No store found.</p>;
        }
    } else {
        storesView = generateTempArray(3).map((item) => (
            <div className="col-md-4" key={item}>
                <SkeletonVendor key={item} />
            </div>
        ));
    }

    return (
        <section className="ps-store-list">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Store list</h3>
                </div>
                <div className="ps-section__content">
                    <div className="ps-section__search row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <form onSubmit={search}>
                                    <button
                                        onClick={search}
                                        disabled={isSearching}>
                                        {isSearching ? (
                                            <Spin style={{ marginTop: 5 }} />
                                        ) : (
                                            <i className="icon icon-magnifier"></i>
                                        )}
                                    </button>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Search vendor..."
                                        onChange={handleSearchValue}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">{storesView}</div>
                    {paginationView}
                </div>
            </div>
        </section>
    );
};

export default WPStores;
