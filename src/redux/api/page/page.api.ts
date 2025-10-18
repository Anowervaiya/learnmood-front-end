

import { IPage } from '@/interfaces/page.interface';
import { baseApi } from '@/redux/baseApi';

interface getpageResponse {
  data: IPage[];
  meta?: { total: number };
  message: string;
  success: boolean;
}
interface createpageResponse {
  data: IPage;
  message: string;
  success: boolean;
  statusCode:number

}


export const pageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getpages: builder.query<
      getpageResponse,
      { entityId: string; entityType: string }
    >({
      query: ({ entityId, entityType }) => ({
        url: `/page?entityId=${entityId}&entityType=${entityType}`,
        method: 'GET',
      }),
      providesTags: (_result, _err, { entityId }) => [
        { type: 'PAGE', id: `LIST-${entityId}` },
      ],
    }),

    // Create Page
    createPage: builder.mutation<createpageResponse, { formData: FormData }>({
      query: ({ formData }) => ({
        url: '/page/create',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['PAGE'],
    }),

    // ✅ Update page
    updatepage: builder.mutation<
      IPage,
      { id: string; pageType: string; entityId: string }
    >({
      query: ({ id, pageType }) => ({
        url: `/page/${id}`,
        method: 'PATCH',
        data: { pageType },
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'PAGE', id: `LIST-${entityId}` },
      ],
    }),
    removePage: builder.mutation<
      { success: boolean; id: string },
      { id: string; entityId: string }
    >({
      query: ({ id }) => ({
        url: `/page/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'PAGE', id: `LIST-${entityId}` },
      ],
    }),
  }),
});

export const {
  useGetpagesQuery,
  useCreatePageMutation,
  useRemovePageMutation,
  useUpdatepageMutation,
} = pageApi;
