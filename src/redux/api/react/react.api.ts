import { IReact } from '@/interfaces/react.interface';
import { baseApi } from '@/redux/baseApi';

interface ReactResponse {
  data: IReact[];
  meta: { total: number };
  message: string;
  success: boolean;
}


export const reactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReacts: builder.query<
      ReactResponse,
      { entityId: string; entityType: string }
    >({
      query: ({ entityId, entityType }) => ({
        url: `/react?entityId=${entityId}&entityType=${entityType}`,
        method: 'GET',
      }),

      providesTags: (_result, _err, { entityId }) => [
        { type: 'REACT', id: `LIST-${entityId}` },
      ],
    }),

    // Add react
    addReact: builder.mutation<IReact, Partial<IReact>>({
      query: data => ({
        url: '/react',
        method: 'POST',
        data,
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'REACT', id: `LIST-${entityId}` },
      ],
    }),

    // ✅ Update react
    updateReact: builder.mutation<
      IReact,
      { id: string; reactType: string; entityId: string }
    >({
      query: ({ id, reactType }) => ({
        url: `/react/${id}`,
        method: 'PATCH',
        data: { reactType },
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'REACT', id: `LIST-${entityId}` },
      ],
    }),
    removeReact: builder.mutation<{ success: boolean; id: string }, {id:string, entityId:string}>({
      query:( {id} )=> ({
        url: `/react/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'REACT', id: `LIST-${entityId}` },
      ],
    }),
  }),
});

export const {
  useGetReactsQuery,
  useAddReactMutation,
  useRemoveReactMutation,
  useUpdateReactMutation,
} = reactApi;
