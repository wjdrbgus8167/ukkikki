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
  // location.state에서 전달받은 selectedCard (없으면 null)
  const initialSelectedCard = location.state?.selectedCard || null;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);
  const [agencies, setAgencies] = useState([]);
  const [hasAcceptedProposal, setHasAcceptedProposal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // 제안 목록(API 호출)
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals`,
        );
        if (response.status === 200) {
          let proposals = response.data.data;
          // 채택된 제안서(proposalStatus가 'A')가 있는지 확인
          const acceptedProposals = proposals.filter(
            (proposal) => proposal.proposalStatus === 'A',
          );
          if (acceptedProposals.length > 0) {
            setHasAcceptedProposal(true);
            proposals = acceptedProposals; // 채택된 제안서만 표시
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

  // 투표 처리 함수 (투표 로직은 그대로 유지)
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
      // 백엔드에서 투표 시작이 자동으로 처리되므로 voteSurveyId는 그대로 사용
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

  // 상세보기 함수: ProposalDetailForUser 페이지로 이동 (selectedCard 정보도 함께 전달)
  const handleDetail = (agency) => {
    navigate(`/proposal-detail/${travelPlanId}/${agency.proposalId}`, {
      state: { agency, selectedCard },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl p-6 mx-auto">
        {/* 제목 영역 - 뒤로가기 버튼과 제목을 flex로 배치 */}
        <div className="flex items-center justify-between mb-6">
          {/* 왼쪽: 뒤로가기 버튼 */}
          <button onClick={() => navigate(-1)} className="ml-4 text-brown">
            <IoIosArrowBack size={32} className="text-3xl font-bold" />
          </button>
          {/* 가운데: 제목 */}
          <h1 className="flex-1 text-2xl font-bold text-center text-gray-800">
            {hasAcceptedProposal ? '채택된 여행사' : '제안받은 여행사'}
          </h1>
          {/* 오른쪽: 같은 너비의 빈 요소로 가운데 정렬 유지 */}
          <div className="w-10 mr-4" />
        </div>
        {selectedCard && selectedCard.closeTime && (
          <div className="mb-4">
            <VoteCountdown closeTime={selectedCard.closeTime} />
          </div>
        )}
        {/* 제안서가 없는 경우 메시지 출력 */}
        {agencies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
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
      <Footer />
      {showDepositModal && (
        <ReservationDepositModal
          travelPlanId={travelPlanId}
          proposalId={agencies[0]?.proposalId} // 채택된 제안서가 있을 때 해당 proposalId 사용
          onClose={() => setShowDepositModal(false)}
        />
      )}
    </div>
  );
};

export default UserVotePage;
