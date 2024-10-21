import { CheckoutItem } from "@/redux-store/checkout-items";

interface Product extends CheckoutItem{
    id:string | number;
    variation_id:string | number;
    name:string,
    quantity:number,
    price:number,
}

interface CheckoutProductsProps{
    products:Product[];
}

function CheckoutProduct(product:Product){
    return (
        <a key={`${product.id}-${product.variation_id}`}>
        <strong>
            {product.name}
            <span>x{product.quantity}</span>
        </strong>
        <small>${product.quantity * product.price}</small>
    </a>
    )
}


export function CheckoutProducts (props:CheckoutProductsProps){
    const {products} = props;
    if(products.length > 0){
        return products.map(product=><CheckoutProduct {...product} key={product.id}/>)
    }
    return <p className="text-center">No Products in Checkout</p>
}