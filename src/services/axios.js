import axios from 'axios';
import ApiError from '../utils/ApiError';

if(!process.env.BACKEND_URL) {
  throw new ApiError('Backend url is not set as a env var', 400);
}

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (err) => Promise.reject(err),
);

export default axiosInstance;
