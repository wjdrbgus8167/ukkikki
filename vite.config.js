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
        rewrite: (path) =>
          path.replace(/^\/api\/flight/, '/service/rest/FlightScheduleList'),
      },
    },
<<<<<<< HEAD

    host: 'fe.i12c204.p.ssafy.io',
=======
    // host: 'fe.i12c204.p.ssafy.io',

>>>>>>> fd4c0d372ed1c96133be5653b990b92506a7dce0
  },
});
