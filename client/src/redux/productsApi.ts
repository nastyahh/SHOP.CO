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
  tagTypes: ["Cart", "User", "Rating", "Product", "Category"],
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (formData) => ({
        url: "product",
        method: "POST",
        body: formData,
      }),
    }),
    getProducts: build.query({
      query: (params) => ({
        url: "product",
        params,
      }),
    }),
    getOneProduct: build.query({
      query: (id) => `product/${id}`,
      providesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: (formData) => ({
        url: "product",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getBrands: build.query({
      query: () => "brand",
    }),
    createBrand: build.mutation({
      query: (brandData) => ({
        url: "brand",
        method: "POST",
        body: brandData,
      }),
    }),
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: "category",
        method: "POST",
        body: categoryData,
      }),
    }),
    getCategories: build.query({
      query: () => "category",
      providesTags: ["Category"],
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
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: "user/change-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
    checkAuth: build.query({
      query: () => "user/auth",
      keepUnusedDataFor: 5,
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
    addRating: build.mutation({
      query: (ratingData) => ({
        url: "rating",
        method: "POST",
        body: ratingData,
      }),
      invalidatesTags: ["Product"],
    }),
    getUserRating: build.query({
      query: ({ userId, productId }) =>
        `rating/get-user-rating?userId=${userId}&productId=${productId}`,
    }),
    verifyReCaptcha: build.mutation({
      query: (token) => ({
        url: "recaptcha/verify",
        method: "POST",
        body: token,
      }),
    }),
    createFeedback: build.mutation({
      query: (feedbackData) => ({
        url: "feedback",
        method: "POST",
        body: feedbackData,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetOneProductQuery,
  useLoginMutation,
  useSignUpMutation,
  useCheckAuthQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useAddRatingMutation,
  useGetUserRatingQuery,
  useCreateCategoryMutation,
  useCreateBrandMutation,
  useVerifyReCaptchaMutation,
  useCreateFeedbackMutation,
  useChangePasswordMutation,
  useUpdateProductMutation,
} = productsApi;
