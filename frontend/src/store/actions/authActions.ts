import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESPONSE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESPONSE,
} from "../constants/authConstants";
import { errorMessage, successMessage } from "./statusMessageActions";

interface changePasswordProp {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
}

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
      dispatch(errorMessage(err.response.data.message));
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
      dispatch(errorMessage(err.response.data.message));
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
    dispatch(errorMessage(err.response.data.message));
  }
};

export const updateProfile = (formData: FormData) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.patch(
      "/api/v1/users/updateMe",
      formData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_RESPONSE, payload: data.data.user });
    dispatch(successMessage("You have update your profile"));
  } catch (err: any) {
    dispatch(errorMessage(err.response.data.message));
  }
};

export const changePassword =
  ({ password, passwordConfirm, passwordCurrent }: changePasswordProp) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const { data } = await axios.patch("/api/v1/users/updateMyPassword", {
        password,
        passwordConfirm,
        passwordCurrent,
      });

      dispatch({ type: UPDATE_PASSWORD_RESPONSE, payload: data.data.user });
      dispatch(successMessage("You have update your password"));
    } catch (err: any) {
      dispatch(errorMessage(err.response.data.message));
    }
  };
