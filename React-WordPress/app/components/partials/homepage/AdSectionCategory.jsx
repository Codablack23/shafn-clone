import Link from "next/link"

function Category({category,product}){

    const getImage = () => {
        if(!product) return null
        if(product.images[0]) return product.images[0].src
        if(product.images) return product.images
        return null
    }
    const img = getImage()
    return (
        <Link legacyBehavior href={`/shop?category=${category.id}`}>
        <div>
            <div className="item">
                <img src={img} alt={category.name} />
            </div>
            <p className="text-white">{category.name}</p>
        </div>
       </Link>
    )
}

export default function AdSectionCategory({products,categories}){
  if(categories.length > 0){
    return (
        <div className="ps-category">
                {
                    categories.map((category,i) => (
                        <Category
                        category={category}
                        product={products?products.length > 0?products[i]:null:null}
                        />
                    ))
                }
        </div>
    )}

    return (
        <div className="ps-category">
            {new Array(4).fill("").map(category=>(
                        <div className="ps-category">
                            <div className="item"></div>
                            <p className="text-white">Loading Category</p>
                    </div>
            ))}
        </div>
    )
}