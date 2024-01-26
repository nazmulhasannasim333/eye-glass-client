import { baseApi } from "../../api/baseApi";

const eyeGlassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: () => ({
        url: "/products/get-all-products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEyeGlassQuery } = eyeGlassApi;
