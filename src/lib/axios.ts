import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL 
  //  || 'http://localhost:5000/api/v1'  ,
  || 'https://learnmood-back-end-5.onrender.com/api/v1',
  withCredentials: true,
});
