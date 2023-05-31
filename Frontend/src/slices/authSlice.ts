import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../interface/reduxTypes";

const state: authState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    setCredentials: (state: any, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state: any, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
