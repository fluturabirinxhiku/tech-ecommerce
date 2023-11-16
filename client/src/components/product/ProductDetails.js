import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../layout/Message";

import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { addItemToWishlist } from "../../actions/wishlistActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { Carousel } from "react-bootstrap";
import { useAlert } from "react-alert";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReviewList from "./ReviewList";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);

  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, match.params.id, alert, error, reviewError, success]);

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));

    alert.success("Product added to cart");
  };

  const addToWishlist = () => {
    dispatch(addItemToWishlist(match.params.id, quantity));

    alert.success("Product added to Wishlist");
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    dispatch(newReview(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <MetaData title={product.name || "Product Not Found"} />
          <div className="container">
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid " id="product_image">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item
                        key={image.public_id}
                        className="carousel_item"
                      >
                        <img
                          className=" carousel_image"
                          src={image.url}
                          alt={product.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3 className="product_title">{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">${product.price}</p>

                <div className="d-flex ">
                  <div className="input-group quantity me-5  ">
                    <button
                      className="btn quantity_btn"
                      data-dir="dwn"
                      onClick={decreaseQty}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="form-control text-center count"
                      value={quantity}
                      readOnly
                    />

                    <button
                      className="btn  quantity_btn"
                      data-dir="up"
                      onClick={increaseQty}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-secondary w-50 "
                    onClick={addToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                  {user && (
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-warning  fa  fa-heart-o ml-2 "
                      onClick={addToWishlist}
                      disabled={product.stock === 0 && user?.role === "Admin"}
                    ></button>
                  )}
                </div>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={
                      product.stock > 0 ? "text-success" : "text-danger"
                    }
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.brand}</strong>
                </p>

                {user && user.role === "Customer" ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                    onClick={setUserRatings}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}

                <div className="row  mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                              className="btn btn-primary my-3 float-right review-btn px-4 text-white"
                              onClick={reviewHandler}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {product.reviews && product.reviews.length > 0 && (
              <ReviewList reviews={product.reviews} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
