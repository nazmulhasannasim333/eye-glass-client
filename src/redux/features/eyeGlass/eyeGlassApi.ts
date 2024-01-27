import { baseApi } from "../../api/baseApi";

const eyeGlassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: () => ({
        url: "/products/get-all-products",
        method: "GET",
      }),
    }),
    addEyeGlass: builder.mutation({
      query: (productData) => ({
        url: "/products/add-product",
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const { useGetAllEyeGlassQuery, useAddEyeGlassMutation } = eyeGlassApi;
