import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery
} from "@reduxjs/toolkit/query";

export const createBaseQueryCustom = (
  baseUrl: string | undefined
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl || "",
    prepareHeaders: (headers, { getState }) => {
      const token = "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  });

  return async (args, api, extraOptions) => {
    let result: any = await baseQuery(args, api, extraOptions);

    if (result?.data?.token) {
      // logic to manage token
    }

    return result;
  };
};
