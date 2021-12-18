import { UserType } from "../../types/types";
import {
  LOGIN_RESPONSE,
  LOGOUT_RESPONSE,
  SIGNUP_RESPONSE,
  UPDATE_PASSWORD_RESPONSE,
  UPDATE_PROFILE_RESPONSE,
} from "../constants/authConstants";

export const authReducer = (state: UserType | null = null, action: any) => {
  switch (action.type) {
    case SIGNUP_RESPONSE:
    case LOGIN_RESPONSE:
    case UPDATE_PROFILE_RESPONSE:
    case UPDATE_PASSWORD_RESPONSE:
      return action.payload;
    case LOGOUT_RESPONSE:
      return null;
    default:
      return state;
  }
};
