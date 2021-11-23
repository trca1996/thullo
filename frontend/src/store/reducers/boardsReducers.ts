import {
  ADD_BOARD_RESPONSE,
  ALL_BOARDS_RESPONSE,
} from "../constants/boardsConstants";

export const boardsReducer = (state = [], action: any) => {
  switch (action.type) {
    case ALL_BOARDS_RESPONSE:
      return action.payload;
    case ADD_BOARD_RESPONSE:
      return [action.payload, ...state];
    default:
      return state;
  }
};
