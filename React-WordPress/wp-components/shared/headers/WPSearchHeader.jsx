"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import WPProductSearchResult from "@/wp-components/elements/products/WPProductSearchResult";
import WPProductRepository from "@/repositories/WP/WPProductRepository";
import { Spin } from "antd";

const exampleCategories = [
    "All",
    "Babies & Moms",
    "Books & Office",
    "Cars & Motocycles",
    "Clothing & Apparel",
    " Accessories",
    "Bags",
    "Kid’s Fashion",
    "Mens",
    "Shoes",
    "Sunglasses",
    "Womens",
    "Computers & Technologies",
    "Desktop PC",
    "Laptop",
    "Smartphones",
    "Consumer Electrics",
    "Air Conditioners",
    "Accessories",
    "Type Hanging Cell",
    "Audios & Theaters",
    "Headphone",
    "Home Theater System",
    "Speakers",
    "Car Electronics",
    "Audio & Video",
    "Car Security",
    "Radar Detector",
    "Vehicle GPS",
    "Office Electronics",
    "Printers",
    "Projectors",
    "Scanners",
    "Store & Business",
    "Refrigerators",
    "TV Televisions",
    "4K Ultra HD TVs",
    "LED TVs",
    "OLED TVs",
    "Washing Machines",
    "Type Drying Clothes",
    "Type Horizontal",
    "Type Vertical",
    "Garden & Kitchen",
    "Cookware",
    "Decoration",
    "Furniture",
    "Garden Tools",
    "Home Improvement",
    "Powers And Hand Tools",
    "Utensil & Gadget",
    "Health & Beauty",
    "Equipments",
    "Hair Care",
    "Perfumer",
    "Wine Cabinets",
];

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const WPSearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    function handleClearKeyword() {
        setKeyword("");
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Router.push();
        location.assign(`/search?keyword=${keyword}`);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    per_page: 5,
                    search: keyword,
                };
                const products = WPProductRepository.getProducts(queries);
                products.then((result) => {
                    setLoading(false);
                    setResultItems(result);
                    setIsSearch(true);
                });
            } else {
                setIsSearch(false);
                setKeyword("");
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.items.length > 0) {
            if (resultItems.items.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link legacyBehavior href="/search">
                            <a>See all results</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.items.map((product) => (
                <WPProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== "") {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    selectOptionView = exampleCategories.map((option) => (
        <option value={option} key={option}>
            {option}
        </option>
    ));

    return (
        <form
            className="d-flex w-100 rounded-pill"
            style={{
                height: "42px",
                // marginTop: "7px",
                flex:2
            }}
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div
                className="rounded-pill"
                style={{
                    width: "22.5%",
                }}>
                <div
                    className="form-control"
                    style={{
                        backgroundColor: "#2A3147",
                        color: "white",
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        border: "none",
                        height: "42px",
                    }}>
                    {/* {selectOptionView} */}
                </div>
            </div>
            <div
                className="d-flex align-items-center bg-light"
                style={{
                    width: "55%",
                    height: "42px",
                }}>
                <input
                    ref={inputEl}
                    type="search"
                    className="form-control bg-light"
                    placeholder="I'm shopping for..."
                    value={keyword}
                    style={{
                        border: "none",
                        height: "42px",
                    }}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <button
                title="Search"
                aria-label="Search"
                onClick={handleSubmit}
                style={{
                    backgroundColor: "#2A3147",
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    minWidth: "22.5%",
                    border: "none",
                }}>
                <i
                    className="fa fa-search text-white"
                    aria-hidden="true"
                    style={{ fontSize: "20px" }}></i>
            </button>

            {/* <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div> */}
        </form>
    );
};

export default WPSearchHeader;
