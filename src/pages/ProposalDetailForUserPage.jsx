// ProposalDetailForUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';

const ProposalDetailForUser = () => {
  const { travelPlanId, proposalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // UserVotePage에서 전달된 state (선택된 제안서 관련 정보, 필요하다면 사용)
  const { selectedCard } = location.state || {};

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 제안서 상세 정보 API 호출
  useEffect(() => {
    const fetchProposalDetail = async () => {
      setLoading(true);
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}`,
        );
        if (response.status === 200) {
          console.log('✅ 제안서 상세 정보:', response.data.data);
          // 응답 구조: { status, message, data: { ...proposalData }, error }
          setProposal(response.data.data);
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
        setError('제안서 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchProposalDetail();
  }, [travelPlanId, proposalId]);

  // 날짜/시간 포맷 함수
  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 상태 배지 렌더링 함수 (예시)
  const getStatusBadge = (status) => {
    const statusMap = {
      W: { text: '투표 전', className: 'bg-green-100 text-green-800' },
      V: { text: '투표 중', className: 'bg-yellow-100 text-yellow-800' },
      A: { text: '수락', className: 'bg-blue-100 text-blue-800' },
      D: { text: '거절', className: 'bg-red-100 text-red-800' },
    };
    return (
      statusMap[status] || {
        text: '상태 없음',
        className: 'bg-gray-100 text-gray-800',
      }
    );
  };

  if (loading) return <div className="mt-10 text-center">로딩 중...</div>;
  if (error)
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  if (!proposal)
    return (
      <div className="mt-10 text-center">제안서 정보를 찾을 수 없습니다.</div>
    );

  const status = getStatusBadge(proposal.confirmStatus);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 max-w-6xl px-4 py-6 mx-auto">
        {/* 상단 섹션 */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="flex gap-6">
            <div className="w-1/3">
              <img
                src={proposal.imageUrl || '/api/placeholder/400/300'}
                alt="여행 상품"
                className="object-cover w-full h-48 rounded-lg"
              />
            </div>
            <div className="w-2/3">
              <h1 className="mb-4 text-2xl font-bold">{proposal.name}</h1>
              <p className="mb-2">
                여행날짜: {proposal.startDate} ~ {proposal.endDate}
              </p>
              <p className="mb-2">최소 인원: {proposal.minPeople}명</p>
              <p className="mb-2">
                예약금: {proposal.deposit.toLocaleString()}원
              </p>
              <div className="flex gap-2 mt-4">
                진행 상태:{' '}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${status.className}`}
                >
                  {status.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 제안 상세 정보 섹션 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">제안 상세 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">항공사</h3>
              <p>{proposal.airLine}</p>
            </div>
            <div>
              <h3 className="font-bold">출국 공항</h3>
              <p>{proposal.departureAirport}</p>
            </div>
            <div>
              <h3 className="font-bold">도착 공항</h3>
              <p>{proposal.arrivalAirport}</p>
            </div>
            <div>
              <h3 className="font-bold">출발 탑승 및 도착 시간</h3>
              <p>탑승: {formatDateTime(proposal.startDateBoardingTime)}</p>
              <p>도착: {formatDateTime(proposal.startDateArrivalTime)}</p>
            </div>
            <div>
              <h3 className="font-bold">귀국 탑승 및 도착 시간</h3>
              <p>탑승: {formatDateTime(proposal.endDateBoardingTime)}</p>
              <p>도착: {formatDateTime(proposal.endDateArrivalTime)}</p>
            </div>
            <div>
              <h3 className="font-bold">여행자 보험</h3>
              <p>{proposal.insuranceIncluded ? '포함' : '미포함'}</p>
            </div>
            <div>
              <h3 className="font-bold">가이드 포함 여부</h3>
              <p>{proposal.guideIncluded ? '포함' : '미포함'}</p>
            </div>
            <div>
              <h3 className="font-bold">취소/환불 정책</h3>
              <p>{proposal.refundPolicy}</p>
            </div>
            <div>
              <h3 className="font-bold">제품 정보</h3>
              <p>{proposal.productInformation}</p>
            </div>
          </div>
        </div>

        {/* 일정 타임라인 섹션 */}
        <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-xl font-bold">일정 타임라인</h2>
          {proposal.daySchedules.map((day) => (
            <div key={day.dayNumber} className="mb-8">
              {/* 일차 제목 */}
              <h3 className="mb-4 text-lg font-semibold">
                Day {day.dayNumber}
              </h3>
              {/* 타임라인 컨테이너 */}
              <div className="relative pl-4 border-l border-gray-300">
                {day.schedules.map((schedule, idx) => (
                  <div key={idx} className="mb-6 ml-4">
                    {/* 타임라인 점 */}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1.5 border border-white"></div>
                    {/* 시간 정보 */}
                    <time className="block mb-1 text-sm text-gray-500">
                      {formatDateTime(schedule.startTime)} -{' '}
                      {formatDateTime(schedule.endTime)}
                    </time>
                    {/* 일정 제목 */}
                    <h4 className="font-medium text-gray-800 text-md">
                      {schedule.scheduleName}
                    </h4>
                    {/* 일정 이미지 (존재할 경우) */}
                    {schedule.imageUrl && (
                      <img
                        src={schedule.imageUrl}
                        alt={schedule.scheduleName}
                        className="object-cover w-full max-w-xs mt-2 rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProposalDetailForUser;
