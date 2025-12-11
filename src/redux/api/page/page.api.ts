

import { IPage } from '@/interfaces/page.interface';
import { baseApi } from '@/redux/baseApi';

interface getpageResponse {
  data: IPage[];
  meta?: { total: number; page: number; limit: number; totalPage: number };
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

    getPageInfo: builder.query({
      query: () => ({
        url: `/page/me`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'PAGE', id }],
    }),

     getAllPage: builder.query<
      getpageResponse,
      { page: number; limit: number; searchTerm?: string }
    >({
      query: ({ page, limit, searchTerm }) => ({
        url: `/page?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'PAGE' as const,
                id: _id,
              })), // individual items
              { type: 'PAGE' as const, id: 'PAGE_LIST' }, // full list tag
            ]
          : [{ type: 'PAGE' as const, id: 'PAGE_LIST' }],
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
  useGetPageInfoQuery,
  useGetAllPageQuery
} = pageApi;
