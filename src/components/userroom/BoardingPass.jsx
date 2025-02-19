import React from 'react';
import { FaPlane } from 'react-icons/fa';
import ProposalButton from './ProposalButton';

const BoardingPass = ({ selectedCard, zoomLevel = 0.60 }) => {
  if (!selectedCard) return null;

  // planningStatus에 따른 상태 텍스트와 스타일 (기본값 처리)
  const { planningStatus } = selectedCard;
  
  // let을 사용해서 재할당 가능하도록 함
  let statusDescription = "";

  // 진행 상태 요약(짧은 텍스트: 진행, 입찰, 예약, 확정)
  const statusKeyMapping = {
    IN_PROGRESS: "진행",
    BIDDING: "입찰",
    BOOKING: "예약",
    CONFIRMED: "확정",
  };
  const currentStatusLabel = statusKeyMapping[planningStatus] || "";

  // planningStatus에 따라 버튼 텍스트와 Todo 항목 변경
  let buttonText = "여행사에 제안하기";
  let todoItems = ["☐ 여행지 추가하기", "☐ 좋아요로 관심 표시하기"];

  switch (planningStatus) {
    case "IN_PROGRESS":
      buttonText = "여행사에 제안하기";
      todoItems = ["☐ 여행지 추가하기", "☐ 좋아요로 관심 표시하기"];
      statusDescription = "가고 싶은 여행지 조사를 하고 있어요!";
      break;
    case "BIDDING":
      buttonText = "제안서 제출 완료";
      todoItems = ["☐ 가고 싶은 패키지 투표하기", "☐ 여행사에게 문의하기"];
      statusDescription = "여행사에서 패키지 여행을 계획하고 있어요!";
      break;
    case "BOOKING":
      buttonText = "예약 진행 중";
      todoItems = ["☐ 일행 정보 입력하기", "☐ 예약금 넣기"];
      statusDescription = "패키지 여행을 예약 중이에요!";
      break;
    case "CONFIRMED":
      buttonText = "여행 확정됨";
      todoItems = ["☐ 여행 일정 확인하기", "☐ 출발 준비"];
      statusDescription = "여행이 확정되었습니다!";
      break;
    default:
      statusDescription = "";
  }

  // 진행 상태 표시용 라벨 배열 (순서대로 표시)
  const statusLabels = ["진행", "입찰", "예약", "확정"];
  const getTextSizeClass = (length) => {
    if (length <= 4) return "text-7xl";  
    if (length <= 5) return "text-6xl";
    if (length <= 7) return "text-5xl";
    if (length <= 14) return "text-4xl";
    if (length <= 18) return "text-3xl";
    return "text-2xl"; 
  };
  
  // 도착도시의 폰트 크기보다 2단계 작게 조정하는 함수
  const getSmallerTextSizeClass = (sizeClass) => {
    const sizeMap = {
      "text-7xl": "text-5xl",
      "text-6xl": "text-4xl",
      "text-5xl": "text-3xl",
      "text-4xl": "text-2xl",
      "text-3xl": "text-xl",
      "text-2xl": "text-lg",
      "text-xl": "text-base",
      "text-lg": "text-sm",
    };
    return sizeMap[sizeClass] || "text-sm"; // 최소 크기 보장
  };
  
  
  const departureCityName = selectedCard.departureCity?.name || "출발도시";
  const arrivalCityName = selectedCard.arrivalCity?.name || "도착도시";
  
  const arrivalCitySize = getTextSizeClass(arrivalCityName.length);
  const departureCitySize = getSmallerTextSizeClass(arrivalCitySize);
  

  return (
    <div className="max-w-4xl mx-auto p-4" style={{ zoom: zoomLevel }}>
      <div className="flex rounded-[54px] overflow-hidden shadow-md border border-gray-300">
        {/* 1) 왼쪽(노란색) 영역 */}
        <div className="w-1/2 bg-yellow py-8 pl-8 pr-4 text-black flex flex-col justify-start space-y-4">
          <h2 className="font-bold leading-normal text-left text-xl sm:text-base md:text-3xl mb-6">
            {selectedCard.name || '방 이름 없음'}
          </h2>
          <div className="transform translate-y-16">
            <div className="flex items-center space-x-2 min-w-0">
              {/* 출발도시 */}
              <span className={`font-semibold ${departureCitySize}`}>
                {departureCityName}
              </span>
            </div>
            <div className="flex items-start space-x-2 min-w-0">
              <div>
                <FaPlane className="text-2xl sm:text-3xl md:text-4xl" />
              </div>
              {/* 도착도시 */}
              <span className={`font-black ${arrivalCitySize}`}>
                {arrivalCityName}
              </span>
            </div>
          </div>
        </div>
        {/* 2) 오른쪽(흰색) 영역: 날짜, 인원, 테마 등 */}
        <div className="w-2/3 bg-white py-8 px-4 flex flex-col">
          <p className="text-xl sm:text-base md:text-xl font-semibold">
            {selectedCard.startDate} → {selectedCard.endDate}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-xl text-gray-600">최소인원</p>
              <p className="text-2xl font-bold">{selectedCard.minPeople || 0}명</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-gray-600">최대인원</p>
              <p className="text-2xl font-bold">{selectedCard.maxPeople || 0}명</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-gray-600">현재인원</p>
              <p className="text-2xl font-bold">{selectedCard.currentParticipants || 0}명</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-xl text-gray-600">나의일행</p>
              <p className="text-2xl font-bold">{selectedCard.member?.totalParticipants || 0}명</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-gray-600">방장 Y/N</p>
              <p className="text-2xl font-bold">{selectedCard.member?.isHost ? 'YES' : 'NO'}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl text-gray-600 pb-2">테마</p>
            <div className="flex flex-wrap gap-2">
              {(selectedCard.keywords || []).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full bg-gray-500 text-white text-xl font-medium"
                >
                  {keyword.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3) 가운데 세로 라인 */}
        <div className="flex items-center bg-white">
          <div className="w-0.5 bg-[#412B2B] h-[80%] mx-3"></div>
        </div>

        {/* 4) 진행 상태 및 추가 정보 영역 */}
        <div className="w-2/3 bg-white py-8 px-4 flex flex-col">
          <div className="text-xl sm:text-2xl font-normal flex items-center">
            {statusLabels.map((label, idx) => (
              <React.Fragment key={label}>
                <span
                  className={
                    label === currentStatusLabel
                      ? "font-bold text-black"
                      : "text-gray-500"
                  }
                >
                  {label}
                </span>
                {idx < statusLabels.length - 1 && (
                  <span className="text-gray-500 mx-2">-</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* 진행 상태 뱃지 및 상세 정보 */}
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-left text-4xl sm:text-5xl md:text-6xl mt-3 font-black">
              {currentStatusLabel}
            </h1>
            <p className="text-gray-600 text-xl sm:text-2xl">
            {statusDescription}
            </p>
            {/* Todo 목록 - 상태에 따라 내용 변경 */}
            <div>
              <h2 className="text-xl font-bold py-1">Todo</h2>
              <ul className="text-2xl font-medium text-gray-600 space-y-1">
              {todoItems.map((item, idx) => (
                  <li key={idx} >{item}</li>
                ))}
              </ul>
            </div>
            {/* 버튼 - 상태에 따라 텍스트 변경 */}
            <div className="flex flex-1 justify-center">
              <ProposalButton 
                selectedCard={selectedCard}
                travelPlanId={selectedCard.travelPlanId}
                currentParticipants={selectedCard.currentParticipants}
                minPeople={selectedCard.minPeople}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;
