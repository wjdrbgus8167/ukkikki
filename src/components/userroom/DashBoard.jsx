import React, { useState, useEffect, useRef } from 'react';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

const DashBoard = ({ selectedCard }) => {
  const [imageUrl, setImageUrl] = useState('');
  const hasFetched = useRef(false); // fetch 여부를 추적
  if (!selectedCard) {
    // 데이터가 없을 경우 로딩 상태 표시
    return <p>로딩 중입니다...</p>;
  }
  useEffect(() => {
    // 일본과 관련된 랜덤 이미지를 가져오기
    if (hasFetched.currrnt) return;
    hasFetched.current = true;

    const fetchImage = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${selectedCard.arrivalCity.name}&client_id=${apiKey}`,
      );
      const data = await response.json();
      setImageUrl(data?.urls?.regular);
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-8 bg-gray-100 md:flex-row">
      {/* 여행 이미지 */}
      <div className="relative">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Travel"
            className="object-cover w-full h-64 rounded-lg shadow-md md:w-96"
          />
        )}
        {/* 이미지 왼쪽 상단에 planningStatus 추가 */}
        {selectedCard.planningStatus && (
          <span className="absolute px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-md top-2 left-2">
            {selectedCard.planningStatus}
          </span>
        )}
      </div>

      {/* 여행 패키지 정보 */}
      <div className="p-4 md:w-1/3">
        <h2 className="mb-4 text-2xl font-bold">
          {selectedCard?.name || '기본 이름'}
        </h2>
        <p className="text-gray-700">
          {selectedCard.startDate} ~ {selectedCard.endDate}
        </p>
        <p className="text-gray-700">{selectedCard.arrivalCity.name}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <strong>키워드:</strong>
          {selectedCard.keywords && selectedCard.keywords.length > 0 ? (
            selectedCard.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full"
              >
                {keyword.name}
                {keyword.keywordId}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">키워드가 없습니다.</span>
          )}
        </div>
      </div>

      {/* 여행사에 제안하기 버튼 */}
      <div className="p-4 text-center bg-yellow-100 rounded-lg shadow-md md:w-1/3">
        <button
          className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
          onClick={() => {
            // 여행사에 제안하기 버튼 클릭 시 동작
            alert('여행사에 제안하기 버튼이 클릭되었습니다!');
          }}
        >
          여행사에 제안하기
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
