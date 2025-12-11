import { baseApi } from '@/redux/baseApi';

export const PostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: PostInfo => ({
        url: '/post/create',
        method: 'POST',
        data: PostInfo,
      }),
      invalidatesTags: [{ type: "POST", id: "LIST" }],
    }),

    allPost: builder.query({
      query: ({ page, limit }) => ({
        url: `/post?page=${page}&limit=${limit}`,
        method: 'GET',
      }),

      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map((post: any) => ({
              type: "POST",
              id: post._id,
            })),
            { type: "POST", id: "LIST" }, // list tag
          ]
          : [{ type: "POST", id: "LIST" }],
    }),
    mypost: builder.query({
      query: ({ page, limit, userId }) => ({
        url: `/post?page=${page}&limit=${limit}&user=${userId}`,
        method: 'GET',
      }),
     providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((post: any) => ({
                type: "POST",
                id: post._id,
              })),
              { type: "POST", id: "MY_LIST" },
            ]
          : [{ type: "POST", id: "MY_LIST" }],
  
    }),
  }),
});

export const {
  useCreatePostMutation,
  // useMyPostQuery,
  useAllPostQuery,
  useMypostQuery
  // useDeletePostMutation,
  // useFilterByStatusPostQuery,
} = PostApi;
