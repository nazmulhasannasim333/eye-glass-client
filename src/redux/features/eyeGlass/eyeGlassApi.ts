import { baseApi } from "../../api/baseApi";

const eyeGlassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: ({
        material,
        shape,
        lens,
        brand,
        gender,
        color,
        minPrice,
        maxPrice,
        searchTerm,
        page,
        limit,
        email,
        role,
      }) => {
        const params = new URLSearchParams();
        if (material) {
          params.append("frameMaterial", material);
        }
        if (shape) {
          params.append("frameShape", shape);
        }
        if (lens) {
          params.append("lensType", lens);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (gender) {
          params.append("gender", gender);
        }
        if (color) {
          params.append("color", color);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }
        return {
          url: `/products/get-all-products/${email}/${role}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["all-glasses"],
    }),
    getEyeGlass: builder.query({
      query: (id: string) => ({
        url: `/products/get-single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["all-glasses"],
    }),
    addEyeGlass: builder.mutation({
      query: (productData) => ({
        url: "/products/add-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["all-glasses"],
    }),
    updateEyeGlass: builder.mutation({
      query: ({ productData, id }) => {
        return {
          url: `/products/update-product/${id}`,
          method: "PUT",
          body: productData,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    deleteEyeGlass: builder.mutation({
      query: (id) => {
        return {
          url: `/products/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    deleteManyEyeGlass: builder.mutation({
      query: (ids) => {
        console.log(ids);
        return {
          url: `/products/delete-products`,
          method: "DELETE",
          body: ids,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    sellEyeGlass: builder.mutation({
      query: (sellData) => {
        return {
          url: `/sales/create-sales`,
          method: "POST",
          body: sellData,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
  }),
});

export const {
  useGetAllEyeGlassQuery,
  useAddEyeGlassMutation,
  useGetEyeGlassQuery,
  useUpdateEyeGlassMutation,
  useDeleteEyeGlassMutation,
  useSellEyeGlassMutation,
  useDeleteManyEyeGlassMutation,
} = eyeGlassApi;
