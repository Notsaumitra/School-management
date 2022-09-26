import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./features/mealSlice";
import { attendanceAPi } from "./services/attendanceApiSlice";
import { classRoomApi } from "./services/classRoomApiSlice";
import { lessonPlanApi } from "./services/lessonPlanApiSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    meals: mealReducer,
    user: userReducer,
    [classRoomApi.reducerPath]: classRoomApi.reducer,
    [attendanceAPi.reducerPath]: attendanceAPi.reducer,
    [lessonPlanApi.reducerPath]: lessonPlanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      classRoomApi.middleware,
      attendanceAPi.middleware,
      lessonPlanApi.middleware,
    ]),
});
