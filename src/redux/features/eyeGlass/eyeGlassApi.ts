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

        return {
          url: `/products/get-all-products`,
          method: "GET",
          params: params,
          // params: {
          //   frameMaterial: query.material,
          //   frameShape: query.shape,
          //   lensType: query.lens,
          //   brand: query.brand,
          //   gender: query.gender,
          //   color: query.color,
          //   minPrice: query.minPrice,
          //   maxPrice: query.maxPrice,
          // },
        };
      },
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
