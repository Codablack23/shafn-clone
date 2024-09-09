import {useEffect,useState} from 'react'
import Link from "next/link";
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import React from "react";
import { Categories } from "./categories";

function SubCategoryLinks({subCategories,categoryItems,categoryId}){
    if(!subCategories) return null
    return (
    <ul className="nav-dropdown-menu font-bold">
        {subCategories.map((sub, i) => (
            <SubCategory
                categoryId={categoryId}
                categoryItems={categoryItems}
                sub={sub}
                index={i}
            />
        ))}
    </ul>
    )
}

function SubCategory({sub,index,categoryId,categoryItems}){
    return (
        <div key={`${index}-sub-title`}>
            <a href={`/shop/?category=${categoryId}`}>
                <h5 style={{fontWeight:"800"}}>{sub.title}</h5>
            </a>
            {sub.categories.map((cat, i) => {
                const cat2 = categoryItems?
                categoryItems.find(({name})=>{
                    const isCategory = name.replace("&amp;","&").toLowerCase().trim() === cat.name.toLowerCase().trim()
                    return isCategory
                }):""
                const cat_id = cat2?cat2.id:""
                return(                                        // FIX LINK HERE cat_id
                <Link legacyBehavior
                    href={`/shop?category=${cat_id}`}
                    key={`${i}-cat`}>
                    <a className="d-block category-link">
                        {cat.name}
                    </a>
                </Link>
                )
            })}
        </div>
    )
}

function CategoryLink({category,categoryItems}){
    const {name,id} = category
    const subCategories = category.sub_cat
    return (
        <li key={name} className="nav-dropdown">
        <Link legacyBehavior href={`/shop/?category=${id}`}>
            <a className="nav--link">{name}</a>
        </Link>
        <SubCategoryLinks
            subCategories={subCategories}
            categoryId={id}
            categoryItems={categoryItems}
        />
    </li>
    )
}


export default function HeaderNav() {
    const [loading, setLoading] = useState(true);
    const [categoryItems, setCategoryItems] = useState(null);
    async function getCategoryItems() {
        const queries = {
            pages: 1,
            per_page: 99,
        };
        const categories = await WPProductRepository.getProductCategories(
            queries
        );
        if (categories) {
            setTimeout(function () {
                setLoading(false);
            }, 500);
            setCategoryItems(categories.items);
        }
        return categories;
    }

    useEffect(() => {
        getCategoryItems();
    }, []);

    console.log({
        categoryItems,
        Categories
    })

    return (
        <nav className="custom--navigation">
            <ul className="nav--list nav--center">
                <li>
                    <Link legacyBehavior href="/shop">
                        <a className="shop">Shop</a>
                    </Link>
                </li>
                {Categories.length > 0 && (
                    Categories.map(category=> (
                    <CategoryLink
                        category={category}
                        categoryItems={categoryItems}
                    />))
                )}
                <li>
                    <Link legacyBehavior href="/vendors">
                        <a className="nav--link"> Brand </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/sales">
                        <a className="nav-link">Sales</a>
                    </Link>
                </li>
            </ul>
            {/* <ul className="nav--list nav--right">
                <li>
                    <Link legacyBehavior href="/account/register">
                        <a>Sell on shafN</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/account/order-tracking">
                        <a>Tract your order</a>
                    </Link>
                </li>
            </ul> */}
        </nav>
    );
}
