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

  // 버튼 활성화 여부: 인원이 충분하고 아직 마감일시가 설정되지 않은 경우
  const isEnabled = currentParticipants >= minPeople && !selectedCard.closeTime;

  // 마감일시 미설정 시: 입력창을 띄워 closeTime을 설정하는 함수
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
    // 입력된 closeTime에 초가 없으면 ":00" 추가
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
        // (필요하다면 부모 상태 갱신 로직 추가)
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
    // 1. 마감 전: 제출 기한 안내 버튼
    if (now < deadline) {
      const diffDays = Math.ceil((deadline - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사에 제출하기까지 {diffDays}일 남았습니다.
        </button>
      );
    }
    // 2. 마감 후 7일 이내: 제안 대기 안내 버튼
    const deadlinePlus7 = new Date(deadline.getTime() + 7 * 24 * 3600 * 1000);
    if (now < deadlinePlus7) {
      const diffDays = Math.ceil((deadlinePlus7 - now) / (1000 * 3600 * 24));
      return (
        <button disabled className="px-4 py-2 text-white bg-gray-400 rounded">
          여행사 제안을 받기까지 {diffDays}일 남았습니다.
        </button>
      );
    }
    // 3. 마감 후 7일 경과: 투표/제안 조회 분기
    // 투표 시작 여부는 selectedCard.canVote를 사용 (서버에서 boolean으로 전달됨)
    if (!selectedCard.canVote) {
      // 아직 투표가 시작되지 않은 경우
      if (selectedCard.member?.isHost) {
        // 방장: 투표 시작하기 버튼
        return (
          <button
            onClick={async () => {
              setIsSubmitting(true);
              try {
                const voteStartResponse = await publicRequest.post(
                  `/api/v1/travel-plans/${travelPlanId}/proposals/1/vote-survey`,
                );
                if (voteStartResponse.status === 200) {
                  Swal.fire({
                    title: '투표 시작 완료!',
                    text: '투표가 시작되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인',
                  });
                  // 투표 시작 여부 업데이트 (예: 부모 상태 업데이트)
                  selectedCard.canVote = true;
                }
              } catch (error) {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.error &&
                  error.response.data.error.code === 'BAD_REQUEST' &&
                  error.response.data.error.message ===
                    '등록된 제안서가 없습니다'
                ) {
                  Swal.fire({
                    title: '등록된 제안서 없음',
                    text: '등록된 제안서가 없으므로 투표를 시작할 수 없습니다.',
                    icon: 'warning',
                    confirmButtonText: '확인',
                  });
                } else {
                  console.error('투표 시작 실패:', error);
                  Swal.fire(
                    '투표 시작 실패',
                    '투표 시작 도중 오류가 발생했습니다.',
                    'error',
                  );
                }
                return;
              } finally {
                setIsSubmitting(false);
              }
              // 투표 시작 후 제안 조회 및 페이지 이동
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
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '투표 시작하기'}
          </button>
        );
      } else {
        // 팀원: 방장이 투표 시작할 때까지 대기 안내 버튼
        return (
          <button
            disabled
            className="px-4 py-2 text-white bg-gray-400 rounded cursor-not-allowed"
            title="방장이 투표를 시작하면 제안서를 확인할 수 있습니다."
          >
            방장이 투표 시작할 때까지 대기중
          </button>
        );
      }
    } else {
      // 투표가 시작된 경우: 모두 "여행사 제안 보러가기" 버튼
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
  };

  return (
    <div className="relative p-4 text-center bg-yellow-100 rounded-lg md:w-1/3">
      {/* 마감시간이 설정되지 않은 경우: 날짜 입력을 위한 버튼 */}
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
        // 마감시간이 설정된 경우: 동적 버튼 렌더링
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
