// src/api/axiosInstance.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // 환경변수에서 API 베이스 URL 가져오기
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
