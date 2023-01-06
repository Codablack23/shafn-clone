import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';
import React from 'react';
import {Categories} from './categories'


export default function HeaderNav() {
    // getProducts();
    return (
        <nav className="custom--navigation">
            <ul className="nav--list">
                <li>
                    <Link href="/shop">
                        <a className="shop">Shop</a>
                    </Link>
                </li>
                {Categories.length > 0
                    ? Categories.map((category) => (
                          <li key={category.id} className="nav-dropdown">
                              <Link href={`/shop/?category=${category.id}`}>
                                  <a className="nav--link">{category.name}</a>
                              </Link>
                              {category.sub_cat?
                              <ul className="nav-dropdown-menu">
                                 
                                 {category.sub_cat.map((sub,i)=>(
                                    <div key={`${i}-sub-title`}>
                                        <h5>{sub.title}</h5>
                                        {sub.categories.map((cat,i)=>(
                                            <p key={`${i}-cat`}>{cat.name}</p>
                                        ))}
                                    </div>
                                 ))}
                              </ul>
                           :null}
                          </li>
                      ))
                    : null}
                <li>
                    <Link href = "/vendors" >
                    <a> Brand </a>  
                    </Link >
                </li> 
                <li>
                    <Link href="/account/register">
                        <a>Sales</a>
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
