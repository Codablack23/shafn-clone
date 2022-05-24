import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';

const Categories = [
 {id: 16, name: 'Fashion', slug: 'fashion',} ,
 {id: 24, name: 'Clothing', slug: 'clothing',} ,
 {id: 22, name: 'Fabrics', slug: 'fabrics',} ,
 {id: 73, name: 'Beauty & Cosmetics', slug: 'beauty-cosmetic',} ,
 {id: 74, name: 'Books', slug: 'books',} ,
 {id: 71, name: 'Groceries', slug: 'groceries',} ,
 {id: 18, name: 'Home & Living', slug: 'home-living',} ,
 {id: 20, name: 'Toys & Entertainment', slug: 'toys-entertainment',} ,
 {id: 17, name: 'Accessories', slug: 'jewelry-accessories',} ,
 {id: 21, name: 'Art', slug: 'art',} ,
 {id: 19, name: 'Wedding & Party', slug: 'wedding-party'}, 
 
]

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
                    ? Categories.map((category) => (
                          <li>
                              <Link href={`/shop/?category=${category.id}`}>
                                  <a className="nav--link">{category.name}</a>
                              </Link>
                          </li>
                      ))
                    : null}
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
