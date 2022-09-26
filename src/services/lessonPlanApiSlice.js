import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lessonPlanApi = createApi({
  reducerPath: "lessonPlanApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["lessonPlan", "allStaff"],
  endpoints: (builder) => ({
    getStaff: builder.query({
      query: () => `auth/allStaff`,
      providesTags: ["allStaff"],
    }),
    getLessonPLan: builder.query({
      query: ({ classId }) => `les/lesson/${classId}`,
      providesTags: ["lessonPlan"],
    }),
    addLessonPlan: builder.mutation({
      query: (lessonPlanData) => ({
        url: "les/lesson",
        method: "POST",
        body: lessonPlanData,
      }),
      invalidatesTags: ["lessonPlan"],
    }),
    updateLessonPlan: builder.mutation({
      query: (lessonPlanData) => ({
        url: "les/updateLesson",
        method: "PUT",
        body: lessonPlanData,
      }),
      invalidatesTags: ["lessonPlan"],
    }),
  }),
});

export const {
  useGetLessonPLanQuery,
  useAddLessonPlanMutation,
  useGetStaffQuery,
  useUpdateLessonPlanMutation,
} = lessonPlanApi;
