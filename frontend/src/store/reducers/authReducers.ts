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

export const authReducer = (
  state = { user: null, error: null, loading: false },
  action: any
) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_RESPONSE:
    case LOGIN_RESPONSE:
    case UPDATE_PROFILE_RESPONSE:
    case UPDATE_PASSWORD_RESPONSE:
      return { ...state, loading: false, user: action.payload };
    case LOGOUT_RESPONSE:
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};
