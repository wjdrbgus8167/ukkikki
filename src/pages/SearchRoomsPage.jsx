import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import CardList from '../components/searchroom/CardList';
import Sidebar from '../components/searchroom/SideBar';
import { useLocation } from 'react-router-dom';

const SearchRoom = () => {
  const location = useLocation();
  console.log('🔍 location.state:', location.state); // ✅ 추가
  const rooms = location.state?.rooms?.travelPlans || []; // ✅ travelPlans에서 데이터 가져오기

  // 🚀 디버깅 로그
  console.log('✅ rooms 데이터 확인:', rooms);
  console.log('✅ travelPlans 데이터:', location.state?.rooms?.travelPlans);
  console.log('✅ rooms 데이터 확인:', rooms); // ✅ 추가

  const [filteredRooms, setFilteredRooms] = useState(rooms); // ✅ 초기값을 API 데이터로 설정
  const handleFilter = (themes, states) => {
    let filtered = cards;

    if (!themes.includes('전체보기')) {
      filtered = filtered.filter((room) =>
        themes.some((theme) => room.theme.includes(theme)),
      );
    }

    if (!states.includes('전체보기')) {
      filtered = filtered.filter((room) => states.includes(room.status));
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onFilter={handleFilter} />
        <CardList cards={rooms} />
      </div>
      <Footer />
    </div>
  );
};

export default SearchRoom;
