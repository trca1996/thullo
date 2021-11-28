import axios from "axios";
import asyncActionFn from "../../helper/asyncActionFc";
import {
  ADD_BOARD_RESPONSE,
  ALL_BOARDS_RESPONSE,
  GET_BOARD,
  RESET_ALL_BOARDS,
  RESET_BOARD,
} from "../constants/boardsConstants";
import { successMessage } from "./statusMessageActions";

export const getAllBoards =
  (fields: string[], page = 1, limit = 10, keyword = "") =>
  async (dispatch: any) =>
    asyncActionFn(async () => {
      const fieldsFormatted = fields.join(",");
      const { data } = await axios.get("/api/v1/boards/", {
        params: { fields: fieldsFormatted, page, limit, keyword },
      });
      dispatch({ type: ALL_BOARDS_RESPONSE, payload: data.data });
    }, dispatch);

export const addBoard = (formData: FormData) => async (dispatch: any) =>
  asyncActionFn(async () => {
    const { data } = await axios.post("/api/v1/boards", formData);
    dispatch({ type: ADD_BOARD_RESPONSE, payload: data.data });
    dispatch(successMessage("New board added"));
  }, dispatch);

export const getBoard = (boardId: string) => async (dispatch: any) =>
  asyncActionFn(async () => {
    const { data } = await axios.get(`/api/v1/boards/${boardId}`);
    dispatch({ type: GET_BOARD, payload: data.data });
  }, dispatch);

export const resetBoard = { type: RESET_BOARD };
export const resetAllBoards = { type: RESET_ALL_BOARDS };
