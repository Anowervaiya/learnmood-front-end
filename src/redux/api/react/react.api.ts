import { IReact } from '@/interfaces/react.interface';
import { baseApi } from '@/redux/baseApi';

interface ReactResponse {
  data: IReact;
  message: string;
  success: boolean;
  statusCode: number;
}


export const reactApi = baseApi.injectEndpoints({

  endpoints: builder => ({
    getUserAddedReact: builder.query<ReactResponse, { entityId: string; entityType: string }>({
      query: ({ entityId, entityType }) => ({
        url: `/react?entityId=${entityId}&entityType=${entityType}`,
        method: 'GET',
      }),
      providesTags: (result, error, { entityId }) => [
        { type: 'REACT', id: `${entityId}` },
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
        { type: "POST", id: entityId }, // Post count refresh
        { type: "REACT", id: `${entityId}` }, // initial button refresh
      ],

    }),


  }),
});

export const {
  useGetUserAddedReactQuery,
  useAddReactMutation,
} = reactApi;
