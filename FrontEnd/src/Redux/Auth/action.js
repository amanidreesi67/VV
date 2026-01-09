import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGOUT,
} from "./actionType";
// Ideally base URL should be in env or config
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, userData);
    const { jwt_token, message } = response.data; // Backend returns jwt_token
    if (jwt_token) {
      localStorage.setItem("jwt", jwt_token);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: jwt_token, user: null },
    }); // User data might need fetching separately or decoding token
    return response.data;
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    const { jwt, message } = response.data; // Backend returns jwt
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
    dispatch({ type: SIGNUP_SUCCESS, payload: { token: jwt, user: null } });
    return response.data;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
