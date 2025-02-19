/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard-Regular'],
        jalnan: ['JalnanGothic'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
          '75%': { transform: 'translateX(-3px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite', // 무한 반복
      },
      colors: {
        yellow: '#FFCF0E',
        'dark-green': '#4d6f7a', // 메인페이지 인디케이터 색상
        brown: '#412B2B', // 메인페이지 캐러셀 화살표 색상
        progress: '#3b82f6', // blue-500
        proposal: '#f97316', // orange-500
        reservation: '#22c55e', // green-500
        confirmed: '#a855f7', // purple-500

        // 추가한 여행 테마 색상들
        golf: '#E91E63', // 골프 (중복된 색상은 하나로 정리)
        'tourism-relaxation': '#2196F3', // 관광+휴양
        relaxation: '#009688', // 휴양
        tourism: '#FFEB3B', // 관광
        luxury: '#9C27B0', // 럭셔리
        food: '#FF5722', // 식도락
        soccer: '#F44336', // 축구
        'local-culture': '#3F51B5', // 현지문화체험
        'marine-sports': '#00BCD4', // 해양스포츠
        'hot-spring': '#CDDC39', // 온천
        'sns-hot': '#FF4081', // SNS핫플
        pilgrimage: '#8B4513', // 성지순례
        'train-trip': '#FF9800', // 기차여행

        // 메인페이지 달력
        today: '#3b82f6', // 오늘 날짜 색상
        start: '#10b981', // 출발일 색상
        end: '#ef4444', // 도착일 색상
        range: '#bbf7d0', // 범위 색상

        // 좋아요 리스트 메달 색깔
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',

        airbnb: '#FF5A5F',
      },
      width: {},
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
