import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/wishlistConstants";

import axios from "axios";

export const addItemToWishlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const removeWishlistItem = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
