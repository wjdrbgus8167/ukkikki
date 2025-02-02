import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import DashBoard from '../components/user-room/DashBoard';
import React, { useState } from 'react';

import InteractiveSection from '../components/user-room/InteractiveSection';
const UserRoom = () => {
  const [selectedCity, setSelectedCity] = useState('상하이'); // 기본 도시

  return (
    <div>
      <Header />
      <DashBoard />
      <InteractiveSection city={selectedCity} />
      <Footer />
    </div>
  );
};

export default UserRoom;
