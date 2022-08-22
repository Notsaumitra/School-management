import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceAPi = createApi({
  reducerPath: "attendanceAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/atd" }),
  tagTypes: ["attendance"],
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: ({ classId, date }) => `attendance/${classId}/${date}`,
      providesTags: ["attendance"],
    }),
    getAttendanceForClass: builder.query({
      query: (classId) => `allAttendance/${classId}`,
      providesTags: ["attendance"],
    }),
    addAttendance: builder.mutation({
      query: (attendanceData) => ({
        url: "/attendance",
        method: "POST",
        body: attendanceData,
      }),
      invalidatesTags: ["attendance"],
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetAttendanceForClassQuery,
  useAddAttendanceMutation,
} = attendanceAPi;
