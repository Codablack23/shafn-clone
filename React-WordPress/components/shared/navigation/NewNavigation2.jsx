import Link from 'next/link';
import { Menu } from '@headlessui/react'
import ProductRepository from '~/repositories/ProductRepository';
import React from 'react';

const Categories = [

    { id: 16, name: 'Makeup', slug: 'make-up', },
    { id: 24, name: 'Face', slug: 'face', },
    { id: 22, name: 'Body', slug: 'body', },
    { id: 73, name: 'Hair', slug: 'hair', },
    { id: 74, name: 'Perfume', slug: 'perfume', }
]

export default function HeaderNav() {
    // getProducts();
    return ( <nav className = "custom--navigation" >
        <ul className = "nav--list nav--center">
        <li>
        <Link href = "/shop">
        <a className = "shop" > Shop </a> 
        </Link> 
        </li> {
            Categories.length > 0 ?
                Categories.map((category) => ( 
                    <li key = { category.id }>
                    <Link href = { `/shop/?category=${category.id}` }>
                    <a className = "nav--link" > { category.name } </a> 
                    </Link> 
                    </li>
                )) :
                null
                } 
                    <li>
                    <Link href = "/vendors" >
                    <a> Brand </a>  
                    </Link >
                    </li> 
                </ul> 
                <ul className="nav--list nav--right">
                       
                </ul> 
        </nav>
    );
}



