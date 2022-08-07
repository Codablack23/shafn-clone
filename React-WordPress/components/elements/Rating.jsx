import React from 'react';
function generateFilledStars(rating){
   const filledStars = new Array(rating).fill("").map((i,r)=><i key={`${r}-filled`} className="fa fa-star"></i>)
   return filledStars
}
function generateEmptyStars(rating){
    const emptyStars = new Array(rating).fill("").map((i,r)=><i key={`${r}-empty`} className="fa fa-star-o"></i>)
    return emptyStars
}
function isNaN(num){
   return typeof(num)=== "number"?num:0
}
const Rating = ({rating}) => (
    <span className="ps-rating">
       {generateFilledStars(rating?rating:0)}
       {generateEmptyStars(5-(isNaN(rating)))}
    </span>
);

export default Rating;