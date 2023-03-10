import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: null,
    password: null,
  },
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { id, username, password } = action.payload;
      console.log(username, password);
      state.user.id = id;
      state.user.username = username;
      state.user.password = password;
    },
  },
});

export const selectUser = (state) => state.auth.user;

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
