export default function Fees(){
    return(
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
    )
}