import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import CardList from '../components/searchroom/CardList';
import Sidebar from '../components/searchroom/SideBar';
import { useLocation } from 'react-router-dom';

const SearchRoom = () => {
  // const cards = [
  //   {
  //     status: '진행중',
  //     title: '프랑스 여행 동행 모집',
  //     people: 5,
  //     start_date: '2025-02-15',
  //     end_date: '2025-02-25',
  //     theme: '관광+휴양,식도락',
  //     country: '프랑스',
  //     min_people: 10,
  //     max_people: 20,
  //   },
  //   {
  //     status: '예약중',
  //     title: '제주도 힐링 여행',
  //     people: 3,
  //     start_date: '2025-03-15',
  //     end_date: '2025-03-25',
  //     theme: '현지문화체험,기차여행',
  //     country: '대한민국',
  //     min_people: 10,
  //     max_people: 80,
  //   },
  //   {
  //     status: '여행확정',
  //     title: '일본 벚꽃 투어',
  //     people: 10,
  //     start_date: '2025-01-15',
  //     end_date: '2025-02-25',
  //     theme: '골프,SNS핫플',
  //     country: '일본',
  //     min_people: 40,
  //     max_people: 100,
  //   },
  //   {
  //     status: '제안중',
  //     title: '상하이 배낭 여행',
  //     people: 7,
  //     start_date: '2025-02-15',
  //     end_date: '2025-02-25',
  //     theme: '럭셔리',
  //     country: '상하이',
  //     min_people: 10,
  //     max_people: 20,
  //   },
  // ];
  const location = useLocation();
  console.log('🔍 location.state:', location.state); // ✅ 추가
  const rooms = location.state?.rooms || []; // ✅ API에서 전달된 여행방 데이터
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
