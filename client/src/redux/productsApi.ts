import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "product",
    }),
    getBrands: build.query({
      query: () => "brand",
    }),
  }),
});

export const { useGetProductsQuery, useGetBrandsQuery } = productsApi;
