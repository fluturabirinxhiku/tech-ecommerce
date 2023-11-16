import axios from "axios";

import {
  ALL_COUPONS_REQUEST,
  ALL_COUPONS_FAIL,
  ALL_COUPONS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
} from "../constants/couponConstants";

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_COUPONS_REQUEST,
    });

    const { data } = await axios.get("/api/admin/coupons");

    dispatch({
      type: ALL_COUPONS_SUCCESS,
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: ALL_COUPONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const newCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COUPON_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/coupons/new`,
      couponData,
      config
    );

    dispatch({
      type: NEW_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUPON_REQUEST });

    const { data } = await axios.delete(`/api/admin/coupons/${id}`);

    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};
