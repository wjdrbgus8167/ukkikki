import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 인터셉터 추가: 토큰 재발급 로직
publicRequest.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 발생 및 재시도하지 않은 요청인 경우
    if (
      error.response &&
      (error.response.status === 401 ||
        (error.response.status === 400 &&
          error.response.data?.message.includes('token expired'))) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한 재시도 방지

      try {
        // 토큰 재발급 엔드포인트 호출
        await axios.post(
          `${BASE_URL}api/v1/auth/token/refresh`,
          {}, // 필요한 경우 body를 추가
          { withCredentials: true }, // 쿠키 전송
        );

        // 토큰 갱신 후, 원래의 요청을 재시도
        return publicRequest(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 리프레시 토큰이 만료되었거나 갱신에 실패한 경우
        return Promise.reject(refreshError);
      }
    }

    // 그 외의 에러는 그대로 reject
    return Promise.reject(error);
  },
);
