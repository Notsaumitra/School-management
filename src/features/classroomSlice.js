import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  classRoom: [],
};

export const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
});

export default classroomSlice.reducer;
