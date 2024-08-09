import {
  Assignment,
  Batch,
  Course,
  Student,
  Submission,
  Teacher,
  User,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReduxApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://submission-portal-backend.vercel.app/api/v1/",
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

    getCourses: builder.query<Course[], string>({
      query: (token) => ({
        url: "/course/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getBatches: builder.query<Batch[], string>({
      query: (token) => ({
        url: "/batch/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getTeachers: builder.query<Teacher[], string>({
      query: (token) => ({
        url: "/admin/teachers/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getAllStudents: builder.query<Student[], string>({
      query: (token) => ({
        url: "/admin/students/all",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getUserById: builder.query<User, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `/auth/user/${id}`,
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
  useGetUserByIdQuery,
  useGetAllStudentsQuery,
  useGetTeachersQuery,
  useGetCoursesQuery,
  useGetBatchesQuery,
  useGetStudentsQuery,
  useGetAssignmentsQuery,
  useGetSubmissionHistoryQuery,
  useGetSubmissionsByAssignmentIdQuery,
  useGetWidgetsDataQuery,
} = ReduxApi;
