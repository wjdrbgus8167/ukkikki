import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import KakaoPayTest from '../services/KakaoPayTest';
import AgencyList from '../components/\bvote/AgencyList';

const UserVotePage = () => {
  const [agencies, setAgencies] = useState([
    { id: 1, name: 'AAA 여행사', price: 120000, votes: 0 },
    { id: 2, name: 'BBB 투어', price: 150000, votes: 0 },
    { id: 3, name: 'CCC 트래블', price: 130000, votes: 0 },
  ]);

  // ✅ 투표 처리 함수
  const handleVote = (id, isVoting) => {
    setAgencies((prev) =>
      prev.map((agency) =>
        agency.id === id
          ? { ...agency, votes: isVoting ? agency.votes + 1 : agency.votes - 1 }
          : agency,
      ),
    );
  };

  const handleDetail = (agency) => {
    alert(
      `${agency.name} 상세보기\n금액: ${agency.price}원\n투표수: ${agency.votes}`,
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          제안받은 여행사
        </h1>

        {/* 가로 정렬된 여행사 카드 리스트 */}
        <AgencyList
          agencies={agencies}
          onVote={handleVote}
          onDetail={handleDetail}
        />

        {/* 카카오페이 결제 박스 */}
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">예약금 결제</h2>
          <KakaoPayTest />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserVotePage;
