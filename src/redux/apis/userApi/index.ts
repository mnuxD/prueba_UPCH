import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryCustom } from "../interceptor.global";
import { User, UserList } from "./types";
import { buildQueryParams } from "../../../helpers/helpers";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: createBaseQueryCustom(process.env.REACT_APP_BASE_URL_USER),
  tagTypes: ["getUsers"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserList, { nat?: string; gender?: string }>({
      query: ({ nat, gender }) =>
        `/?${buildQueryParams({
          exc: "login,dob,registered",
          results: 258,
          nat,
          gender
        })}&noinfo`,
      providesTags: ["getUsers"]
    }),
    updateUser: builder.mutation<any, { id: string; data: User }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["getUsers"]
    }),
    deleteUser: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["getUsers"]
    })
  })
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
