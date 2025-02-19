import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import AgencyList from '../components/vote/AgencyList';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';
import ReservationDepositModal from '../components/vote/ReservationDepositModal';
import { IoIosArrowBack } from 'react-icons/io';
import logo from '../assets/loading-spinner.png';
import VoteCountdown from '../components/vote/VoteCountdown';

const UserVotePage = () => {
  const { travelPlanId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard || null;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);
  const [agencies, setAgencies] = useState([]);
  const [hasAcceptedProposal, setHasAcceptedProposal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals`,
        );
        if (response.status === 200) {
          let proposals = response.data.data;
          const acceptedProposals = proposals.filter(
            (proposal) => proposal.proposalStatus === 'A',
          );
          if (acceptedProposals.length > 0) {
            setHasAcceptedProposal(true);
            proposals = acceptedProposals;
          } else {
            setHasAcceptedProposal(false);
          }
          setAgencies(proposals);
          console.log('📦 제안 목록:', proposals);
        }
      } catch (error) {
        if (
          error.response?.data?.error?.code === 'BAD_REQUEST' &&
          error.response.data.error.message === '등록된 제안서가 없습니다'
        ) {
          setAgencies([]);
        } else {
          console.error('제안 조회 오류:', error);
          Swal.fire('오류', '제안 목록을 불러오는데 실패했습니다.', 'error');
        }
      }
    };

    if (travelPlanId) {
      fetchProposals();
    }
  }, [travelPlanId]);

  const handleVote = async (agency) => {
    if (hasAcceptedProposal) {
      Swal.fire(
        '투표 불가',
        '투표가 끝났습니다. 투표 기능이 비활성화되었습니다.',
        'info',
      );
      return;
    }
    if (agency.votedYn) {
      Swal.fire(
        '알림',
        '이미 투표하셨습니다. 투표는 한 번만 가능합니다.',
        'info',
      );
      return;
    }

    const result = await Swal.fire({
      title: '투표 확인',
      text: '투표는 한 번 하면 변경할 수 없습니다. 정말 투표하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 투표합니다!',
      cancelButtonText: '취소',
    });
    if (!result.isConfirmed) return;

    try {
      const voteSurveyId = selectedCard.voteSurveyInfo?.voteSurveyId;
      if (!voteSurveyId) {
        Swal.fire(
          '오류',
          '투표 시작 정보가 없습니다. 투표를 진행할 수 없습니다.',
          'error',
        );
        return;
      }
      const voteResponse = await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/proposals/${agency.proposalId}/vote-survey/${voteSurveyId}`,
      );
      if (voteResponse.status === 200) {
        Swal.fire('투표 완료', '투표가 완료되었습니다.', 'success');
        setAgencies((prev) =>
          prev.map((a) =>
            a.proposalId === agency.proposalId
              ? {
                  ...a,
                  votedYn: true,
                  voteCount:
                    a.voteCount + selectedCard.member.totalParticipants,
                }
              : a,
          ),
        );
      }
    } catch (error) {
      console.error('투표 실패:', error);
      const errorMessage =
        error.response?.data?.error?.message ||
        '투표 도중 오류가 발생했습니다.';
      if (errorMessage.includes('이미 투표를 진행한 회원입니다.')) {
        Swal.fire(
          '중복 투표',
          '이미 투표하셨습니다. 투표는 한 번만 가능합니다.',
          'info',
        );
      } else {
        Swal.fire('투표 실패', errorMessage, 'error');
      }
    }
  };

  const handleDetail = (agency) => {
    navigate(`/proposal-detail/${travelPlanId}/${agency.proposalId}`, {
      state: { agency, selectedCard },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* 메인 컨텐츠 영역의 최소 높이를 화면 높이에서 헤더/푸터 높이를 뺀 값으로 설정 */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl p-6 mx-auto min-h-[calc(100vh-80px)]">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="ml-4 text-brown">
              <IoIosArrowBack size={32} className="text-3xl font-bold" />
            </button>
            <h1 className="flex-1 text-2xl font-bold text-center text-gray-800">
              {hasAcceptedProposal ? '채택된 여행사' : '제안받은 여행사'}
            </h1>
            <div className="w-10 mr-4" />
          </div>

          {selectedCard && selectedCard.closeTime && (
            <div className="mb-4">
              <VoteCountdown closeTime={selectedCard.closeTime} />
            </div>
          )}

          {agencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
              <img src={logo} alt="바나나 로고" className="w-16 h-16 mb-4" />
              <p className="text-center text-gray-500">
                여행사에게 받은 제안서가 없습니다. <br />
              </p>
            </div>
          ) : (
            <AgencyList
              agencies={agencies}
              onVote={handleVote}
              onDetail={handleDetail}
            />
          )}

          {hasAcceptedProposal && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowDepositModal(true)}
                className="px-8 py-3 rounded text-brown bg-yellow"
              >
                예약금 결제하러 가기
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {showDepositModal && (
        <ReservationDepositModal
          travelPlanId={travelPlanId}
          proposalId={agencies[0]?.proposalId}
          onClose={() => setShowDepositModal(false)}
        />
      )}
    </div>
  );
};

export default UserVotePage;
