import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';

const Categories = [
 {id: 70, name: 'Clothing', slug: 'clothing',} ,
 {id: 73, name: 'Beauty & Cosmetics', slug: 'beauty-cosmetic',} ,
 {id: 74, name: 'Books', slug: 'books',} ,
 {id: 17, name: 'Accessories', slug: 'jewelry-accessories',} ,
 {id: 21, name: 'Art', slug: 'art',} ,
 {id: 78, name: 'Bath & Body', slug: 'bath-body', },
 {id: 77, name: 'Beauty Sets', slug: 'beauty-sets', },
 {id: 67, name: 'Canvas', slug: 'canvas', },
 {id: 24, name: 'Clothes', slug: 'clothes', },
 {id: 79, name: 'Essential Oils', slug: 'essential-oils'}, 
 
]


// async function getProducts() {
//     console.log(await ProductRepository.getProductCategories());
// }

 export default function HeaderNav(){
    return(
        <nav className="custom--navigation">
            <ul className="nav--list nav--center">
                <li>
                    <Link href="/shop">
                        <a className="nav--link shop">Shop</a>
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
