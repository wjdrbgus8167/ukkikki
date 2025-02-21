import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import AgencyList from '../components/vote/AgencyList';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';
import ReservationDepositModal from '../components/vote/ReservationDepositModal'; // 예약금 결제 모달
import { IoIosArrowBack } from 'react-icons/io';

const UserVotePage = () => {
  const { travelPlanId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // location.state에서 전달받은 selectedCard를 사용
  const { selectedCard } = location.state || {};
  const [agencies, setAgencies] = useState([]);
  const [hasAcceptedProposal, setHasAcceptedProposal] = useState(false); // Flag for accepted proposal
  const [showDepositModal, setShowDepositModal] = useState(false); // 예약금 결제 모달 표시 여부

  // 제안 목록(API 호출) - 투표 시작 후 이 페이지에서 조회
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals`,
        );
        if (response.status === 200) {
          const proposals = response.data.data;
          
          // 각 proposal에 대해 hostConnected 값을 가져오기 위한 Promise.all 사용
          const proposalsWithStatus = await Promise.all(
            proposals.map(async (proposal) => {
              try {
                const statusResponse = await publicRequest.get(
                  `/api/v1/travel-plans/${travelPlanId}/proposals/${proposal.proposalId}/meeting/host-status`,
                );
                // hostConnected 값을 proposal 객체에 추가
                return { ...proposal, hostConnected: statusResponse.data.data.hostConnected };
              } catch (error) {
                console.error(
                  `Host status 조회 실패 - proposalId: ${proposal.proposalId}`,
                  error,
                );
                return { ...proposal, hostConnected: false };
              }
            }),
          );

          // 채택된 제안서 필터링
          const acceptedProposals = proposalsWithStatus.filter(
            (proposal) => proposal.proposalStatus === 'A',
          );
          if (acceptedProposals.length > 0) {
            setHasAcceptedProposal(true);
            setAgencies(acceptedProposals);
          } else {
            setHasAcceptedProposal(false);
            setAgencies(proposalsWithStatus); // If no accepted proposal, show all
          }
          console.log('📦 제안 목록:', proposalsWithStatus);
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

  // 투표 처리 함수 (투표는 한 번만 가능)
  const handleVote = async (agency) => {
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
      // selectedCard.voteSurveyInfo가 존재하고, 투표가 시작된 상태라면 그 voteSurveyId를 사용
      const voteSurveyId = selectedCard.voteSurveyInfo.voteSurveyId;
      if (!voteSurveyId) {
        Swal.fire(
          '오류',
          '투표 시작 정보가 없습니다. 투표를 진행할 수 없습니다.',
          'error',
        );
        return;
      }
      // 투표하기 API 호출
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

  // 상세보기 함수: 상세보기 페이지로 navigate
  const handleDetail = (agency) => {
    navigate(`/proposal-detail/${travelPlanId}/${agency.proposalId}`, {
      state: { agency, selectedCard },
    });
  };

  // 예약금 결제 모달 띄우기
  const handleDeposit = () => {
    setShowDepositModal(true);
  };

  // 결제 처리 함수
  const handlePayment = async (agencyId) => {
    try {
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/proposals/${agencyId}/deposit`,
      );
      if (response.status === 200) {
        Swal.fire('결제 완료', '예약금이 결제되었습니다.', 'success');
        setShowDepositModal(false); // 모달 닫기
      }
    } catch (error) {
      console.error('결제 실패:', error);
      Swal.fire('오류', '결제 중 오류가 발생했습니다.', 'error');
    }
  };

  // 예약금 결제 모달 컴포넌트
  const handleJoinMeeting = async (agency) => {
    try {
      // 백엔드로부터 참가자 권한 토큰을 발급
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/proposals/${agency.proposalId}/meeting/connection`,
        { isHost: false },
      );
      if (response.status === 200) {
        const { token } = response.data.data;
        // 쿼리 파라미터로 token, isHost를 넘겨서 이동
        navigate(
          `/meeting/${agency.proposalId}?token=${encodeURIComponent(
            token,
          )}&isHost=false`,
        );
      }
    } catch (error) {
      console.error('회의 참여 실패:', error);
      Swal.fire('오류', '라이브 방송 참여에 실패했습니다.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl p-6 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {hasAcceptedProposal ? '채택된 여행사' : '제안받은 여행사'}
        </h1>

        <AgencyList
          agencies={agencies}
          onVote={handleVote}
          onDetail={handleDetail}
          onJoinMeeting={handleJoinMeeting}
        />

        {/* 예약금 결제 버튼 */}
        {hasAcceptedProposal && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleDeposit}
              className="px-8 py-3 rounded text-brown bg-yellow"
            >
              예약금 결제하러 가기
            </button>
          </div>
        )}
      </div>

      <Footer />

      {/* 예약금 결제 모달 */}
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
