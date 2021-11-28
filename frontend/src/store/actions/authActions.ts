import axios from "axios";
import asyncActionFn from "../../helper/asyncActionFc";
import {
  LOGIN_RESPONSE,
  LOGOUT_RESPONSE,
  SIGNUP_RESPONSE,
  UPDATE_PASSWORD_RESPONSE,
  UPDATE_PROFILE_RESPONSE,
} from "../constants/authConstants";
import { successMessage } from "./statusMessageActions";

interface changePasswordProp {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
}

export const signup =
  (name: string, email: string, password: string, confirmPassword: string) =>
  async (dispatch: any) =>
    asyncActionFn(async () => {
      const response = await axios.post("/api/v1/users/signup", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });
      dispatch({ type: SIGNUP_RESPONSE, payload: response.data.data.user });
    }, dispatch);

export const login =
  (email: string, password: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_RESPONSE, payload: response.data.data.user });
    }, dispatch);

export const checkUser = () => async (dispatch: any) =>
  asyncActionFn(
    async () => {
      const response = await axios.get("/api/v1/users/me");
      dispatch({ type: LOGIN_RESPONSE, payload: response.data.data });
    },
    dispatch,
    false
  );

export const logout = () => async (dispatch: any) =>
  asyncActionFn(async () => {
    await axios.get("/api/v1/users/logout");
    dispatch({ type: LOGOUT_RESPONSE });
  }, dispatch);

export const updateProfile = (formData: FormData) => async (dispatch: any) =>
  asyncActionFn(async () => {
    const { data } = await axios.patch("/api/v1/users/updateMe", formData);
    dispatch({ type: UPDATE_PROFILE_RESPONSE, payload: data.data.user });
    dispatch(successMessage("You have update your profile"));
  }, dispatch);

export const changePassword =
  ({ password, passwordConfirm, passwordCurrent }: changePasswordProp) =>
  async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.patch("/api/v1/users/updateMyPassword", {
        password,
        passwordConfirm,
        passwordCurrent,
      });
      dispatch({ type: UPDATE_PASSWORD_RESPONSE, payload: data.data.user });
      dispatch(successMessage("You have update your password"));
    }, dispatch);
