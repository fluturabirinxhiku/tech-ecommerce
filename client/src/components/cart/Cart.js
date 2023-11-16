import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeQuantityInCart,
  removeCartItem,
} from "../../actions/cartActions";

import MetaData from "../layout/MetaData";

const Cart = ({ history }) => {
  const { cartItems, cartCount } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQuantity = quantity + 1;

    if (newQuantity > stock) return;

    dispatch(changeQuantityInCart(id, newQuantity));
  };

  const decreaseQty = (id, quantity) => {
    const newQuantity = quantity - 1;

    if (newQuantity < 1) return;

    dispatch(changeQuantityInCart(id, newQuantity));
  };
  const dispatch = useDispatch();

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <>
      <MetaData title={`Cart`} />
      <div className="container">
        {cartItems.length === 0 ? (
          <h3 className="cart_heading">Your cart is empty</h3>
        ) : (
          <>
            <h3 className="cart_heading">
              Your Cart has{" "}
              <span className="cart_count">{cartCount} item(s)</span>
            </h3>

            <div className="row  justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment key={item.product}>
                    <hr />
                    <div className="cart-item ">
                      <div className="row align-items-center">
                        <div className="col">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="90"
                            width="115"
                            className="cart_item_pic"
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

                        <div className="col mt-4 mt-lg-0 ">
                          <div className="input-group quantity2   ">
                            <button
                              className="btn quantity_btn2"
                              data-dir="dwn"
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                            >
                              -
                            </button>

                            <input
                              type="number"
                              className="form-control text-center count d-inline "
                              value={item.quantity}
                              readOnly
                            />

                            <button
                              className="btn  quantity_btn2"
                              data-dir="up"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col mt-4 mt-lg-0 p-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn-lg"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <hr />
              </div>
              <div className="col-12 col-lg-4 my-3">
                <div id="order_summary">
                  <h4 className="order_summary_heading">Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values text-dark">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-secondary w-100"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
