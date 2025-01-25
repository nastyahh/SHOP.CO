import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { LoginData, LoginResponse } from "../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "product",
    }),
    getOneProduct: build.query({
      query: (id) => `product/${id}`,
    }),
    getBrands: build.query({
      query: () => "brand",
    }),
    login: build.mutation<LoginResponse, LoginData>({
      query: (formData) => ({
        url: "user/login",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: LoginResponse) => {
        const decodedToken = jwtDecode(response.token);
        return { ...response, user: decodedToken };
      },
    }),
    signUp: build.mutation({
      query: (formData) => ({
        url: "user/registration",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => {
        const decodedToken = jwtDecode(response.token);
        return { ...response, user: decodedToken };
      },
    }),
    checkAuth: build.query({
      query: () => "user/auth",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetBrandsQuery,
  useGetOneProductQuery,
  useLoginMutation,
  useSignUpMutation,
  useCheckAuthQuery,
} = productsApi;
