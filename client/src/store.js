import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  productCategoryReducer,
  newProductReducer,
  productReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  allCouponsReducer,
  newCouponReducer,
  couponReducer,
} from "./reducers/couponReducers";
import {
  allUsersReducer,
  authReducer,
  userDetailsReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { wishlistReducer } from "./reducers/wishlistReducers";
import {
  allOrdersReducer,
  customerOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  userDetails: userDetailsReducer,
  categoryProducts: productCategoryReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  customerOrders: customerOrdersReducer,
  allUsers: allUsersReducer,
  order: orderReducer,
  forgotPassword: forgotPasswordReducer,
  wishlist: wishlistReducer,
  allCoupons: allCouponsReducer,
  newCoupon: newCouponReducer,
  coupon: couponReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const wishlistItemsFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

const cartCountFromStorage = localStorage.getItem("cartCount")
  ? JSON.parse(localStorage.getItem("cartCount"))
  : 0;

const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

const stripeKeyFromStorage = localStorage.getItem("stripeApiKey")
  ? localStorage.getItem("stripeApiKey")
  : "";

let initialState = {
  auth: { user: userInfoFromStorage, loading: false },
  cart: {
    cartItems: cartItemsFromStorage,
    cartCount: cartCountFromStorage,
    shippingInfo: shippingInfoFromStorage,
    stripeKey: stripeKeyFromStorage,
  },
  wishlist: {
    wishlistItems: wishlistItemsFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
