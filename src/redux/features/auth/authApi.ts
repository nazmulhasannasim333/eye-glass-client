import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/users/login-user",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
