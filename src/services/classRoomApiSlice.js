import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classRoomApi = createApi({
  reducerPath: "classRoomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/cls" }),

  endpoints: (builder) => ({
    getAllClasses: builder.query({
      query: () => "classRoom",
    }),
    getClass: builder.query({
      query: (classId) => `classRoom/${classId}`,
    }),
  }),
});

export const { useGetAllClassesQuery, useGetClassQuery } = classRoomApi;
