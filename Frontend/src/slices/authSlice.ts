import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../interface/reduxTypes";

const state: authState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    setCredentials: (state: any, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state: any, action) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
