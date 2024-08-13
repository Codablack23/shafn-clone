
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import '../../../../public/static/css/redoproduct.css'



class RedoProductDetailThumbnail extends Component {

//  constructor(props) {
//     super(props);
//     this.state = {
//         galleryImg: null,
//         productImages: null,
//         nextImg: null,
//         galleryCarousel: null,
//         variantCarousel: null,
//         photoIndex: 0,
//         isOpen: false,
//     };
// }

render () {
    

  return (
    <Carousel className='main-slide'>
        <div>
            <img src={"/images/slider1.jpg"} alt='Product1' height='300px' width='400px' />
        </div>
        <div>
            <img src={'/images/slider2.jpg'} alt='Product2' height='300px' width='400px' />
        </div>
        <div>
            <img src={'/images/slider3.jpg'} alt='Product3' height='300px' width='400px' />
        </div>
    </Carousel>
  )
}
}

export default RedoProductDetailThumbnail;