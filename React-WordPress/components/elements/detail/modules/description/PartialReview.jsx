import React, { useState } from "react";
import { notification, Rate } from "antd";
import Rating from "../../../Rating";
import WPProductRepository from "~/repositories/WP/WPProductRepository";
import ReactHtmlParser from "react-html-parser";
const PartialReview = () => {
    const [review, setReview] = useState({
        product_id: window.location.pathname.split("-").pop(),
        reviewer: "",
        reviewer_email: "",
        review: "",
        rating: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.review.trim()) {
            setIsSubmitting(true);
            try {
                await WPProductRepository.createReview(review);

                notification["success"]({
                    message: "Review sent",
                });

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

    return (
        <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                        <h3>4.00</h3>
                        <Rating />

                        <span>1 Review</span>
                    </div>
                    <div className="ps-block__star">
                        <span>5 Star</span>
                        <div className="ps-progress" data-value="100">
                            <span></span>
                        </div>
                        <span>100%</span>
                    </div>
                    <div className="ps-block__star">
                        <span>4 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>3 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>2 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>1 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                <form
                    className="ps-form--review"
                    method="post"
                    onSubmit={handleSubmit}>
                    <h4>Submit Your Review</h4>
                    <p>
                        Your email address will not be published. Required
                        fields are marked
                        <sup>*</sup>
                    </p>
                    <div className="form-group form-group__rating">
                        <label>Your rating of this product</label>
                        <Rate
                            defaultValue={1}
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
                            {isSubmitting ? "Submitting" : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PartialReview;
