import { axiosInstance } from '@/lib/axios';// same helper as serverFetch
import { getCookie } from '@/utils/tokenHandlers';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, type AxiosRequestConfig } from 'axios';

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const accessToken = await getCookie('accessToken'); // read token from cookies

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: accessToken,
        },
         // allow cookies cross-origin
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
