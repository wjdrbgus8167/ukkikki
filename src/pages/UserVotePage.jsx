import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import AgencyList from '../components/vote/AgencyList';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';

const UserVotePage = () => {
  const { travelPlanId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCard } = location.state || {};
  const [agencies, setAgencies] = useState([]);

  // 제안 목록(API 호출) - 투표 시작 후 이 페이지에서 조회
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/travel-plans/${travelPlanId}/proposals`,
        );
        if (response.status === 200) {
          setAgencies(response.data.data);
          console.log('📦 제안 목록:', response.data.data);
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
      const voteSurveyId = voteStartResponse.data.data.voteSurveyId;
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
      Swal.fire('투표 실패', '투표 도중 오류가 발생했습니다.', 'error');
    }
  };

  // 상세보기 함수: navigate를 사용해 상세 페이지로 이동
  const handleDetail = (agency) => {
    navigate(
      `/travel-proposal/${travelPlanId}/proposals/${agency.proposalId}`,
      {
        state: { agency, selectedCard },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl p-6 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          제안받은 여행사
        </h1>

        <AgencyList
          agencies={agencies}
          onVote={handleVote}
          onDetail={handleDetail}
        />
      </div>

      <Footer />
    </div>
  );
};

export default UserVotePage;
