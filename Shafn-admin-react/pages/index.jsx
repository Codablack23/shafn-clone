import React from "react"
import Link from "next/link"
import Slider from 'react-slick';
import VendorMileStone from "~/components/partials/vendors/VendorMilestone";


const carouselSetting = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
      {
          breakpoint: 1366,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
          },
      },
      {
          breakpoint: 1200,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              arrows: false,
          },
      },
      {
          breakpoint: 768,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
          },
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false,
          },
      },
  ],
};
function Testimonials(){
  return(
    <div className="ps__testimonials ps__page-container">
       <h4 className="heading">WHAT CLIENT SAY</h4>
        <Slider {...carouselSetting}>
           <div className="ps__testimony">
            <div className="content">
              <div className="header">
              <img src="/img/user/2.png" alt="" />
              </div><br />
              <div className="testimony-content p-5">
                <p className="text-right pb-2"> <i className="icon-quote-close quote-icon"></i></p>
                <h4>
                    Kanye West <small>Head Chef at BBQ Restaurant</small>
                </h4>
                <p>
                    Sed elit quam, iaculis sed semper sit amet udin vitae nibh.
                    at magna akal semperFusce commodo molestie luctus.Lorem
                    ipsum Dolor tusima olatiup.
                </p>
              </div>
            </div>
           </div>
           <div className="ps__testimony">
            <div className="content">
            <header className="header">
              <img src="/img/user/3.jpg" alt="" />
             </header><br />
             <div className="testimony-content p-5">
                <p className="text-right pb-2"> <i className="icon-quote-close quote-icon"></i></p>
                <h4>
                  Anabella Kleva <small>Boss at TocoToco</small>
                </h4>
                <p>
                    Sed elit quam, iaculis sed semper sit amet udin vitae nibh.
                    at magna akal semperFusce commodo molestie luctus.Lorem
                    ipsum Dolor tusima olatiup.
                </p>
            </div>
            </div>
           </div>
        </Slider>
    </div>
  )
}
const FAQS=()=>{
  return(
    <div className="ps__page-container faqs pt-5 pb-5" id="faqs">
      <div className="header text-center">
        <h4 className="title">frequently asked questions</h4>
        <p className="subtitle">
        Here are some common questions about selling on Martfury
        </p>
      </div>
      <section className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 question">
          <figure>
              <figcaption>How do fees work on Martfury?</figcaption>
              <p>
                  Joining and starting a shop on Martfury is free. There are three
                  basic selling fees: a listing fee, a transaction fee, and a payment
                  processing fee.
              </p>
              <p>
                  It costs USD 0.20 to publish a listing to the marketplace. A listing
                  lasts for four months or until the item is sold. Once an item sells,
                  there is a 3.5% transaction fee on the sale price (not including
                  shipping costs). If you accept payments with PayPal, there is also a
                  payment processing fee based on their fee structure.
              </p>
              <p>
                  Listing fees are billed for $0.20 USD, so if your bank’s currency is
                  not USD, the amount may differ based on changes in the exchange
                  rate.
              </p>
          </figure>
          <figure>
              <figcaption>What do I need to do to create a shop?</figcaption>
              <p>
                  It’s easy to set up a shop on Martfury. Create an Martfury account
                  (if you don’t already have one), set your shop location and
                  currency, choose a shop name, create a listing, set a payment method
                  (how you want to be paid), and finally set a billing method (how you
                  want to pay your Martfuryfees).
              </p>
          </figure>
       </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 question">
          <figure>
              <figcaption>How do I get paid?</figcaption>
              <p>
                  If you accept payments with PayPal, funds from PayPal sales on
                  Martfury will be deposited into your PayPal account. We encourage
                  sellers to use a PayPal Business account and not a Personal account,
                  as personal accounts are subject to monthly receiving limits and
                  cannot accept payments from buyers that are funded by a credit card.
              </p>
              <p>
                  It costs USD 0.20 to publish a listing to the marketplace. A listing
                  lasts for four months or until the item is sold. Once an item sells,
                  there is a 3.5% transaction fee on the sale price (not including
                  shipping costs). If you accept payments with PayPal, there is also a
                  payment processing fee based on their fee structure.
              </p>
              <p>
                  Listing fees are billed for $0.20 USD, so if your bank’s currency is
                  not USD, the amount may differ based on changes in the exchange
                  rate.
              </p>
          </figure>
          <figure>
              <figcaption>
                  Do I need a credit or debit card to create a shop?
              </figcaption>
              <p>
                  No, a credit or debit card is not required to create a shop. To be
                  verified as a seller you have the choice to use either a credit card
                  or to register via PayPal. You will not incur any charges until you
                  open your shop and publish your listings.
              </p>
          </figure>
          <figure>
              <figcaption>What can I sell on Martfury?</figcaption>
          </figure>
          <p>
              Martfury provides a marketplace for crafters, artists and collectors to
              sell their handmade creations, vintage goods (at least 20 years old),
              and both handmade and non-handmade crafting supplies.
          </p>
      </div>
      </section>
    </div>
  )
}
const Contact = ()=> (
   <div className="contact-section ps__page-container">
     <div className="contact-content">
      <p>Still have more questions? Feel free to contact us.</p>
      <button>Contact Us</button>
     </div>
   </div>
)
const Index = () => {
  return (
    <div className="ps__vendor-homepage">
        <header className="bg-white">
          <nav className="ps__navbar ps__page-container">
            <div className="brand-container">
             <a>
             <img src={"/img/logo_light.png"} alt="logo"/>
             </a>
            </div>
            <div className="ps__navlinks">
              <Link href={"#"}>
                <a>Login</a>
              </Link>
              <Link href={"#"}>
                <a>Sign up</a>
              </Link>
            </div>
          </nav>
        </header>
      <section className="hero-section">
       <div className="hero-container">
         <div className="hero-content">
          <h4 className="hero-title text-white text-center">Millions of shoppers can't wait to see what you have in store</h4>
          <div className="hero-btn-container">
            <button className="hero-btn">Start Selling</button>
            <Link href={'#faqs'}>
            <button className="hero-btn">Learn More</button>
            </Link>
          </div>
         </div>
       </div>
      </section>
      <section className="why-sell ps__page-container">
        <header className="text-center">
           <h4 className="title">Why sell on shafn</h4>
           <p className="subtitle">
            Join a marketplace where nearly 50 million buyers around the world shop for unique items
           </p>
        </header>
        <div className="grid">
          <div className="grid-item">
            <div className="image-container">
              <img src="/img/vendor-1.png" alt="" />
            </div>
            <h4>Low Fees</h4>
            <p>It doesn’t take much to list your items and once you make a sale, Shafn’s transaction fee is just 2.5%.</p>
          </div>
          <div className="grid-item">
            <div className="image-container">
              <img src="/img/vendor-2.png" alt="" />
            </div>
            <h4>Powerful Tools</h4>
            <p>Our tools and services make it easy to manage, promote and grow your business.</p>
          </div>
          <div className="grid-item">
            <div className="image-container">
              <img src="/img/vendor-3.png" alt="" />
            </div>
            <h4>Support 24/7</h4>
            <p>Our tools and services make it easy to manage, promote and grow your business.</p>
          </div>
        </div>
      </section>
          <VendorMileStone/>
      <section className="fees-to-start pt-5 pb-5 ps__page-container">
        <div className="ps__fees-container">
            <h4 className="title text-center">BEST FEES TO START</h4>
            <p className="subtitle text-center mb-5">Affordable, transparent, and secure</p>
            <p className="desc text-center">It doesn’t cost a thing to list up to 50 items a month, and you only pay after your stuff sells. It’s just a small percent of the money you earn</p>
            <div className="d-flex charges">
               <div className="min-charge">
                  <h4>$0</h4>
                  <p>List Fee</p>
               </div>
               <div className="max-charge">
                  <h4>5%</h4>
                  <p>Final Value Fee</p>
               </div>
            </div><br />
            <ul className="benefits-list">
              <h4 className="text-center">Here's what you get for your fee:</h4>
              <li>A worldwide community of more than 160 million shoppers</li>
              <li>Shipping labels you can print at home, with big discounts on postage.</li>
              <li>Seller protection and customer support to help you sell your stuff.</li>
            </ul>
            <div className="payment-methods bg-grey d-md-flex">
              <div className="img-container mb-2">
                <img src="/img/vendor-4.png" alt="vendor4-img" />
              </div>
              <div className="payment-methods-desc">
                <p> We process payments with PayPal, an external payments platform that allows you to process transactions with a variety of payment methods. Funds from PayPal sales on Martfury will be deposited into your PayPal account.
                </p>
              </div>
            </div>
            <div className="ps-section__footer text-center">
                    <p>
                        Listing fees are billed for 0.20 USD, so if your bank’s currency is not USD,
                        the amount in your currency may vary based on changes in the exchange rate.
                    </p>
            </div>
        </div>
      </section>
      <Testimonials/>
      <FAQS/>
      <hr />
      <Contact/>
    </div>
  )
}

export default Index
