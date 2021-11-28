import {
  ADD_BOARD_RESPONSE,
  ALL_BOARDS_RESPONSE,
  GET_BOARD,
  RESET_ALL_BOARDS,
  RESET_BOARD,
} from "../constants/boardsConstants";

// interface Board {
//   _id: string;
//   title: string;
//   private: boolean;
//   admin: string;
//   lists: [];
//   members: [];
//   createdAt: string;
//   updatedAt: string;
//   id: string;
// }

export const boardsReducer = (state = [], action: any) => {
  switch (action.type) {
    case ALL_BOARDS_RESPONSE:
      return action.payload;
    case ADD_BOARD_RESPONSE:
      return [action.payload, ...state];
    case RESET_ALL_BOARDS:
      return [];
    default:
      return state;
  }
};

export const boardReducer = (state: null = null, action: any) => {
  switch (action.type) {
    case GET_BOARD:
      return action.payload;
    case RESET_BOARD:
      return null;
    default:
      return state;
  }
};
