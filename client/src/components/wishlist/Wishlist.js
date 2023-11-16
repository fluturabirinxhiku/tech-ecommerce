import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { addItemToCart } from "../../actions/cartActions";
import { removeWishlistItem } from "../../actions/wishlistActions";

import MetaData from "../layout/MetaData";

const Wishlist = ({ history }) => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();
  const alert = useAlert();

  const addToCart = (id) => {
    dispatch(addItemToCart(id, 1));

    alert.success("Product added to cart");
  };

  const removeWishlistItemHandler = (id) => {
    dispatch(removeWishlistItem(id));
  };

  return (
    <>
      <MetaData title={`Cart`} />
      <div className="container">
        {wishlistItems.length === 0 ? (
          <h3 className="wishlist_heading">Your Wishlist is empty</h3>
        ) : (
          <>
            <h3 className="wishlist_heading">
              Your Wishlist has{" "}
              <span className="wishlist_count">
                {wishlistItems.length} item(s)
              </span>
            </h3>

            <div className="row flex-column justify-content-between ">
              <div className="col">
                {wishlistItems.map((item) => (
                  <Fragment key={item.product}>
                    <hr />
                    <div className="wishlist-item ">
                      <div className="row align-items-center">
                        <div className="col">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="90"
                            width="115"
                            className="wishlist_item_pic"
                          />
                        </div>

                        <div className="col">
                          <Link to={`/products/${item.product}`}>
                            {item.name.length > 50
                              ? `${item.name.substring(0, 50)}...`
                              : item.name}
                          </Link>
                        </div>

                        <div className="col mt-4 mt-lg-0">
                          <h4 id="card_item_price">${item.price}</h4>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            id="cart_btn"
                            className="btn btn-gray text-light w-50 "
                            onClick={() => addToCart(item.product)}
                            disabled={item.stock === 0}
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div className="col mt-4 mt-lg-0">
                          <i
                            id="delete_wishlist_item"
                            className="fa fa-trash-o btn-lg "
                            onClick={() =>
                              removeWishlistItemHandler(item.product)
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <hr />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
