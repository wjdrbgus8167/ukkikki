import React, { useState, useEffect, useRef } from 'react';
import ProposalButton from './ProposalButton';
import Swal from 'sweetalert2';
import { publicRequest } from '../../hooks/requestMethod';
import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
const statusMap = {
  IN_PROGRESS: '진행중',
  BIDDING: '입찰중',
  BOOKING: '예약중',
  CONFIRMED: '확정됨',
};

// 테마에 따른 색상 반환 함수
const getThemeColor = (theme) => {
  const themeColors = {
    골프: 'bg-golf text-white',
    '관광+휴양': 'bg-tourism-relaxation text-white',
    식도락: 'bg-food text-white',
    현지문화체험: 'bg-local-culture text-white',
    기차여행: 'bg-train-trip text-white',
    SNS핫플: 'bg-sns-hot text-white',
    럭셔리: 'bg-luxury text-white',
    해양스포츠: 'bg-marine-sports text-white',
    온천: 'bg-hot-spring text-white',
    성지순례: 'bg-pilgrimage text-white',
    '디저트 골프': 'bg-dessert-golf text-white',
    축구: 'bg-soccer text-white',
  };
  return themeColors[theme] || 'bg-gray-500 text-white';
};

const OverviewBar = ({ selectedCard }) => {
  const [imageUrl, setImageUrl] = useState('');
  // 날짜와 시간 입력값은 마감일시 제출시에만 사용되고, 평소에는 숨김 처리
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  if (!selectedCard) {
    return <p>로딩 중입니다...</p>;
  }

  useEffect(() => {
    if (hasFetched.current) return;
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

  // 마감일시 설정 API 호출
  const handleDeadlineSubmit = async () => {
    if (!deadlineDate || !deadlineTime) {
      Swal.fire('알림', '날짜와 시간을 모두 선택해주세요.', 'warning');
      return;
    }
    // 선택된 날짜와 시간을 합쳐 YYYY-MM-DDTHH:00 형식의 문자열 생성 (분, 초는 00)
    const deadline = `${deadlineDate}T${deadlineTime}:00`;
    console.log('📌 마감일시 설정:', deadline);
    try {
      const response = await publicRequest.put(
        `/api/v1/travel-plans/${selectedCard.travelPlanId}/closeTime`,
        { deadline },
      );
      if (response.status !== 200) {
        const errorData = response.data;
        if (errorData?.error?.code === 'TP003') {
          Swal.fire('알림', '방장만 마감일시를 설정할 수 있어요', 'error');
          return;
        }
        throw new Error('마감일시 설정 중 오류 발생');
      }
      Swal.fire(
        '성공',
        '마감일시가 설정되었습니다. 새로고침 후 확인해주세요.',
        'success',
      );
      setShowDeadlineInput(false); // 제출 후 입력 영역 숨김 처리
    } catch (error) {
      console.error('🚨 마감일시 설정 실패:', error);
      if (error.response?.data?.error?.code === 'TP003') {
        Swal.fire('알림', '방장만 마감일시를 설정할 수 있어요', 'error');
      } else {
        Swal.fire('알림', '마감일시 설정 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  // 동적으로 버튼을 렌더링하는 함수 (마감일시 제출 이후 동작)
  const renderDynamicButton = () => {
    const now = new Date();
    const closeTime = new Date(selectedCard.closeTime);
    if (now < closeTime) {
      // 마감일시 전: "여행사에 제출하기까지 XX일 남았습니다."
      const diffDays = Math.ceil((closeTime - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사에 제출하기까지 {diffDays}일 남았습니다.
        </button>
      );
    } else {
      const closeTimePlus7 = new Date(
        closeTime.getTime() + 7 * 24 * 3600 * 1000,
      );
      if (now < closeTimePlus7) {
        // 마감일시 지난 후 7일 이내: "여행사 제안을 받기까지 XX일 남았습니다."
        const diffDays = Math.ceil((closeTimePlus7 - now) / (1000 * 3600 * 24));
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사 제안을 받기까지 {diffDays}일 남았습니다.
          </button>
        );
      } else {
        // 마감일시 + 7일 경과: "여행사 제안 보러가기" 버튼 (클릭 시 /user-vote/:travelPlanId 이동)
        return (
          <button
            onClick={() => navigate(`/user-vote/${selectedCard.travelPlanId}`)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            여행사 제안 보러가기
          </button>
        );
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* ✅ 방 상태 */}
      <div className="flex items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusMap[selectedCard.planningStatus]
              ? {
                  IN_PROGRESS: 'bg-progress text-white',
                  BIDDING: 'bg-proposal text-white',
                  BOOKING: 'bg-reservation text-white',
                  CONFIRMED: 'bg-confirmed text-white',
                }[selectedCard.planningStatus]
              : 'bg-gray-400 text-white'
          }`}
        >
          {statusMap[selectedCard.planningStatus]}
        </span>
      </div>

      {/* ✅ 방 제목 */}
      <h2 className="text-lg font-bold">{selectedCard?.name || '기본 이름'}</h2>

      {/* ✅ 여행지 */}
      <p className="text-gray-700">{selectedCard.arrivalCity.name}</p>

      {/* ✅ 여행 테마 (keywords 배열의 name 기준) */}
      {selectedCard.keywords && selectedCard.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCard.keywords.map((keyword, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(
                keyword.name,
              )}`}
            >
              {keyword.name}
            </span>
          ))}
        </div>
      )}

      {/* ✅ 여행 일정 */}
      <p className="text-right text-gray-700">
        {selectedCard.startDate} ~ {selectedCard.endDate}
      </p>

      {/* ✅ 마감일시 설정 또는 동적 버튼 렌더링 */}
      {selectedCard.closeTime ? (
        // 마감일시가 설정되어 있으면 동적으로 버튼 표시 (조건 2, 3, 4)
        renderDynamicButton()
      ) : (
        // 마감일시가 없으면 ProposalButton
        <ProposalButton
          selectedCard={selectedCard}
          travelPlanId={selectedCard.travelPlanId}
          currentParticipants={selectedCard.currentParticipants}
          minPeople={selectedCard.minPeople}
        />
      )}

      {/* ✅ 마감일시 설정 입력 버튼 (평소에는 숨김) */}
      {!selectedCard.closeTime && (
        <button
          onClick={() => setShowDeadlineInput(!showDeadlineInput)}
          className="px-3 py-1 text-sm text-blue-500"
        >
          {showDeadlineInput ? '숨기기' : '마감일시 설정하기'}
        </button>
      )}

      {/* ✅ 마감일시 설정 입력 영역 (사용 중일 때만 표시) */}
      {showDeadlineInput && !selectedCard.closeTime && (
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-semibold">마감일시 설정:</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="px-2 py-1 border rounded"
            />
            <input
              type="time"
              step="3600" // 정각만 선택 (분/초는 00)
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className="px-2 py-1 border rounded"
            />
            <button
              onClick={handleDeadlineSubmit}
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              설정
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewBar;
