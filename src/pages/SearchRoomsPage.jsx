import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import CardList from '../components/searchroom/CardList';
import Sidebar from '../components/searchroom/SideBar';

const SearchRoom = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 여기서 navigate를 선언합니다.

  console.log('🔍 location.state:', location.state); // ✅ 추가

  // 수정: travelPlans 프로퍼티 없이 바로 rooms 배열 사용
  const rooms = location.state.rooms.travelPlans || [];

  // 🚀 디버깅 로그
  console.log('✅ rooms 데이터 확인:', rooms);

  // 필터링 결과를 관리하는 상태 (초기값을 rooms 배열로 설정)
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleFilter = (themes, states) => {
    let filtered = rooms; // 원본 데이터인 rooms를 사용

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
        {/* 필터링된 결과 사용 */}
        <CardList cards={filteredRooms} />
      </div>
      <Footer />
    </div>
  );
};

export default SearchRoom;
