import axios from 'axios';
import { HttpStatusCode } from '../../common/enums/http.status.code.enum';
import { getToken } from '../../services/auth/token.service';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;