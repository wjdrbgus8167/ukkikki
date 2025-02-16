import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// 최소 24시간 이후의 datetime-local 입력 최소값 반환
const getMinDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 24);
  return now.toISOString().slice(0, 16);
};

const ProposalButton = ({
  selectedCard,
  travelPlanId,
  currentParticipants,
  minPeople,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [closeTime, setCloseTime] = useState('');

  // 버튼 활성화 여부: 현재 인원이 최소 인원 이상이어야 함
  const isEnabled = currentParticipants >= minPeople && !selectedCard.closeTime;

  const handleButtonClick = () => {
    if (!isEnabled) {
      Swal.fire({
        title: '🚨 참가 인원 부족!',
        html: `최소 인원 <b>${minPeople}명</b> 이상이어야 합니다.<br>현재 인원: <b>${currentParticipants}명</b>`,
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    setShowDateInput(true);
  };

  const handleDateTimeChange = (e) => {
    setCloseTime(e.target.value);
  };

  const handleSubmitCloseTime = async () => {
    if (!closeTime) {
      Swal.fire({
        title: '⚠️ 입력 필요!',
        text: '날짜와 시간을 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    const parsedDate = new Date(closeTime);
    if (isNaN(parsedDate.getTime())) {
      Swal.fire({
        title: '❌ 잘못된 입력!',
        text: '올바른 날짜 형식을 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return;
    }
    const minDateTime = new Date();
    minDateTime.setHours(minDateTime.getHours() + 24);
    if (parsedDate.getTime() < minDateTime.getTime()) {
      Swal.fire({
        title: '❌ 잘못된 시간!',
        text: '날짜와 시간은 현재로부터 최소 24시간 이후여야 합니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return;
    }
    setIsSubmitting(true);

    // 입력된 closeTime 값에 초가 없으면 ":00"을 추가 (예: "2025-05-01T13:00" → "2025-05-01T13:00:00")
    const formattedCloseTime =
      closeTime.length === 16 ? `${closeTime}:00` : closeTime;

    try {
      const response = await publicRequest.put(
        `/api/v1/travel-plans/${travelPlanId}/closeTime`,
        { closeTime: formattedCloseTime },
      );
      if (response.status === 200) {
        console.log('마감일시 설정 완료:', response.data);
        Swal.fire({
          title: '✅ 마감일시 설정 완료!',
          text: '마감일시가 설정되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        setShowDateInput(false);
        // 필요시, selectedCard 업데이트(부모 상태 갱신) 처리
      }
    } catch (error) {
      if (error.response?.data?.error?.code === 'TP003') {
        Swal.fire('알림', '방장만 마감일시를 설정할 수 있어요', 'error');
      } else {
        console.error('마감일시 설정 실패:', error);
        Swal.fire({
          title: '❌ 오류 발생!',
          text: '마감일시 설정에 실패했습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 동적 버튼 렌더링 (마감일시 설정 이후)
  const renderDynamicButton = () => {
    const now = new Date();
    const deadline = new Date(selectedCard.closeTime);
    const diff = deadline.getTime() - now.getTime();

    if (diff > 0) {
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사에 제출하기까지 {diffDays}일 남았습니다.
        </button>
      );
    } else {
      const deadlinePlus7 = new Date(deadline.getTime() + 7 * 24 * 3600 * 1000);
      if (now < deadlinePlus7) {
        const diffDays = Math.ceil(
          (deadlinePlus7.getTime() - now.getTime()) / (1000 * 3600 * 24),
        );
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사 제안을 받기까지 {diffDays}일 남았습니다.
          </button>
        );
      } else {
        return (
          <button
            onClick={async () => {
              try {
                const response = await publicRequest.get(
                  `/api/v1/travel-plans/${travelPlanId}/proposals`,
                );
                if (response.status === 200) {
                  navigate(`/user-vote/${travelPlanId}`, {
                    state: { proposals: response.data },
                  });
                }
              } catch (error) {
                console.error('제안 조회 실패:', error);
                Swal.fire('알림', '제안 조회 중 오류가 발생했습니다.', 'error');
              }
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            여행사 제안 보러가기
          </button>
        );
      }
    }
  };

  return (
    <div className="relative p-4 text-center bg-yellow-100 rounded-lg md:w-1/3">
      {!selectedCard.closeTime ? (
        <button
          className={`px-4 py-2 text-white rounded-md ${
            isEnabled
              ? 'bg-[#FF3951] hover:bg-[#e23047]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleButtonClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? '설정 중...' : '여행사에 제안하기'}
        </button>
      ) : (
        renderDynamicButton()
      )}
      {showDateInput && !selectedCard.closeTime && (
        <div
          className="absolute flex flex-col items-center p-4 transform -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2 -top-20"
          style={{ zIndex: 1000 }}
        >
          <input
            type="datetime-local"
            value={closeTime}
            onChange={handleDateTimeChange}
            min={getMinDateTime()}
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleSubmitCloseTime}
            className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            설정
          </button>
        </div>
      )}
    </div>
  );
};

export default ProposalButton;
