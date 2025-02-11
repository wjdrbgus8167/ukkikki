import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

publicRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 발생 및 재시도하지 않은 요청인 경우
    if (error.response?.data?.error?.code === 'A003') {
      originalRequest._retry = true; // 무한 재시도 방지

      try {
        await axios.post(
          `${BASE_URL}api/v1/auth/token/refresh`,
          {},
          { withCredentials: true },
        );

        return publicRequest(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
