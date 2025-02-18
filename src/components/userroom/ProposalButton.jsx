import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import WebSocketComponent, {
  stompClient,
} from '../../components/userroom/WebSocketComponent';

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

  // 버튼 활성화 여부: 인원이 충분하고 closeTime이 아직 설정되지 않은 경우
  const isEnabled = currentParticipants >= minPeople && !selectedCard.closeTime;

  // 마감일시 입력창 띄우기
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

  // 마감일시 설정 API 호출
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
      }

      if (stompClient && stompClient.connected) {
        const wsData = {
          action: "CLOSE_TIME_UPDATED",
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

  // 동적 버튼 렌더링 함수
  const renderDynamicButton = () => {
    const now = new Date();
    const deadline = new Date(selectedCard.closeTime);
    const deadlinePlus7 = new Date(deadline.getTime() + 7 * 24 * 3600 * 1000);

    if (now < deadline) {
      // 마감 전: 제출 기한 안내 버튼
      const diffDays = Math.ceil((deadline - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사에 제출하기까지 {diffDays}일 남았습니다.
        </button>
      );
    } else if (now < deadlinePlus7) {
      // 마감 후 7일 이내: 제안 대기 안내 버튼
      const diffDays = Math.ceil((deadlinePlus7 - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사 제안을 받기까지 {diffDays}일 남았습니다.
        </button>
      );
    } else {
      // 마감 후 7일 경과한 경우
      if (selectedCard.voteSurveyInfo?.canVote) {
        // 투표 시작 정보가 이미 있는 경우 투표 페이지로 바로 이동
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
        // 투표 시작 정보가 없는 경우(방장이 아닌 경우)
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
    <div className="relative p-4 text-center bg-yellow-100 rounded-lg md:w-1/3">
      {!selectedCard.closeTime ? (
        <button
          className={`px-4 py-2 text-white rounded-md ${isEnabled
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
