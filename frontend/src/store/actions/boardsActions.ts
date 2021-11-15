import axios from "axios";
import {
  ALL_BOARDS_REQUEST,
  ALL_BOARDS_RESPONSE,
} from "../constants/boardsConstants";
import { errorMessage } from "./statusMessageActions";

export const getAllBoards =
  (fields: string[], page = 1, limit = 10) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: ALL_BOARDS_REQUEST });
      const fieldsFormatted = fields.join(",");

      const { data } = await axios.get("/api/v1/boards/", {
        params: { fields: fieldsFormatted, page, limit },
      });

      dispatch({ type: ALL_BOARDS_RESPONSE, payload: data.data });
    } catch (err: any) {
      dispatch(errorMessage(err.response.data.message));
    }
  };
