import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://localhost:8080" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"], // for cache
  endpoints: (builder) => ({}),
});
