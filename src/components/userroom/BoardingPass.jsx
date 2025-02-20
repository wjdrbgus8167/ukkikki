import React from 'react';
import { FaPlane, FaExpand, FaCompress } from 'react-icons/fa';
import ProposalButton from './ProposalButton';
import { THEME_COLORS } from '../../constants';

const BoardingPass = ({ selectedCard, zoomLevel = 0.6, isSmall, setIsSmall }) => {
  if (!selectedCard) return null;

  // 상태 레이블 매핑
  const statusKeyMapping = {
    IN_PROGRESS: '진행',
    BIDDING: '입찰',
    BOOKING: '예약',
    CONFIRMED: '확정',
  };
  const currentStatusLabel = statusKeyMapping[selectedCard.planningStatus] || '';

  let statusDescription = '';
  let todoItems = ['☐ 여행지 추가하기', '☐ 좋아요로 관심 표시하기'];

  switch (selectedCard.planningStatus) {
    case 'IN_PROGRESS':
      statusDescription = '가고 싶은 여행지 조사를 하고 있어요!';
      break;
    case 'BIDDING':
      todoItems = ['☐ 패키지 투표하기', '☐ 여행사에게 문의하기'];
      statusDescription = '여행사에서 패키지 여행을 계획하고 있어요!';
      break;
    case 'BOOKING':
      todoItems = ['☐ 일행 정보 입력하기', '☐ 예약금 넣기'];
      statusDescription = '패키지 여행을 예약 중이에요!';
      break;
    case 'CONFIRMED':
      todoItems = ['☐ 여행 일정 확인하기', '☐ 출발 준비'];
      statusDescription = '여행이 확정되었습니다!';
      break;
    default:
      break;
  }

  const statusLabels = ['진행', '입찰', '예약', '확정'];

  const departureCityName = selectedCard.departureCity?.name || '출발도시';
  const arrivalCityName = selectedCard.arrivalCity?.name || '도착도시';

  // 크기 토글 함수
  const toggleSize = () => {
    setIsSmall((prev) => !prev);
  };

  return (
    <div
      className="ticket-style relative overflow-hidden max-w-4xl mx-auto p-4"
      style={isSmall ? {} : { zoom: zoomLevel }} // 축소 시 zoom 제거, 확대 시 zoomLevel 적용
    >
      {/* 크기 조절 버튼 */}
      <button
        onClick={toggleSize}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        {isSmall ? (
          <FaExpand className="text-lg" />
        ) : (
          <FaCompress className="text-lg" />
        )}
      </button>

      {!isSmall ? (
        // 확대 상태
        <div className="flex rounded-[54px] overflow-hidden shadow-md border border-gray-300">
          {/* 1) 왼쪽(노란색) 영역 */}
          <div className="w-1/2 bg-yellow py-8 pl-8 pr-4 text-black flex flex-col justify-start space-y-4">
            <h2 className="font-bold leading-normal text-left text-xl sm:text-base md:text-3xl mb-6">
              {selectedCard.name || '방 이름 없음'}
            </h2>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-gray-800">{departureCityName}</div>
              <FaPlane className="text-5xl text-gray-700" />
              <div className="text-4xl font-bold text-gray-900">{arrivalCityName}</div>
              <p className="text-base text-gray-500 uppercase tracking-wide">
                {departureCityName} to {arrivalCityName}
              </p>
            </div>

            {/* 바코드 영역 */}
            <div className="mt-8">
              <svg
                className="w-full h-20"
                viewBox="0 0 504 80"
                preserveAspectRatio="none"
              >
                <rect x="0" y="0" width="8" height="80" fill="#000" />
                <rect x="16" y="0" width="4" height="80" fill="#000" />
                <rect x="28" y="0" width="12" height="80" fill="#000" />
                <rect x="48" y="0" width="4" height="80" fill="#000" />
                <rect x="60" y="0" width="8" height="80" fill="#000" />
                <rect x="76" y="0" width="4" height="80" fill="#000" />
                <rect x="88" y="0" width="16" height="80" fill="#000" />
                <rect x="112" y="0" width="8" height="80" fill="#000" />
                <rect x="132" y="0" width="4" height="80" fill="#000" />
                <rect x="144" y="0" width="12" height="80" fill="#000" />
                <rect x="164" y="0" width="4" height="80" fill="#000" />
                <rect x="176" y="0" width="8" height="80" fill="#000" />
                <rect x="192" y="0" width="4" height="80" fill="#000" />
                <rect x="208" y="0" width="12" height="80" fill="#000" />
                <rect x="228" y="0" width="8" height="80" fill="#000" />
                <rect x="244" y="0" width="4" height="80" fill="#000" />
                <rect x="256" y="0" width="16" height="80" fill="#000" />
                <rect x="280" y="0" width="8" height="80" fill="#000" />
                <rect x="296" y="0" width="4" height="80" fill="#000" />
                <rect x="308" y="0" width="12" height="80" fill="#000" />
                <rect x="328" y="0" width="4" height="80" fill="#000" />
                <rect x="340" y="0" width="8" height="80" fill="#000" />
                <rect x="356" y="0" width="4" height="80" fill="#000" />
                <rect x="372" y="0" width="8" height="80" fill="#000" />
                <rect x="388" y="0" width="4" height="80" fill="#000" />
                <rect x="400" y="0" width="16" height="80" fill="#000" />
                <rect x="424" y="0" width="8" height="80" fill="#000" />
                <rect x="440" y="0" width="4" height="80" fill="#000" />
                <rect x="452" y="0" width="12" height="80" fill="#000" />
                <rect x="472" y="0" width="4" height="80" fill="#000" />
                <rect x="484" y="0" width="8" height="80" fill="#000" />
                <rect x="500" y="0" width="4" height="80" fill="#000" />
              </svg>
            </div>
          </div>

          {/* 2) 오른쪽(흰색) 영역 */}
          <div className="w-2/3 bg-white py-8 px-4 flex flex-col">
            <p className="text-xl sm:text-base md:text-xl font-semibold">
              {selectedCard.startDate} → {selectedCard.endDate}
            </p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-xl text-gray-600">최소인원</p>
                <p className="text-2xl font-bold">{selectedCard.minPeople || 0}명</p>
              </div>
              <div>
                <p className="text-xl text-gray-600">최대인원</p>
                <p className="text-2xl font-bold">{selectedCard.maxPeople || 0}명</p>
              </div>
              <div>
                <p className="text-xl text-gray-600">현재인원</p>
                <p className="text-2xl font-bold">
                  {selectedCard.currentParticipants || 0}명
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 my-4"></div>

            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-xl text-gray-600">나의일행</p>
                <p className="text-2xl font-bold">
                  {selectedCard.member?.totalParticipants || 0}명
                </p>
              </div>
              <div>
                <p className="text-xl text-gray-600">방장 Y/N</p>
                <p className="text-2xl font-bold">
                  {selectedCard.member?.isHost ? 'YES' : 'NO'}
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 my-4"></div>

            <div className="mt-4">
              <p className="text-xl text-gray-600 pb-2">테마</p>
              <div className="flex flex-wrap gap-2">
                {(selectedCard.keywords || []).map((keyword, index) => {
                  const themeClass =
                    THEME_COLORS[keyword.name] || 'bg-gray-500 text-white';
                  return (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-full text-xl font-medium ${themeClass}`}
                    >
                      {keyword.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3) 가운데 세로 점선 */}
          <div className="flex items-center bg-white">
            <div className="h-[80%] mx-3 border-l border-dashed border-[#412B2B]"></div>
          </div>

          {/* 4) 진행 상태 및 추가 정보 영역 */}
          <div className="w-2/3 bg-white py-8 px-4 flex flex-col min-h-full">
            <div className="text-xl sm:text-2xl font-normal flex items-center">
              {statusLabels.map((label, idx) => (
                <React.Fragment key={label}>
                  <span
                    className={
                      label === currentStatusLabel
                        ? 'font-bold text-black'
                        : 'text-gray-500'
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
            <div className="flex flex-col items-start space-y-4 flex-1 h-full">
              <h1 className="text-left text-4xl sm:text-5xl md:text-6xl mt-3 font-black">
                {currentStatusLabel}
              </h1>
              <p className="text-gray-600 text-xl sm:text-2xl">{statusDescription}</p>

              <div className="flex-grow w-full">
                <div className="border-t border-dashed border-gray-300"></div>
              </div>

              <div>
                <h2 className="text-xl font-bold py-1">Todo</h2>
                <ul className="text-2xl font-medium text-gray-600 space-y-1">
                  {todoItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-1 justify-end">
                <ProposalButton
                  selectedCard={selectedCard}
                  travelPlanId={selectedCard.travelPlanId}
                  currentParticipants={selectedCard.currentParticipants}
                  minPeople={selectedCard.minPeople}
                  className="w-full h-16 text-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 축소 상태
        <div
          className="bg-yellow p-4 rounded-lg shadow-md border border-gray-300 transition-all duration-300 flex items-center space-x-2"
          style={{ width: 'fit-content' }}
        >
          <div className="text-xl font-bold text-gray-800">{departureCityName}</div>
          <FaPlane className="text-2xl text-gray-700" />
          <div className="text-xl font-bold text-gray-900">{arrivalCityName}</div>
        </div>
      )}
    </div>
  );
};

// React.memo로 감싸기 (선택 사항: props 변경 시에만 리렌더링)
export default React.memo(BoardingPass);