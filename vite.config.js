import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 서버 시작 시 브라우저 자동 열림
    proxy: {
      '/api/flight': {
        target: 'http://openapi.airport.co.kr', // API의 base URL
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/flight/, '/service/rest/FlightScheduleList'),
      },
    },
  },
});
