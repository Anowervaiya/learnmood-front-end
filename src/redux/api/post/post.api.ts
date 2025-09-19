import { baseApi } from '@/redux/baseApi';

export const PostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: PostInfo => ({
        url: '/post/create',
        method: 'POST',
        data: PostInfo,
      }),
      invalidatesTags:['POST']

    }),

   
    // deletePost: builder.mutation({
    //   query: id => ({
    //     url: `/Post/delete/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['POST'],
    // }),

    // myPost: builder.query({
    //   query: () => ({
    //     url: '/Post/my-Post',
    //     method: 'GET',
    //   }),
    //   providesTags: ['POST'],
    // }),

    // filterByStatusPost: builder.query({
    //   query: payload => ({
    //     url: `/Post/filterByStatus`,
    //     method: 'GET',
    //     params: payload,
    //   }),
    //   providesTags: ['POST'],
    // }),

    allPost: builder.query({
      query: () => ({
        url: '/post',
        method: 'GET',
      }),
      providesTags: ['POST'],
    }),
  }),
});

export const {
useCreatePostMutation,
  // useMyPostQuery,
  useAllPostQuery,
  // useDeletePostMutation,
  // useFilterByStatusPostQuery,
} = PostApi;
