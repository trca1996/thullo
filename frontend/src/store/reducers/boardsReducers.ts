import {
  ALL_BOARDS_REQUEST,
  ALL_BOARDS_RESPONSE,
} from "../constants/boardsConstants";

export const boardsReducer = (
  state = { boards: [], loading: false },
  action: any
) => {
  switch (action.type) {
    case ALL_BOARDS_REQUEST:
      return { ...state, loading: true };
    case ALL_BOARDS_RESPONSE:
      return { loading: false, boards: action.payload };
    default:
      return state;
  }
};
