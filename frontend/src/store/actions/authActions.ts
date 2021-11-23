import axios from "axios";

import {
  LOGIN_RESPONSE,
  LOGOUT_RESPONSE,
  SIGNUP_RESPONSE,
  UPDATE_PASSWORD_RESPONSE,
  UPDATE_PROFILE_RESPONSE,
} from "../constants/authConstants";
import { loaded, loading } from "./loadingActions";
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
      dispatch(loading);

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
    dispatch(loaded);
  };

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch(loading);

      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });

      dispatch({ type: LOGIN_RESPONSE, payload: response.data.data.user });
    } catch (err: any) {
      dispatch(errorMessage(err.response.data.message));
    }
    dispatch(loaded);
  };

export const checkUser = () => async (dispatch: any) => {
  try {
    dispatch(loading);
    const response = await axios.get("/api/v1/users/me");

    dispatch({ type: LOGIN_RESPONSE, payload: response.data.data });
  } catch (err: any) {}
  dispatch(loaded);
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch(loading);

    await axios.get("/api/v1/users/logout");

    dispatch({ type: LOGOUT_RESPONSE });
  } catch (err: any) {
    dispatch(errorMessage(err.response.data.message));
  }
  dispatch(loaded);
};

export const updateProfile = (formData: FormData) => async (dispatch: any) => {
  try {
    dispatch(loading);

    const { data } = await axios.patch("/api/v1/users/updateMe", formData);

    dispatch({ type: UPDATE_PROFILE_RESPONSE, payload: data.data.user });
    dispatch(successMessage("You have update your profile"));
  } catch (err: any) {
    dispatch(errorMessage(err.response.data.message));
  }
  dispatch(loaded);
};

export const changePassword =
  ({ password, passwordConfirm, passwordCurrent }: changePasswordProp) =>
  async (dispatch: any) => {
    try {
      dispatch(loading);

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
    dispatch(loaded);
  };
