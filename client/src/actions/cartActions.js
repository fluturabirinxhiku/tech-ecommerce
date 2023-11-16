import {
  ADD_TO_CART,
  CART_COUNT,
  CHANGE_QUANTITY_IN_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  GET_STRIPE_API_KEY,
} from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const changeQuantityInCart =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CHANGE_QUANTITY_IN_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const countCartItems = () => async (dispatch, getState) => {
  let cartCount = 0;
  getState().cart.cartItems.forEach((item) => {
    cartCount += item.quantity;
  });
  dispatch({ type: CART_COUNT, payload: cartCount });
  localStorage.setItem("cartCount", JSON.stringify(cartCount));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  await axios.get(`/api/products/${id}`);

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCartItems = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART_ITEMS",
  });

  localStorage.setItem("cartItems", JSON.stringify([]));
  localStorage.setItem("cartCount", JSON.stringify(0));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const getStripeApiKey = () => async (dispatch) => {
  const { data } = await axios.get("/api/stripeapi");

  dispatch({
    type: GET_STRIPE_API_KEY,
    payload: data.stripeApiKey,
  });

  localStorage.setItem("stripeApiKey", data.stripeApiKey);
};
