import { baseApi } from '@/redux/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    register: builder.mutation({
      query: (userInfo: any) => ({
        url: '/user/register',
        method: 'POST',
        data: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo: any) => ({
        url: '/auth/login',
        method: 'POST',
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['USER'],
    }),
    sendOtp: builder.mutation({
      query: (userInfo: any) => ({
        url: '/otp/send',
        method: 'POST',
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userInfo: any) => ({
        url: '/otp/verify',
        method: 'POST',
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useSendOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
