
import { IComment } from '@/interfaces/react.interface';
import { baseApi } from '@/redux/baseApi';

interface commentResponse {
  data: IComment[];
  meta: { total: number };
  message: string;
  success: boolean;
}


export const commentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getcomments: builder.query<
      commentResponse,
      { entityId: string; entityType: string }
    >({
      query: ({ entityId, entityType }) => ({
        url: `/comment?entityId=${entityId}&entityType=${entityType}`,
        method: 'GET',
      }),
      providesTags: (_result, _err, { entityId }) => [
        { type: 'COMMENT', id: `${entityId}` },
      ],
    }),

    // Add comment
    addcomment: builder.mutation<
      IComment,
      { formData: FormData; entityId: string }
    >({
      query: ({formData} )=> ({
        url: '/comment',
        method: 'POST',
        data : formData,
      }),
      invalidatesTags: (_res, _err, { entityId }) => [{ type: 'COMMENT', id: `${entityId}` }, { type: 'POST', id: `${entityId}` }]
    
    }),

    // ✅ Update comment
    updatecomment: builder.mutation<
      IComment,
      { id: string; commentType: string; entityId: string }
    >({
      query: ({ id, commentType }) => ({
        url: `/comment/${id}`,
        method: 'PATCH',
        data: { commentType },
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'COMMENT', id: `${entityId}` },
      ],
    }),
    removecomment: builder.mutation<
      { success: boolean; id: string },
      { id: string; entityId: string }
    >({
      query: ({ id }) => ({
        url: `/comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'COMMENT', id: `${entityId}` },
      ],
    }),
  }),
});

export const {
  useGetcommentsQuery,
  useAddcommentMutation,
  useRemovecommentMutation,
  useUpdatecommentMutation
} = commentApi;
