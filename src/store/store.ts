import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import usersReducer from "./reducers/UsersSlice";
import { MakeStore, createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  usersReducer,
});

const setupStore: MakeStore<any> = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppState = ReturnType<AppStore["getState"]>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
type AppDispacth = AppStore["dispatch"];

export { setupStore };
export type { RootState, AppStore, AppDispacth, AppThunk, AppState };
