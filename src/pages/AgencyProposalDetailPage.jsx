import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AgencyProposalListDetail } from '../apis/agency';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import 'tailwindcss/tailwind.css';
import { MainContent } from './style/AgencyRoomListPageStyle';

const AgencyProposalDetail = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [activeTab, setActiveTab] = useState('상세 내용');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = React.useState('');
  
  useEffect(() => {
    const fetchProposalDetail = async () => {
      setLoading(true);
      try {
        const response = await AgencyProposalListDetail(proposalId);
        if (response) {
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
            {daySchedule.schedules.map((schedule, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">{schedule.scheduleName}</h3><br></br>
                <p>시작: {formatDateTime(schedule.startTime)}</p>
                <p>종료: {formatDateTime(schedule.endTime)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleButtonClick = (action) => {
    let message = '';
    if (!proposal) {
      message = '제안서 정보가 없습니다.';
    } else {
      switch (proposal.confirmStatus) {
        case 'W':
          if (action === 'edit' || action === 'delete') {
            message = `${action === 'edit' ? '수정' : '삭제'} 작업이 가능합니다.`;
          } else {
            message = '문의하기 버튼을 클릭했습니다.';
          }
          break;
        case 'A':
          if (action === 'delete') {
            message = '수락 후에는 삭제할 수 없습니다.';
          } else if (action === 'edit') {
            message = '수정이 가능합니다.';
          }
          break;
        case 'D':
          if (action === 'edit') {
            message = '거절된 제안서는 수정할 수 없습니다.';
          } else if (action === 'delete') {
            message = '삭제가 가능합니다.';
          }
          break;
        case 'V':
          message = '투표 진행 중이므로 수정 및 삭제가 불가능합니다.';
          break;
        default:
          message = '알 수 없는 상태입니다.';
      }
    }
    setModalMessage(message);
  };

  if (loading) return <p className="mt-10 text-center">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!proposal)
    return <p className="text-center">제안서 정보를 찾을 수 없습니다.</p>;

  const status = getStatusBadge(proposal.confirmStatus);
  const dayTabs = proposal?.companyDaySchedules?.map(schedule => `${schedule.dayNumber}일차`) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <MainContent className="flex-1">
        {modalMessage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">{modalMessage}</p>
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={() => setModalMessage('')}
              >
                확인
              </button>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Top Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex gap-6 relative">
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
                  <span className={`px-3 py-1 rounded-full text-sm ${status.className}`}>
                    {status.text}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                {proposal.confirmStatus === 'W' && (
                  <>
                    <button
                      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                      onClick={() => handleButtonClick('edit')}
                    >
                      수정하기
                    </button>
                    <button
                      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                      onClick={() => handleButtonClick('delete')}
                    >
                      삭제하기
                    </button>
                    <button
                      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                      onClick={() => handleButtonClick('inquire')}
                    >
                      문의하기
                    </button>
                  </>
                )}
                
                {proposal.confirmStatus === 'A' && (
                  <>
                    <button
                      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                      onClick={() => handleButtonClick('edit')}
                    >
                      수정하기
                    </button>
                    <button
                      className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                      onClick={() => handleButtonClick('inquire')}
                    >
                      문의하기
                    </button>
                  </>
                )}
                
                {proposal.confirmStatus === 'D' && (
                  <button
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                    onClick={() => handleButtonClick('delete')}
                  >
                    삭제하기
                  </button>
                )}
                
                {proposal.confirmStatus === 'V' && (
                  <button
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
                    onClick={() => handleButtonClick('inquire')}
                  >
                    문의하기
                  </button>
                )}
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
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 min-h-[600px] w-[680px] overflow-y-auto overflow-x-hidden custom-scroll">
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
                          <p>귀국 공항 : {proposal.arrivalAirport}</p><br></br>
                          <p>탑승 시간 :</p> 
                          <p>{formatDateTime(proposal.endDateBoardingTime)}</p><br></br>
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
        </div>
      </MainContent>
      <Footer />
    </div>
  );
};

export default AgencyProposalDetail;
