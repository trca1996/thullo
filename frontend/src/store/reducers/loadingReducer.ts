import { LOADED, LOADING } from "../constants/loadingConstants";

interface actionProp {
  type: string;
}

export const loadingReducer = (state: boolean = false, action: actionProp) => {
  switch (action.type) {
    case LOADING:
      return true;
    case LOADED:
      return false;
    default:
      return state;
  }
};
