import {
  LOGIN_REJECT,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_REJECT,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  RESET_ERROR,
  SIGNUP_REJECT,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  UPDATE_PROFILE_REJECT,
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
      return { ...state, loading: true };
    case SIGNUP_RESPONSE:
    case LOGIN_RESPONSE:
    case UPDATE_PROFILE_RESPONSE:
      return { ...state, loading: false, user: action.payload };
    case LOGOUT_RESPONSE:
      return { ...state, loading: false, user: null };
    case SIGNUP_REJECT:
    case LOGIN_REJECT:
    case LOGOUT_REJECT:
    case UPDATE_PROFILE_REJECT:
      return { ...state, loading: false, error: action.payload };
    case RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
