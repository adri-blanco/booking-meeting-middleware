import axios from 'axios';
import ApiError from '../utils/ApiError';

const BACKEND_URL = 'https://ems-glance.accenture.com/Display';

if(!BACKEND_URL) {
  throw new ApiError('Backend url is not set as a env var', 400);
}

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (err) => {
    if(err.code === 'ENOTFOUND' && BACKEND_URL.includes(err.hostname)) {
      return Promise.reject(new ApiError('Conection to backend failed', 400, { ERROR_CODE: 'BACKEND_CONNECTION' }));
    }
    return Promise.reject(err)
  },
);

export default axiosInstance;
