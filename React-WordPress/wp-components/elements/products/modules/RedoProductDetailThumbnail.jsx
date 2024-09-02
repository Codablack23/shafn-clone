
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";






export default function RedoProductDetailThumbnail({product})  {
  const images = product.images.map(img=>(
      {
        original: img.src,
        thumbnail: img.src,
        originalHeight:"400px",
        thumbnailWidth:50,
        thumbnailHeight:50
      }
  ));

  return <ImageGallery
    thumbnailPosition={"left"}
    items={images} showPlayButton={false}
    useBrowserFullscreen={false}
    showNav={false}
    showFullscreenButton={false}
  />;
}

