

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
interface getMyPages {
  data: IPage[];
  message: string;
  success: boolean;
  statusCode: number;
}


export const pageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPages: builder.query<getMyPages, undefined>({
      query: () => ({
        url: `/page/my-page`,
        method: 'GET',
      }),
      providesTags: ['PAGE'],
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
        { type: 'PAGE', id: `${entityId}` },
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
        { type: 'PAGE', id: `${entityId}` },
      ],
    }),
  }),
});

export const {
  useGetMyPagesQuery,
  useCreatePageMutation,
  useRemovePageMutation,
  useUpdatepageMutation,
} = pageApi;
