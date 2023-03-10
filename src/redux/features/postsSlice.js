import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = [...action.payload];
      state.loading = false;
    },
    appendToPosts: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const loadingState = (state) => state.posts.loading;

export const { setPosts, appendToPosts } = postsSlice.actions;

export default postsSlice.reducer;
