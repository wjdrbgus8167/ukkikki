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
  const statusMap = {
    IN_PROGRESS: '진행중',
    BIDDING: '입찰중',
    BOOKING: '예약중',
    CONFIRMED: '여행확정',
  };
  const handleFilter = (themes, states) => {
    let filtered = [...rooms]; // 원본 데이터 복사

    // ✅ 여행 테마 필터링 (undefined 체크 추가)
    if (!themes.includes('전체보기')) {
      filtered = filtered.filter(
        (room) =>
          Array.isArray(room.keywords) &&
          room.keywords.some((keyword) => themes.includes(keyword.name)),
      );
    }

    // ✅ 방 상태 필터링 (statusMap을 활용하여 상태 변환 후 비교)
    if (!states.includes('전체보기')) {
      filtered = filtered.filter((room) =>
        states.includes(statusMap[room.planningStatus] || '기타'),
      );
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
