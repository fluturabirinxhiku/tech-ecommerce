import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card h-100 p-3 rounded ">
        <img
          className="card-img-top mx-auto card_pic "
          src={product.images[0].url}
          alt=""
        />
        <div className="card-body d-flex flex-column">
          <p className="card-title product_card_title">
            <Link className="product_link" to={`/products/${product._id}`}>
              {product.name.length > 60
                ? `${product.name.substring(0, 60)}...`
                : product.name}
            </Link>
          </p>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span className="no_of_reviews">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <p className="card-text product_card_price">${product.price}</p>
          <Link
            to={`/products/${product._id}`}
            id="view_btn"
            className="btn btn-block btn-warning"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
