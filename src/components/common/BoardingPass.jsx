import React from 'react';
import { FaPlane } from 'react-icons/fa';

const BoardingPass = ({ selectedCard }) => {
  if (!selectedCard) return null;

  console.log(selectedCard);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex rounded-[54px] overflow-hidden shadow-md border border-gray-300">
        {/* 1) 왼쪽(노란색) 영역 */}
        <div className="w-1/3 bg-yellow py-8 pl-8 pr-4 text-black flex flex-col justify-start space-y-4">
          {/* 방 이름 */}
          <h2 className="font-bold leading-normal text-left text-base sm:text-lg md:text-xl mb-6">
            {selectedCard.roomName || '방 이름 없음'}
          </h2>

          {/* 서울 */}
          <h2 className="font-extrabold text-left text-3xl sm:text-4xl md:text-5xl">
            서울
          </h2>

          {/* 비행기 아이콘 + 도쿄 */}
          <div className="flex items-start space-x-2">
            <FaPlane className="text-2xl sm:text-3xl md:text-4xl" />
            <h2 className="font-black text-left text-5xl sm:text-6xl md:text-7xl mb-6">
              도쿄
            </h2>
          </div>
        </div>

        {/* 3) 오른쪽(흰색) 영역: 날짜 + 인원 정보 */}
        <div className="w-2/3 bg-white py-8 px-4 flex flex-col">
          {/* 날짜 */}
          <p className="text-base sm:text-lg md:text-xl font-bold">
            {selectedCard.startDate} → {selectedCard.endDate}
          </p>

          {/* 인원 정보 */}
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">최소인원</p>
              <p className="text-lg font-bold">
                {selectedCard.minPeople || 0}명
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">최대인원</p>
              <p className="text-lg font-bold">
                {selectedCard.maxPeople || 0}명
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">현재인원</p>
              <p className="text-lg font-bold">
                {selectedCard.currentPeople || 0}명
              </p>
            </div>
          </div>

          {/* 나의일행 & 방장여부 */}
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">나의일행</p>
              <p className="text-lg font-bold">
                {selectedCard.myGroupSize || 0}명
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">방장 Y/N</p>
              <p className="text-lg font-bold">
                {selectedCard.isHost ? 'YES' : 'NO'}
              </p>
            </div>
          </div>

          {/* 테마 */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 pb-2">테마</p>
            <div className="flex flex-wrap gap-2">
              {(selectedCard.themeTags || []).map((theme, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-white`}
                  style={{ backgroundColor: theme.color }}
                >
                  {theme.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4) 가운데 세로 라인 */}
        <div className="flex items-center">
          <div className="w-1 bg-[#412B2B] h-[80%] mx-4"></div>
        </div>

        {/* 5) 진행 상태 + TODO 리스트 */}
        <div className="w-2/3 bg-white py-8 px-4 flex flex-col">
          {/* 진행 상태 */}
          <div className="text-base sm:text-lg font-normal flex items-center">
            <span className="font-bold text-black">진행</span>
            <span className="text-gray-500 mx-2">-</span>
            <span className="text-gray-500">입찰</span>
            <span className="text-gray-500 mx-2">-</span>
            <span className="text-gray-500">예약</span>
            <span className="text-gray-500 mx-2">-</span>
            <span className="text-gray-500">확정</span>
          </div>

          <div className="flex flex-col items-start space-y-4">
            {/* 큰 "진행" 텍스트 */}
            <h1 className="text-left text-5xl sm:text-6xl md:text-7xl mt-3 font-black">
              진행
            </h1>

            {/* 설명 문구 */}
            <p className="text-gray-600 text-base sm:text-lg">
              가고 싶은 여행지 조사를 하고 있어요!
            </p>

            {/* TODO 리스트 */}
            <div>
              <h2 className="text-lg font-bold">Todo</h2>
              <ul className="text-gray-600 space-y-1">
                <li>☐ 여행지 추가하기</li>
                <li>☐ 좋아요로 관심 표시하기</li>
              </ul>
            </div>

            {/* 버튼 */}
            <div className="flex flex-1 justify-center">
              <button className="w-full sm:w-auto bg-red-500 text-white font-bold py-4 px-6 rounded-lg text-lg sm:text-xl">
                여행사에 제안하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;
