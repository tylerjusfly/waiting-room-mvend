import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/authSlice";
import postsSlice from "../features/postsSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    posts: postsSlice,
  },
});
