import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DashBoard from '../components/userroom/DashBoard';
import InteractiveSection from '../components/userroom/InteractiveSection';

const UserRoom = () => {
  const location = useLocation();
  const selectedCard = location.state?.selectedCard; // ✅ 전달된 여행방 데이터
  const travelPlanId = selectedCard?.id; // 여행방 ID

  if (!selectedCard) {
    return (
      <div>
        <Header />
        <div className="p-10 text-center text-red-500">
          🚨 여행방 정보를 찾을 수 없습니다.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <DashBoard selectedCard={selectedCard} />
      <InteractiveSection selectedCard={selectedCard} />{' '}
      {/* ✅ selectedCard 통째로 전달 */}
      <Footer />
    </div>
  );
};

export default UserRoom;
