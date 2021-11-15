import {
  ERROR,
  ERROR_RESET,
  SUCCESS,
  SUCCESS_RESET,
} from "../constants/statusMessageConstants";

export const successMessage = (message: string) => ({
  type: SUCCESS,
  payload: message,
});

export const errorMessage = (message: string) => ({
  type: ERROR,
  payload: message,
});

export const errorReset = { type: ERROR_RESET };
export const successReset = { type: SUCCESS_RESET };
