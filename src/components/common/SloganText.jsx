// src/components/common/SloganText.jsx
import React from 'react';
const SloganText = ({ textColor = 'text-white' }) => {
  return (
    <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 fade-in-left">
      <h1
        className={`text-4xl md:text-6xl font-bold ${textColor}`}
        style={{ lineHeight: '1.8em' }} // 또는 더 큰 값으로 조정
      >
        우리끼리
        <br /> 만드는
        <br />
        패키지 여행
      </h1>
    </div>
  );
};
export default SloganText;
