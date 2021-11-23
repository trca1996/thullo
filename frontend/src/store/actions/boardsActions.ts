import axios from "axios";
import {
  ADD_BOARD_RESPONSE,
  ALL_BOARDS_RESPONSE,
} from "../constants/boardsConstants";
import { loaded, loading } from "./loadingActions";
import { errorMessage, successMessage } from "./statusMessageActions";

export const getAllBoards =
  (fields: string[], page = 1, limit = 10) =>
  async (dispatch: any) => {
    try {
      dispatch(loading);
      const fieldsFormatted = fields.join(",");

      const { data } = await axios.get("/api/v1/boards/", {
        params: { fields: fieldsFormatted, page, limit },
      });

      dispatch({ type: ALL_BOARDS_RESPONSE, payload: data.data });
    } catch (err: any) {
      dispatch(errorMessage(err.response.data.message));
    }
    dispatch(loaded);
  };

export const addBoard = (formData: FormData) => async (dispatch: any) => {
  try {
    dispatch(loading);

    const { data } = await axios.post("/api/v1/boards", formData);

    dispatch({ type: ADD_BOARD_RESPONSE, payload: data.data });
    dispatch(successMessage("New board added"));
  } catch (err: any) {
    dispatch(errorMessage(err.response.data.message));
  }
  dispatch(loaded);
};
