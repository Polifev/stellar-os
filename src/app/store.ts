import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import agentReducer from "../features/agent/agentSlice";
import shipReducer from "../features/ship/shipSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    agent: agentReducer,
    ship: shipReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
