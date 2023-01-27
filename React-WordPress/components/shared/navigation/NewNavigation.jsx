import {useEffect,useState} from 'react'
import Link from "next/link";
import WPProductRepository from '~/repositories/WP/WPProductRepository';
import React from "react";
import { Categories } from "./categories";

export default function HeaderNav() {
    // getProducts();s
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
    return (
        <nav className="custom--navigation">
            <ul className="nav--list nav--center">
                <li>
                    <Link href="/shop">
                        <a className="shop">Shop</a>
                    </Link>
                </li>
                {Categories.length > 0
                    ? Categories.map((category) => (
                          <li key={category.name} className="nav-dropdown">
                              <Link href={`/shop/?category=${category.id}`}>
                                  <a className="nav--link">{category.name}</a>
                              </Link>
                              {category.sub_cat ? (
                                  <ul className="nav-dropdown-menu">
                                      {category.sub_cat.map((sub, i) => (
                                          <div key={`${i}-sub-title`}>
                                              <h5>{sub.title}</h5>
                                              {sub.categories.map((cat, i) => {
                                                  const cat2 = categoryItems?categoryItems.find(({name})=>
                                                  name.replace("&amp;","&").toLowerCase().trim() == cat.name.toLowerCase().trim() 
                                                  ):""
                                                  const cat_id = cat2?cat2.id:""
                                                 return cat2?(
                                                    <Link
                                                    href={`/shop?category=${cat_id}`}
                                                    key={`${i}-cat`}>
                                                    <a className="d-block text-black">
                                                        {cat.name}
                                                    </a>
                                                </Link>
                                                 ):null
                                                
                                               })}
                                          </div>
                                      ))}
                                  </ul>
                              ) : null}
                          </li>
                      ))
                    : null}
                <li>
                    <Link href="/vendors">
                        <a className="nav--link"> Brand </a>
                    </Link>
                </li>
                <li>
                    <Link href="/sales">
                        <a className="nav-link">Sales</a>
                    </Link>
                </li>
            </ul>
            {/* <ul className="nav--list nav--right">
             <li>
                <Link href="/account/register">
                    <a>Sell on shafN</a>
                </Link>
             </li>
             <li>
                <Link href="/account/order-tracking">
                    <a>Tract your order</a>
                </Link>
             </li>
            </ul> */}
        </nav>
    );
}
