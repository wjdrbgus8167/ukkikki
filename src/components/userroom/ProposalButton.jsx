import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
const ProposalButton = ({ travelPlanId, currentParticipants, minPeople }) => {
  // 상태 관리: 마감일시, API 요청 진행 여부, 예약 제출 스케줄링 여부
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  // 버튼 활성화 여부: currentParticipants가 최소인원 이상일 때만 활성화
  const isEnabled = currentParticipants >= minPeople;

  // 버튼 클릭 시 실행되는 핸들러
  const handleButtonClick = async () => {
    // 방장이 마감일시를 입력 (여기서는 prompt로 간단하게 구현)
    const input = window.prompt(
      '마감일시를 입력해주세요 (예: 2025-01-30T18:00:00):',
      '',
    );
    if (!input) return;

    // 입력값이 유효한 날짜 형식인지 확인
    const parsedDate = new Date(input);
    if (isNaN(parsedDate.getTime())) {
      alert('올바른 날짜 형식을 입력해주세요.');
      return;
    }

    // 마감일시를 설정하는 API 호출
    setIsSubmitting(true);
    try {
      await publicRequest.put(
        `/api/v1/travel-plans/${travelPlanId}/closeTime`,
        { closeTime: input },
      );
      alert('마감일시가 설정되었습니다.');
      // 마감일시가 되었을 때 제출 API를 호출하도록 스케줄링
      scheduleSubmission(parsedDate);
    } catch (error) {
      console.error('마감일시 설정 실패:', error);
      alert('마감일시 설정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 마감일시에 도달하면 여행계획 상태를 변경하는 함수
  const scheduleSubmission = (closeDate) => {
    const now = new Date();
    const delay = closeDate.getTime() - now.getTime();
    if (delay <= 0) {
      // 이미 시간이 지난 경우 바로 제출
      submitTravelPlan();
    } else {
      setIsScheduled(true);
      setTimeout(() => {
        submitTravelPlan();
      }, delay);
    }
  };

  // 여행계획을 제출하는 API 호출 함수
  const submitTravelPlan = async () => {
    try {
      await publicRequest.put(`/api/v1/travel-plans/${travelPlanId}`, {
        planningStatus: 'BIDDING',
      });
      alert('여행계획이 여행사에 제출되었습니다.');
      setIsScheduled(false);
    } catch (error) {
      console.error('여행계획 제출 실패:', error);
      alert('여행계획 제출에 실패했습니다.');
    }
  };

  return (
    <div className="p-4 text-center bg-yellow-100 rounded-lg md:w-1/3">
      <button
        className={`px-4 py-2 text-white rounded-md ${
          isEnabled
            ? 'bg-yellow-600 hover:bg-yellow-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={handleButtonClick}
        disabled={!isEnabled || isSubmitting}
      >
        {isSubmitting ? '설정 중...' : '여행사에 제안하기'}
      </button>
    </div>
  );
};

export default ProposalButton;
