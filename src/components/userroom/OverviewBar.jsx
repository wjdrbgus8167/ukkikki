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
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${selectedCard.arrivalCity.name}&client_id=${apiKey}`,
        );
        const data = await response.json();
        setImageUrl(data?.urls?.regular);
      } catch (error) {
        console.error('이미지 불러오기 실패:', error);
      }
    };

    fetchImage();
  }, [selectedCard.arrivalCity.name]);

  // 동적으로 버튼을 렌더링하는 함수 (마감시간이 설정된 이후 동작)
  const renderDynamicButton = () => {
    const now = new Date();
    const deadline = new Date(selectedCard.closeTime);
    if (now < deadline) {
      // 마감시간 전: "여행사에 제출하기까지 XX일 남았습니다."
      const diffDays = Math.ceil((deadline - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사에 제출하기까지 {diffDays}일 남았습니다.
        </button>
      );
    } else {
      const deadlinePlus7 = new Date(deadline.getTime() + 7 * 24 * 3600 * 1000);
      if (now < deadlinePlus7) {
        // 마감시간 지난 후 7일 이내: "여행사 제안을 받기까지 XX일 남았습니다."
        const diffDays = Math.ceil(
          (deadlinePlus7.getTime() - now.getTime()) / (1000 * 3600 * 24),
        );
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사 제안을 받기까지 {diffDays}일 남았습니다.
          </button>
        );
      } else {
        // 마감시간 + 7일 경과: "여행사 제안 보러가기" 버튼
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
      {/* 방 상태 */}
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

      {/* 방 제목 */}
      <h2 className="text-lg font-bold">{selectedCard?.name || '기본 이름'}</h2>

      {/* 여행지 */}
      <p className="text-gray-700">{selectedCard.arrivalCity.name}</p>

      {/* 여행 테마 */}
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

      {/* 여행 일정 */}
      <p className="text-right text-gray-700">
        {selectedCard.startDate} ~ {selectedCard.endDate}
      </p>

      {/* 마감시간 관련 버튼 */}
      {selectedCard.closeTime ? (
        renderDynamicButton()
      ) : (
        // 마감시간이 없으면 ProposalButton을 렌더링 (이곳에서 closeTime 제출 및 에러 핸들링 처리)
        <ProposalButton
          selectedCard={selectedCard}
          travelPlanId={selectedCard.travelPlanId}
          currentParticipants={selectedCard.currentParticipants}
          minPeople={selectedCard.minPeople}
        />
      )}

      {/* (선택사항) 마감시간 입력 버튼/영역은 ProposalButton에 포함되어 있으므로 OverviewBar에는 별도 불필요 */}
    </div>
  );
};

export default OverviewBar;
