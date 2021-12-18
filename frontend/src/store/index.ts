import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducers";
import { statusMessageReducer } from "./reducers/statusMessageReducers";
import {
  boardListState,
  boardReducer,
  boardsReducer,
} from "./reducers/boardsReducers";
import { loadingReducer } from "./reducers/loadingReducer";
import { BoardType, ListStateTypes, UserType } from "../types/types";

// REDUCERS
const reducers = combineReducers({
  user: authReducer,
  boards: boardsReducer,
  currentBoard: boardReducer,
  boardListState: boardListState,
  status: statusMessageReducer,
  loading: loadingReducer,
});

// CONFIGURE STORE
function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  // @ts-ignore
  const store = createStore(reducers, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./", () => store.replaceReducer(reducers));
  }

  return store;
}

// EXPORT STORE
export const store = configureStore();

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = {
  user: UserType | null;
  boards: BoardType[];
  currentBoard: BoardType | null;
  boardListState: ListStateTypes;
  status: {
    success: string;
    error: string;
  };
  loading: boolean;
};
export type AppDispatch = typeof store.dispatch;
