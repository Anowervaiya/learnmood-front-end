import { baseApi } from '@/redux/baseApi';

export const UserApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: (userInfo: any) => ({
        url: '/user/register',
        method: 'POST',
        data: userInfo,
      }),
    }),

    deleteUser: builder.mutation({
      query: id => ({
        url: `/User/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USER'],
    }),

    myUser: builder.query({
      query: () => ({
        url: '/User/my-User',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

    filterByStatusUser: builder.query({
      query: payload => ({
        url: `/User/filterByStatus`,
        method: 'GET',
        params: payload,
      }),
      providesTags: ['USER'],
    }),

    allUser: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});

export const {
useRegisterMutation,
  useMyUserQuery,
  useAllUserQuery,
  useDeleteUserMutation,
  useFilterByStatusUserQuery,
} = UserApi;
