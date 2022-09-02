import Slider from 'react-slick';


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


export default function Testimonials(){
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