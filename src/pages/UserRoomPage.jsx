import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import DashBoard from '../components/userroom/DashBoard';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 훅 사용

import InteractiveSection from '../components/userroom/InteractiveSection';
const UserRoom = () => {
  const [selectedCity, setSelectedCity] = useState('상하이'); // 기본 도시
  const location = useLocation(); // location에서 전달된 상태를 받음
  const { selectedCard } = location.state || {}; // 전달된 상태에서 selectedCard를 받음

  return (
    <div>
      <Header />
      <DashBoard selectedCard={selectedCard} />
      <InteractiveSection city={selectedCity} />
      <Footer />
    </div>
  );
};

export default UserRoom;
