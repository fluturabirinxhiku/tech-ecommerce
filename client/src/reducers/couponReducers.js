import {
  ALL_COUPONS_REQUEST,
  ALL_COUPONS_FAIL,
  ALL_COUPONS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_RESET,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  NEW_COUPON_RESET,
} from "../constants/couponConstants";

export const allCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case ALL_COUPONS_REQUEST:
      return {
        loading: true,
        coupons: [],
      };
    case ALL_COUPONS_SUCCESS:
      return {
        loading: false,
        coupons: action.payload,
      };

    case ALL_COUPONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case NEW_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_COUPON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        coupon: action.payload.coupon,
      };

    case NEW_COUPON_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_COUPON_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_COUPON_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COUPON_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
