import { AnyAction } from "redux";
import {
  ERROR,
  ERROR_RESET,
  SUCCESS,
  SUCCESS_RESET,
} from "../constants/statusMessageConstants";

export const statusMessageReducer = (
  state = { success: "", error: "" },
  action: AnyAction
) => {
  switch (action.type) {
    case SUCCESS:
      return { ...state, success: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    case ERROR_RESET:
      return { ...state, error: "" };
    case SUCCESS_RESET:
      return { ...state, success: "" };
    default:
      return state;
  }
};
