import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducers";

// INITIAL STATE
const initState = {
  user: {
    user: null,
    error: null,
    loading: false,
  },
};

// REDUCERS
const reducers = combineReducers({
  user: authReducer,
});

// CONFIGURE STORE
function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducers, initState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./", () => store.replaceReducer(reducers));
  }

  return store;
}

// EXPORT STORE
export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
