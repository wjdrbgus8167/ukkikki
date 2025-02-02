import React, { useState, useEffect,useRef  } from 'react';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

const DashBoard = () => {
  const [imageUrl, setImageUrl] = useState('');
  const hasFetched = useRef(false); // fetch 여부를 추적

  useEffect(() => {
    // 일본과 관련된 랜덤 이미지를 가져오기
    if(hasFetched.currrnt) return;
    hasFetched.current = true;

    const fetchImage = async () => {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=Japan&client_id=${apiKey}`);
      const data = await response.json();
      setImageUrl(data?.urls?.regular);  
    };

    fetchImage();
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-8">
      {/* 여행 이미지 */}
      <img
  src={imageUrl}
  alt="Travel"
  className="w-full md:w-96 h-64 object-cover rounded-lg shadow-md"
/>


      {/* 여행 패키지 정보 */}
      <div className="md:w-1/3 p-4">
        <h2 className="text-2xl font-bold mb-4">여행 패키지 정보</h2>
        <p className="text-gray-700">
          여행 기간, 가격, 포함 사항 등을 이곳에 적어주세요.
        </p>
      </div>

      {/* 방장의 제안 */}
      <div className="md:w-1/3 text-center bg-yellow-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-yellow-800">
          방장의 제안하기를 기다리는 중입니다.
        </h3>
      </div>
    </div>
  );
};

export default DashBoard;