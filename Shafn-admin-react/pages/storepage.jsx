import React from 'react'
// import Rating from '~/components/elements/Rating';
// import SocialShareButtons from '~/components/elements/media/SocialShareButtons';
import Footer from '~/components/home/Footer';
import Facebook from '~/public/icons/Facebook';
import Linkedin from '~/public/icons/Linkedin';
import Pinterest from '~/public/icons/Pinterest';
import Star from '~/public/icons/Star';
import Twitter from '~/public/icons/Twitter';


const GridProducts = () =>  { 
    return (
         <div className='grid-products'>
                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>
               
                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>                    
                
                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>                    
                
                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>                    
                
                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>

                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>

                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>

                <div className='product'>
                    <div className='product_img'></div>
                    <p className='product_store_name'>Shafn</p>
                    <p className='product_desc'>Naïf Waterless Refill Kit Shampoo (Bottle + Refill powder) - 275m</p>
                    <p>€14.99</p>
                    <div className='flex'>
                    <button className='cart_btn'>Add To Cart</button> 
                    </div>
                </div>
            </div>
    )
}

const StorePage = () => { 

  return (
    <div className='main'>
        <div className='store-container'>
 
        <div className='cover'></div>
        <div className='avatar'></div>

        <div className='store-sec'>
            <div className='user'>
                <div className='top-sec'>
                    <div className='store_name'>STORE NAME</div>
                    <div className=''>
                        <img src="/icons/star.svg" alt="" />
                        <img src="/icons/star.svg" alt="" />
                        <img src="/icons/star.svg" alt="" />
                        <img src="/icons/star.svg" alt="" />
                        <img src="/icons/star.svg" alt="" />
                    </div>
                    <div>1 Rating</div>
                    <div>Registered on <span className='user_date'>2025-02-05 05:51:17</span></div>
                </div>
                <div className='bottom-sec'>
                    <div className='user_address'> 
                          Address: 
                          <span> undefined,</span> 
                          <span>undefined,</span> <br />
                          <span>undefined,</span>
                          <span>undefined</span>
                        </div>

                        <div className='store_social'>
                           <div>share on social media</div>
                           <div className='social_media_icons'>
                                <img className='icon' src="/icons/facebook.svg" alt="" />
                                <img className='icon' src="/icons/twitter.svg" alt="" />
                                <img className='icon' src="/icons/linkedin.svg" alt="" />
                                <img className='icon' src="/icons/pinterest.svg" alt="" />
                           </div>
                        </div>
                </div>

            </div>
            <div className='product-grid'>
                <div className='products_number'>
                    <span>271</span> Product(s) found.
                </div>
                <GridProducts />
                <div className='pages'>
                    pagination
                </div>
            </div>
        </div>
    </div>
    < Footer />
        </div>
  )
}

export default StorePage;