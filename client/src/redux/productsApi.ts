import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { AuthData, AuthResponse } from "../types";

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
  tagTypes: ["Cart", "User"],
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
    login: build.mutation<AuthResponse, AuthData>({
      query: (formData) => ({
        url: "user/login",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: AuthResponse) => {
        const decodedToken = jwtDecode(response.token);
        return { ...response, user: decodedToken };
      },
    }),
    signUp: build.mutation<AuthResponse, AuthData>({
      query: (formData) => ({
        url: "user/registration",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: AuthResponse) => {
        const decodedToken = jwtDecode(response.token);
        return { ...response, user: decodedToken };
      },
    }),
    checkAuth: build.query({
      query: () => "user/auth",
    }),
    getCart: build.query({
      query: (userId) => `cart/${userId}`,
      providesTags: ["Cart"],
    }),

    addToCart: build.mutation({
      query: (productData) => ({
        url: "cart",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: build.mutation({
      query: (cartItemData) => ({
        url: "cart/delete",
        method: "DELETE",
        body: cartItemData,
      }),
      invalidatesTags: ["Cart"],
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
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
} = productsApi;
