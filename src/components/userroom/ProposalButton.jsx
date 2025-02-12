import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';

const ProposalButton = ({ travelPlanId, currentParticipants, minPeople }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [closeTime, setCloseTime] = useState('');

  // 현재 인원이 최소 인원 이상이어야 버튼 활성화
  const isEnabled = currentParticipants >= minPeople;

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (!isEnabled) {
      Swal.fire({
        title: '🚨 참가 인원 부족!',
        html: `최소 인원 <b>${minPeople}명</b> 이상이어야 합니다.<br>현재 인원: <b>${currentParticipants}명</b>`,
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
        background: '#fffbee',
        color: '#333',
        showCancelButton: true,
        cancelButtonText: '취소',
        cancelButtonColor: '#aaa',
        allowOutsideClick: false,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }
    setShowDateInput(true);
  };

  // 날짜/시간 입력 값 변경 핸들러
  const handleDateTimeChange = (e) => {
    setCloseTime(e.target.value);
  };

  // 설정 버튼 클릭 시 마감일시 API 호출 및 예약 제출 스케줄링
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

    setIsSubmitting(true);
    try {
      await publicRequest.put(
        `/api/v1/travel-plans/${travelPlanId}/closeTime`,
        { closeTime },
      );
      Swal.fire({
        title: '✅ 마감일시 설정 완료!',
        text: '여행사가 확인할 마감일시가 설정되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });

      scheduleSubmission(parsedDate);
      setShowDateInput(false);
    } catch (error) {
      console.error('마감일시 설정 실패:', error);
      Swal.fire({
        title: '❌ 오류 발생!',
        text: '마감일시 설정에 실패했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 마감일시가 도달하면 여행계획 상태를 변경하는 함수
  const scheduleSubmission = (closeDate) => {
    const now = new Date();
    const delay = closeDate.getTime() - now.getTime();
    if (delay <= 0) {
      submitTravelPlan();
    } else {
      setIsScheduled(true);
      setTimeout(() => {
        submitTravelPlan();
      }, delay);
    }
  };

  // 여행계획 상태를 제출하는 API 호출 함수
  const submitTravelPlan = async () => {
    try {
      await publicRequest.put(`/api/v1/travel-plans/${travelPlanId}`, {
        planningStatus: 'BIDDING',
      });
      Swal.fire({
        title: '🎉 여행계획 제출 완료!',
        text: '여행계획이 여행사에 성공적으로 제출되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
      setIsScheduled(false);
    } catch (error) {
      console.error('여행계획 제출 실패:', error);
      Swal.fire({
        title: '❌ 제출 실패!',
        text: '여행계획 제출에 실패했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <div className="p-4 text-center bg-yellow-100 rounded-lg md:w-1/3">
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
      {showDateInput && (
        <div className="flex flex-col items-center mt-4">
          <input
            type="datetime-local"
            value={closeTime}
            onChange={handleDateTimeChange}
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
