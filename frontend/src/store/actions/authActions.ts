import axios from "axios";

import {
  LOGIN_REJECT,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_REJECT,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  SIGNUP_REJECT,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
} from "../constants/authConstants";

export const signup =
  (name: string, email: string, password: string, confirmPassword: string) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const response = await axios.post("/api/v1/users/signup", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      dispatch({ type: SIGNUP_RESPONSE, payload: response.data.data.user });
    } catch (err: any) {
      dispatch({ type: SIGNUP_REJECT, payload: err.response.data.message });
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });

      dispatch({ type: LOGIN_RESPONSE, payload: response.data.data.user });
    } catch (err: any) {
      dispatch({ type: LOGIN_REJECT, payload: err.response.data.message });
    }
  };

export const checkUser = () => async (dispatch: any) => {
  try {
    const response = await axios.get("/api/v1/users/me");

    dispatch({ type: LOGIN_RESPONSE, payload: response.data.data });
  } catch (err: any) {}
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.get("/api/v1/users/logout");

    dispatch({ type: LOGOUT_RESPONSE });
  } catch (err: any) {
    dispatch({ type: LOGOUT_REJECT, payload: err.response.data.message });
  }
};
