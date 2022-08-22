import { configureStore } from "@reduxjs/toolkit";
import classroomReducer from "./features/classroomSlice";
import { attendanceAPi } from "./services/attendanceApiSlice";
import { classRoomApi } from "./services/classRoomApiSlice";

export const store = configureStore({
  reducer: {
    classroom: classroomReducer,
    [classRoomApi.reducerPath]: classRoomApi.reducer,
    [attendanceAPi.reducerPath]: attendanceAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      classRoomApi.middleware,
      attendanceAPi.middleware,
    ]),
});
