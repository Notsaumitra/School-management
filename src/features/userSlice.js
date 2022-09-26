import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  user: {},
  isAuth: "",
  role: "",
  roleId: "",
};
const url = "http://localhost:3000/auth";

export const registerUser = createAsyncThunk("user/register", () => {
  return axios
    .get(url + `/register`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
});

export const loginUser = createAsyncThunk("user/login", () => {
  return axios
    .get(url + `/login`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {},
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, action) => {},
    [loginUser.pending]: (state, action) => {},
    [loginUser.fulfilled]: (state, action) => {},
    [loginUser.rejected]: (state, action) => {},
  },
});

export default userSlice.reducer;
