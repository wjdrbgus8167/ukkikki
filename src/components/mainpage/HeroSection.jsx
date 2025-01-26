import React from 'react';
import background from '../../assets/home_image.png'; // 배경 이미지 경로 설정
import SearchBar from '../layout/SearchBar';

const HeroSection = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col md:flex-row items-center md:px-28 py-10"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* 왼쪽 텍스트 */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 leading-loose md:leading-loose fade-in-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          우리끼리
          <br /> 만드는
          <br />
          패키지 여행
        </h1>
      </div>

      {/* 오른쪽 검색바 */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end fade-in-right">
        <SearchBar className="w-full max-w-lg" />
      </div>
    </div>
  );
};

export default HeroSection;