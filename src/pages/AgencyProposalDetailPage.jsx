import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AgencyProposalListDetail } from '../apis/agency';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import 'tailwindcss/tailwind.css';
import { MainContent } from './style/AgencyRoomListPageStyle';

const AgencyProposalDetail = () => {
  const { proposalId, travelPlanId } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [activeTab, setActiveTab] = useState('상세 내용');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      setLoading(true);
      try {
        const response = await AgencyProposalListDetail(proposalId,travelPlanId);
        if (response) {
          console.log('제안서 상세 정보 호출 성공:',response.data)
          setProposal(response.data);
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
        setError('제안서 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchProposalDetail();
  }, [proposalId]);

  const onhandleUpdatePlan =() => {
    console.log('수정 버튼 클릭:', proposal)
    navigate(`/travel-plans/${travelPlanId}/proposals/${proposalId}`);
  };

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

  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderDaySchedule = (dayNumber) => {
    if (!proposal?.companyDaySchedules) return null;

    const daySchedule = proposal.companyDaySchedules.find(
      (schedule) => schedule.dayNumber === parseInt(dayNumber),
    );

    if (!daySchedule) return <p>해당 일자의 일정이 없습니다.</p>;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-[800px] min-h-[400px] overflow-hidden">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">일정(schedule)</h2>
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">
              {daySchedule.dayNumber}일차
            </h3>
          </div>
          <div className="ml-4">
            {' '}
            {/* 일정 목록 오른쪽 이동 */}
            {daySchedule.schedules.map((schedule, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <h3 className="mb-2 font-bold">{schedule.scheduleName}</h3>
                <br></br>
                <p>시작: {formatDateTime(schedule.startTime)}</p>
                <p>종료: {formatDateTime(schedule.endTime)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <p className="mt-10 text-center">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!proposal)
    return <p className="text-center">제안서 정보를 찾을 수 없습니다.</p>;

  const status = getStatusBadge(proposal.confirmStatus);

  // Generate day tabs dynamically
  const dayTabs =
    proposal?.companyDaySchedules?.map(
      (schedule) => `${schedule.dayNumber}일차`,
    ) || [];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <MainContent className="flex-1">
        <div className="max-w-6xl px-4 py-6 mx-auto">
          {/* Top Section */}
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
                  진행 상태 :
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${status.className}`}
                  >
                    {status.text}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Content */}
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Left Navigation */}
            <div className="w-full md:w-48">
              <div className="flex flex-col space-y-3">
                {['상세 내용', ...dayTabs].map((tab) => (
                  <button
                    key={tab}
                    className={`p-3 text-left rounded-lg border border-gray-200 ${
                      activeTab === tab
                        ? 'bg-white hover:border-gray-400'
                        : 'bg-white hover:border-gray-400'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 min-h-[600px] w-[680px] overflow-y-auto overflow-x-hidden">
              <div className="h-[500px]">
                {activeTab === '상세 내용' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">여행 상세 내용</h2>
                    <br></br>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">여행정보</h3>
                      <span>{proposal.productInformation}</span>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">여행 일정(datetime)</h3>
                      <p>
                        출발: {formatDateTime(proposal.startDateBoardingTime)}
                      </p>
                      <p>
                        도착: {formatDateTime(proposal.startDateArrivalTime)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">항공사(airLine)</h3>
                      <p>{proposal.airLine}</p>
                    </div>
                    <div className="p-6 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">
                        탑승 및 도착 시간(datetime)
                      </h3>
                      <br></br>
                      <div className="flex gap-24">
                        <div className="w-[280px]">
                          <p>출국 공항 : {proposal.departureAirport}</p>
                          <br></br>
                          <p>탑승 시간 : </p>
                          <p>
                            {formatDateTime(proposal.startDateBoardingTime)}
                          </p>
                          <br></br>
                          <p>도착 시간 :</p>
                          <p>
                            {' '}
                            {formatDateTime(proposal.startDateArrivalTime)}
                          </p>
                        </div>
                        <div className="w-[280px]">
                          <p>귀국 공항 : {proposal.arrivalAirport}</p>
                          <br></br>
                          <p>탑승 시간 :</p>
                          <p>{formatDateTime(proposal.endDateBoardingTime)}</p>
                          <br></br>
                          <p>도착 시간 : </p>
                          <p>{formatDateTime(proposal.endDateArrivalTime)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">가이드</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={proposal.guideIncluded}
                            readOnly
                            className="mr-2"
                          />
                          포함
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={!proposal.guideIncluded}
                            readOnly
                            className="mr-2"
                          />
                          미포함
                        </label>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">여행자 보험</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={proposal.insuranceIncluded}
                            readOnly
                            className="mr-2"
                          />
                          포함
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={!proposal.insuranceIncluded}
                            readOnly
                            className="mr-2"
                          />
                          미포함
                        </label>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-2 font-bold">취소/환불 정책</h3>
                      <p>{proposal.refundPolicy}</p>
                    </div>
                  </div>
                )}
                {activeTab.includes('일차') && (
                  <div className="space-y-6">
                    {renderDaySchedule(activeTab.replace('일차', ''))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={onhandleUpdatePlan}
              className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              수정하기
            </button>
            <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              삭제하기
            </button>
          </div>
        </div>
      </MainContent>
      <Footer />
    </div>
  );
};

export default AgencyProposalDetail;
