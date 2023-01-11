import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';
import React from 'react';
import {Categories} from './categories'


export default function HeaderNav() {
    // getProducts();
    return (
        <nav className="custom--navigation">
            <ul className="nav--list nav--center">
                <li>
                    <Link href="/shop">
                        <a className="shop">Shop</a>
                    </Link>
                </li>
                {Categories.length > 0
                    ? Categories.map((category,i1) => (
                          <li key={i1} className="nav-dropdown">
                              <Link href={`/shop/?category=${category.id}`}>
                                  <a className="nav--link">{category.name}</a>
                              </Link>
                              {category.sub_cat?
                              <ul className="nav-dropdown-menu">
                                 
                                 {category.sub_cat.map((sub,i)=>(
                                    <div key={`${Math.random()}-${i}-${i1}-sub-title`}>
                                        <h5>{sub.title}</h5>
                                        {sub.categories.map((cat,i)=>(
                                            <Link href={"/"} key={`${i}-cat`}>
                                             <a className="d-block text-black">{cat.name}</a>
                                            </Link>
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
                    <a className='nav--link'> Brand </a>  
                    </Link >
                </li> 
                <li>
                    <Link href="/account/register">
                        <a className='nav-link'>Sales</a>
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
