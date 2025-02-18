import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProposalDetailInfo from '../components/ProposalDetailForUser/ProposalDetailInfo';
import ProposalDetailTimeline from '../components/ProposalDetailForUser/ProposalDetailTimeline';
import ProposalDetailContact from '../components/ProposalDetailForUser/ProposalDetailContact';
import ReservationDepositModal from '../components/vote/ReservationDepositModal';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';

const ProposalDetailForUser = () => {
  const { travelPlanId, proposalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCard } = location.state || {};
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detail'); // 'detail', 'timeline', 'contact', 'deposit'
  const [showDepositModal, setShowDepositModal] = useState(false);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      setLoading(true);
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals/${proposalId}`,
        );
        if (response.status === 200) {
          setProposal(response.data.data);
        }
      } catch (error) {
        setError('제안서 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchProposalDetail();
  }, [travelPlanId, proposalId]);

  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      W: { text: '투표 전', className: 'bg-green-100 text-green-800' },
      V: { text: '투표 중', className: 'bg-yellow-100 text-yellow-800' },
      A: { text: '채택', className: 'bg-blue-100 text-blue-800' },
      D: { text: '탈락', className: 'bg-red-100 text-red-800' },
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

        {/* 탭 전환 버튼 */}
        <div className="flex mb-4 space-x-4">
          <button
            onClick={() => setActiveTab('detail')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'detail' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            상세보기
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'timeline'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            일정
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'contact' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            문의하기
          </button>
          {proposal.confirmStatus === 'A' && (
            <button
              onClick={() => setActiveTab('deposit')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'deposit'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              예약금 결제하러 가기
            </button>
          )}
        </div>

        {/* 탭 내용 렌더링 */}
        {activeTab === 'detail' && (
          <ProposalDetailInfo
            proposal={proposal}
            formatDateTime={formatDateTime}
          />
        )}
        {activeTab === 'timeline' && (
          <ProposalDetailTimeline
            proposal={proposal}
            formatDateTime={formatDateTime}
          />
        )}
        {activeTab === 'contact' && (
          <ProposalDetailContact
            travelPlanId={travelPlanId}
            proposalId={proposalId}
          />
        )}
        {activeTab === 'deposit' && (
          <div>
            <ReservationDepositModal
              travelPlanId={travelPlanId}
              proposalId={proposalId}
              onClose={() => setActiveTab('detail')}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProposalDetailForUser;
