import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: ({ filter, userInfo }) => {
        console.log(filter);
        const params = new URLSearchParams();
        if (filter) {
          params.append("filterBy", filter);
        }
        return {
          url: `/sales/get-all-sales/${userInfo.email}/${userInfo.role}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["sales"],
    }),
    getSale: builder.query({
      query: (id: string) => ({
        url: `/sales/get-sale/${id}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useGetAllSalesQuery, useGetSaleQuery } = salesApi;
