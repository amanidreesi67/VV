import axios from "axios";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    // reqData: { productId, size, quantity, variant }
    const response = await axios.put(`${API_BASE_URL}/cart/add`, reqData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data });
    // Refresh cart after adding
    dispatch(getCart());
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${API_BASE_URL}/cart/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
    // Refresh cart or handle local filter in reducer.
    // Usually backend returns generic success message, so we filter locally or refetch.
    // Let's refetch to be safe about totals.
    dispatch(getCart());
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    // reqData: { cartItemId, data: { quantity } }
    const token = localStorage.getItem("jwt");
    const response = await axios.put(
      `${API_BASE_URL}/cart/item/${reqData.cartItemId}`,
      reqData.data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data });
    dispatch(getCart());
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
