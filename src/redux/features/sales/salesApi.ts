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
      providesTags: ["all-glasses"],
    }),
  }),
});

export const { useGetAllSalesQuery } = salesApi;
