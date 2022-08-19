import React, { useState } from "react";
import { Modal, notification, Progress, Rate, Spin } from "antd";
import Rating from "../../../Rating";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";
const PartialReview = () => {
    const [product_reviews, setProductReviews] = useState([]);
    const [reviewSent, setReviewSent] = useState(0);
    const [averageReviews,setAverageReviews] = useState(0)
    const [review_limit, setReviewLimit] = useState({
        amount: 3,
        isAll: false,
    });
    const [review, setReview] = useState({
        product_id: window.location.pathname.split("-").pop(),
        reviewer: "",
        reviewer_email: "",
        review: "",
        rating: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function getReviews() {
        const product_id = window.location.pathname.split("-").pop();
        const reviews = await WPProductRepository.getReviews();

        if (reviews) {
            const p_reviews = reviews.filter(
                (r) => r.product_id.toString() === product_id.toString()
            );
            setProductReviews(p_reviews);
        }
    }

    function seeAllReviews(amount, isAll) {
        setReviewLimit((prev) => {
            return {
                ...prev,
                amount,
                isAll,
            };
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.review.trim()) {
            setIsSubmitting(true);
            try {
                await WPProductRepository.createReview(review);

                notification["success"]({
                    message: "Review sent",
                });
                setReviewSent((prev) => prev + 1);
                setReview({
                    product_id: window.location.pathname.split("-").pop(),
                    reviewer: "",
                    reviewer_email: "",
                    review: "",
                    rating: 1,
                });
            } catch (error) {
                notification["error"]({
                    message: "Failed to submit review",
                    description:
                        error.response === undefined
                            ? ReactHtmlParser(String(error))
                            : ReactHtmlParser(error.response.data.message),
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            notification["error"]({
                message: "Review cannot be empty",
            });
        }
    };
    function averageStars(){
        const r_total = product_reviews.length == 0?1:product_reviews.length
        const avg = parseFloat((product_reviews.reduce((total,el)=>(total += el.rating),0))/r_total)
        return avg.toFixed(1)
    }
    function getPercent(num){
        const r_total = product_reviews.length == 0?1:product_reviews.length
        const percent = parseFloat(
            (product_reviews.filter(r=>r.rating === parseInt(num)).length)/r_total
        ).toFixed(2)
        return percent * 100
    }
    function getStarPercent(){
        const all = [5,4,3,2,1];
        return all.map(num=>(
            <div>
            <span>{num} <i className="fa fa-star" style={{color:"#FCB800"}}></i></span>
            <Progress  type={"line"} percent={getPercent(num)} strokeColor={"#FCB800"}/>
        </div>
        ))
    }
    useEffect(() => {
        getReviews();
    }, [reviewSent]);
    return (
        <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block--average-rating" style={{maxWidth:"450px"}}>
                    <div className="ps-block__header">
                        <h3>{averageStars()}</h3>
                        <Rating rating={parseInt(averageStars())} />

                        <span>
                            {product_reviews.length === 0
                                ? "No Reviews"
                                : product_reviews.length === 1
                                ? "1 Review"
                                : `${product_reviews.length} Reviews`}
                        </span>
                    </div>
                   {getStarPercent()}
                </div>
                <br />
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                <form
                    className="ps-form--review"
                    method="post"
                    onSubmit={handleSubmit}>
                    <h4>Submit Your Review</h4>
                    <p>Your email address will not be published.</p>
                    <div className="form-group form-group__rating">
                        <label>Add this product rating</label>
                        <Rate
                            value={review.rating}
                            onChange={(value) =>
                                setReview((prev) => ({
                                    ...prev,
                                    ["rating"]: value,
                                }))
                            }
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="review"
                            value={review.review}
                            className="form-control"
                            rows="6"
                            placeholder="Write your review here"
                            onChange={(e) =>
                                setReview((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            required></textarea>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                            <div className="form-group">
                                <input
                                    name="reviewer"
                                    value={review.reviewer}
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) =>
                                        setReview((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                            <div className="form-group">
                                <input
                                    name="reviewer_email"
                                    value={review.reviewer_email}
                                    className="form-control"
                                    type="email"
                                    placeholder="Your Email"
                                    onChange={(e) =>
                                        setReview((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Spin style={{ marginTop: 5 }} />
                            ) : (
                                "Submit Review"
                            )}
                        </button>
                    </div>
                </form>
                <br />
                {product_reviews.length > 0 ? (
                    <div>
                        {product_reviews
                            .slice(0, review_limit.amount)
                            .map((rev) => (
                                <div
                                    className="ps__product-review"
                                    key={rev.id}>
                                    <Rating rating={rev.rating} />
                                    <p
                                        className="fw-2"
                                        dangerouslySetInnerHTML={{
                                            __html: rev.review,
                                        }}></p>
                                    <p className="author">{rev.reviewer}</p>
                                    <p>
                                        {new Date(
                                            rev.date_created
                                        ).toDateString()}
                                    </p>
                                    <div>
                                        {rev.verified ? (
                                            <b className="text-warning">
                                                Verified
                                            </b>
                                        ) : (
                                            <b className="text-danger">
                                                Not Verified
                                            </b>
                                        )}
                                    </div>
                                </div>
                            ))}
                        {product_reviews.length > 3 &&(
                            <div className="ps__see-all-reviews">
                            {review_limit.isAll ? (
                                <p
                                    className="see all reviews"
                                    onClick={() => seeAllReviews(3, false)}>
                                    <b>Show Less</b>
                                </p>
                            ) : (
                                <p
                                    className="see all reviews"
                                    onClick={() =>
                                        seeAllReviews(
                                            product_reviews.length,
                                            true
                                        )
                                    }>
                                    <b>See All Reviews</b>
                                </p>
                            )}
                        </div>
                        )}
                    </div>
                ) : (
                    <div
                        className="text-center"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "200px",
                            width: "100%",
                        }}>
                        <h4>
                            <b>No Reviews Added yet</b>
                        </h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartialReview;
