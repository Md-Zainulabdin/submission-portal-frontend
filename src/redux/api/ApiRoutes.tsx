import { Assignment, Student, Submission } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReduxApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], string>({
      query: (token) => ({
        url: "/student/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getWidgetsData: builder.query<any, string>({
      query: (token) => ({
        url: "/dashboard/widget-data",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getAssignments: builder.query<Assignment[], string>({
      query: (token) => ({
        url: "/assignment/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getSubmissionHistory: builder.query<Submission[], string>({
      query: (token) => ({
        url: "/submission/history",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getSubmissionsByAssignmentId: builder.query<
      Submission[],
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: `/submission/${id}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetAssignmentsQuery,
  useGetSubmissionHistoryQuery,
  useGetSubmissionsByAssignmentIdQuery,
  useGetWidgetsDataQuery,
} = ReduxApi;
