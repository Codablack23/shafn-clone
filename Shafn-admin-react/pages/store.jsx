import React, { useEffect, useMemo, useState } from 'react'
import AuthProvider from '~/components/auth/AuthProvider';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import ContainerDashboard from '~/components/layouts/ContainerDashboard';
import { connect } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { Image, notification, Skeleton } from 'antd';
import Link from 'next/link';


const defaultStoreData = {
    store_name: "N/A",
    registered: "N.A",
    address: {
        city: "N/A",
        country: "N/A",
        state: "N/A",
        street_1: "N/A",
        street_2: "N/A",
        zip: "N/A"
    },
    rating: {
        rating: 0,
        count: 0
    },
    social:{
        fb:"",
        flickr:"",
        instagram:"",
        linkedin:"",
        pinterest:"",
        threads:"",
        twitter:"",
        youtube:""
    }
}


const StoreBannerHeader = ({ store }) => {

    console.log({ store })


    return (
        <header className="store-header">
            <div className="store-banner">
                {store && store.banner
                    ? (
                        <Image
                            src={store.banner}
                            alt={store.store_name}
                            width={"100%"}
                            preview={false}
                            style={{ objectFit: "cover" }}
                        />
                    )
                    : <i className="bi bi-card-image" />
                }
            </div>
            <div className='store-image-container'>
                {store && store.gravatar
                    ? (
                        <Image
                            src={store.gravatar}
                            width={"115px"}
                            height={115}
                            preview={false}
                            alt={store.store_name}
                        />
                    )
                    : <i className="bi bi-person-fill" />
                }
            </div>
        </header>
    )
}

const StoreDetails = ({ store }) => {
    const getRating = () => {
        if (store && store.rating) {
            return store.rating.rating || 0
        }
        return 0
    }
    const getStoreData = () => {
        if (!store) {
            return defaultStoreData;
        }
        return store
    }
    console.log(getStoreData())
return (
    <aside className="store-details-container">
        <p className="title">{store ? store.store_name : ""}</p>
        <StoreRating rating={getRating()} />
        <br />
        <p style={{marginBottom:"0px"}}><b>Registered:</b> {store ? store.registered : ""}</p>
        <p style={{marginBottom:"0px"}}><b>Address:</b> <span>{getStoreData().address.street_1}</span>  <span>{ getStoreData().address.city }</span> <span>{getStoreData().address.state}</span> <span>{getStoreData().address.country}</span></p>
        <p><b>Email:</b> {store ? store.email : "N/A"}</p>
        <hr />
    </aside>
)
}

const StoreRating = ({ rating }) => {
    const ratingCount = rating ? parseInt(rating) : 0
    const stars = ratingCount > 5 ? 5 : ratingCount
    return <div className="stars-container">
        {new Array(stars).fill("ratins").map(() => {
            return <i style={{ color: "#ffd600" }} className="bi bi-star-fill" />
        })}
        {new Array(5 - stars).fill("ratins").map(() => {
            return <i style={{ color: "#ffd600" }} className="bi bi-star" />
        })}
    </div>
}

const StoreProducts = ({ products,loading }) => {

    if(loading){
        return <LoadingProducts/>
    }

    return (
        <div>
            <br />
            <h4>All Products({products.length})</h4>
            <section className="store-products">
                {products.map((product)=>{
                    console.log({product})
                    return (
                        <div className="store-product">
                            <div className="store-product-image-container">
                                <Image
                                 preview={false}
                                 width={"100%"}
                                 src={product.images[0].src}
                                />
                            </div>
                            <hr />
                            <p style={{marginBottom:"2px"}}>{product.name}</p>
                            <p style={{marginBottom:"2px"}}><b>€{product.price}</b></p>
                            <StoreRating rating={product.rating_count}/>
                            <Link href={`/products/edit-product/${product.id}`}><button className="edit-product-btn">Edit Product</button></Link>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

const LoadingProducts = () => {
    return (
       <div>
        <br />
        <br />
         <div className="store-products">{
            new Array(4).fill("").map((_, i)=>(
                <div>
                    <Skeleton.Button block  active  style={{height:"200px"}}/>
                    <Skeleton paragraph={{rows:3}}/>
                </div>
            ))
        }</div>
       </div>
    )
}


function useStoreProducts() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const next = () => {
        setPage(prev => {
            if (totalPages > prev) {
                return prev + 1
            }
        })
    }
    const prev = () => {
        setPage(prev => {
            if (prev > 1) {
                return prev - 1
            }
        })
    }

    const goToPage = (pageNumber) => {
        setPage(pageNumber)
    }

    const params = { page, per_page: 12 };

    const getProducts = useMemo(() => {
        return async function () {
            try {
                const products = await ProductRepository.getProducts(params)
                if (products && products.items) {
                    setProducts(products.items)
                    setTotalPages(products.totalPages)
                }
            } catch (error) {
                notification.error({
                    description: error.message || "Sorry could not get your store products please check your internet ans try again",
                })
            }
            finally {
                setLoading(false)
            }
        }
    }, [page])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return { products, loading, prev, next, goToPage }

}

function Page(props) {

    const { store } = props
    const { loading, products } = useStoreProducts()

    return (
        <AuthProvider>
            <DefaultLayout>
                <ContainerDashboard title="My Store">
                    <section>
                        <StoreBannerHeader store={store} />
                        <div>
                            <StoreDetails store={store} />
                            <StoreProducts products={products} loading={loading}/>
                        </div>
                    </section>
                </ContainerDashboard>
            </DefaultLayout>
        </AuthProvider>
    )
};

export default connect((state) => state.profile)(Page)