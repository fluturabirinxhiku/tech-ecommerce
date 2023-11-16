const ReviewList = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Product Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
