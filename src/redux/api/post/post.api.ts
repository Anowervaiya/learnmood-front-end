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
      query: ({ page, limit, accountId }) => ({
        url: `/post?page=${page}&limit=${limit}&accountId=${accountId}`,
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

    updatePost: builder.mutation({
      query: ({ postId, payload }) => ({
        url: `/post/${postId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "POST", id: postId },
        { type: "POST", id: "LIST" },
        { type: "POST", id: "MY_LIST" },
      ],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "POST", id: postId },
        { type: "POST", id: "LIST" },
        { type: "POST", id: "MY_LIST" },
      ],
    }),


  }),
});

export const {
  useCreatePostMutation,
  // useMyPostQuery,
  useAllPostQuery,
  useMypostQuery,
  useUpdatePostMutation,
  useDeletePostMutation

  // useFilterByStatusPostQuery,
} = PostApi;
