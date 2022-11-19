import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./reducers/ordersReducer.ts";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
