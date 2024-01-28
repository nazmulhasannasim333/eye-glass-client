import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query) {
          params.append("filterBy", query);
        }
        return {
          url: "/sales/get-all-sales",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["all-glasses"],
    }),
  }),
});

export const { useGetAllSalesQuery } = salesApi;
