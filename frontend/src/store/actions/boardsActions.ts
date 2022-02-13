import axios from "axios";
import asyncActionFn from "../../helper/asyncActionFc";
import { DndObj } from "../../types/types";
import {
  ADD_BOARD_RESPONSE,
  ADD_LIST,
  ADD_MEMBER,
  ALL_BOARDS_RESPONSE,
  CHANGE_BOARD_VISIBILITY,
  CHANGE_CARD_POSITION_STATE,
  EDIT_BOARD_DESCRIPTION,
  GET_BOARD,
  REMOVE_BOARD,
  REMOVE_MEMBER,
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

export const changeCardPosition =
  (destination: DndObj, source: DndObj, cardId: string, boardId: string) =>
  async (dispatch: any) =>
    asyncActionFn(async () => {
      dispatch({
        type: CHANGE_CARD_POSITION_STATE,
        payload: {
          destination,
          source,
          cardId,
        },
      });

      await axios.patch(
        `/api/v1/cards/${cardId}/changeList?boardId=${boardId}`,
        {
          newListId: destination.droppableId,
          prevListId: source.droppableId,
          newIndex: destination.index,
        }
      );
    }, dispatch);

export const changeBoardVisibility =
  (isPrivate: boolean, boardId: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.patch(`/api/v1/boards/${boardId}`, {
        isPrivate: isPrivate.toString(),
      });

      dispatch({ type: CHANGE_BOARD_VISIBILITY, payload: data.data.isPrivate });
      dispatch(
        successMessage(`Board is now ${isPrivate ? "Private" : "Public"}`)
      );
    }, dispatch);

export const addMember =
  (email: string, boardId: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.patch(`api/v1/boards/${boardId}/addMember`, {
        memberEmail: email,
      });

      dispatch({ type: ADD_MEMBER, payload: data.data });
      dispatch(successMessage("New member added"));
    }, dispatch);

export const editBoardDescription =
  (description: string, boardId: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.patch(`api/v1/boards/${boardId}`, {
        description,
      });

      dispatch({
        type: EDIT_BOARD_DESCRIPTION,
        payload: data.data.description,
      });
    }, dispatch);

export const removeMember =
  (memberId: string, boardId: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.patch(
        `api/v1/boards/${boardId}/removeMember`,
        { memberId }
      );

      dispatch({
        type: REMOVE_MEMBER,
        payload: data.data,
      });
    }, dispatch);

export const removeBoard = (boardId: string) => async (dispatch: any) =>
  asyncActionFn(async () => {
    await axios.delete(`api/v1/boards/${boardId}`);

    dispatch({ type: REMOVE_BOARD });
    dispatch(successMessage("You remove board successfully"));
  }, dispatch);

export const addList =
  (listTitle: string, boardId: string) => async (dispatch: any) =>
    asyncActionFn(async () => {
      const { data } = await axios.post(
        `/api/v1/boards/${boardId}/createList`,
        {
          title: listTitle,
        }
      );
      dispatch({ type: ADD_LIST, payload: data.data });
    }, dispatch);

export const resetBoard = { type: RESET_BOARD };
export const resetAllBoards = { type: RESET_ALL_BOARDS };
