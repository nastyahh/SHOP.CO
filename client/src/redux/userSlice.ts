import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    userData: {
      username: "",
      email: "",
      role: "",
    },
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = {
        username: "",
        email: "",
        role: "",
      };
      localStorage.removeItem("token");
    },
  },
});

export const { setAuth, logout } = userSlice.actions;

export default userSlice.reducer;
