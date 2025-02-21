// ProposalButton.jsx
import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { stompClient } from '../../components/userroom/WebSocketComponent';
import CloseTimeModal from './CloseTimeModal';

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
  const [showCloseTimeModal, setShowCloseTimeModal] = useState(false);
  const [closeTime, setCloseTime] = useState('');

  // 버튼 활성화 여부: 인원이 충분하고 closeTime이 아직 설정되지 않은 경우
  const isEnabled = currentParticipants >= minPeople && !selectedCard.closeTime;

  // 방장 여부에 따라 버튼 다르게 표시
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
    // 방장인 경우 마감일자 설정 모달 오픈
    setShowCloseTimeModal(true);
  };

  // 마감일자 설정 API 호출 (CloseTimeModal의 onSubmit 콜백)
  const handleSubmitCloseTime = async (inputCloseTime) => {
    const parsedDate = new Date(inputCloseTime);
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
    // formattedCloseTime: 만약 길이가 16이면 초를 붙임.
    const formattedCloseTime =
      inputCloseTime.length === 16 ? `${inputCloseTime}:00` : inputCloseTime;
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
        setShowCloseTimeModal(false);
      }
      if (stompClient && stompClient.connected) {
        const wsData = {
          action: 'CLOSE_TIME_UPDATED',
          travelPlanId,
        };
        stompClient.publish({
          destination: '/pub/actions',
          body: JSON.stringify(wsData),
        });
        console.log('✅ 마감 일시 설정 이벤트:', wsData);
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

  // 동적 버튼 렌더링 함수 (마감일시가 설정된 경우)
  const renderDynamicButton = () => {
    const now = new Date();
    const deadline = new Date(selectedCard.closeTime);
    const deadlinePlus7 = new Date(deadline.getTime() + 7 * 24 * 3600 * 1000);

    // 24시간을 밀리초 단위로 계산
    const oneDayMs = 1000 * 3600 * 24;

    if (now < deadline) {
      const remainingMs = deadline - now;
      if (remainingMs <= oneDayMs) {
        // 남은 시간이 1일 이하인 경우: 시간과 분 단위로 표시
        const totalMinutes = Math.ceil(remainingMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사에 제출하기까지 {hours}시간 {minutes}분 남았습니다.
          </button>
        );
      } else {
        const diffDays = Math.ceil(remainingMs / oneDayMs);
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사에 제출하기까지 {diffDays}일 남았습니다.
          </button>
        );
      }
    } else if (now < deadlinePlus7) {
      const remainingMs = deadlinePlus7 - now;
      if (remainingMs <= oneDayMs) {
        const totalMinutes = Math.ceil(remainingMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사가 제안을 작성 중입니다. 투표 시작이 {hours}시간 {minutes}분
            남았습니다.
          </button>
        );
      } else {
        const diffDays = Math.ceil(remainingMs / oneDayMs);
        return (
          <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
            여행사가 제안을 작성 중입니다. 투표 시작이 {diffDays}일 남았습니다.
          </button>
        );
      }
    } else {
      if (selectedCard.voteSurveyInfo?.canVote) {
        return (
          <button
            onClick={() =>
              navigate(`/user-vote/${travelPlanId}`, {
                state: { selectedCard },
              })
            }
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            여행사 제안 보러가기
          </button>
        );
      } else {
        return (
          <button
            disabled
            className="px-4 py-2 text-white bg-gray-400 rounded cursor-not-allowed"
            title="방장이 투표를 시작하면 제안서를 확인할 수 있습니다."
          >
            투표 시작할 때까지 대기중
          </button>
        );
      }
    }
  };

  return (
    <div className="w-full text-xl font-bold bg-yellow-100 rounded-lg sm:w-auto sm:text-2xl">
      {!selectedCard.closeTime ? (
        // 방장인 경우에만 '여행사에 제안하기' 버튼 표시, 그렇지 않으면 대기 메시지 표시
        selectedCard.member?.isHost ? (
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
          <div className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
            방장의 제출하기를 기다리는 중
          </div>
        )
      ) : (
        renderDynamicButton()
      )}
      {showCloseTimeModal && !selectedCard.closeTime && (
        <CloseTimeModal
          initialCloseTime={closeTime}
          minDateTime={getMinDateTime()}
          onSubmit={handleSubmitCloseTime}
          onClose={() => setShowCloseTimeModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ProposalButton;
