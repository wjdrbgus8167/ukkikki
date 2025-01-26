import React, { useState } from 'react';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import CardList from '../../components/search-rooms/CardList';
import Sidebar from '../../components/search-rooms/SideBar';

const SearchRoom = () => {
  const cards = [
    {
      status: "진행중",
      title: "유럽 여행 동행 모집",
      people: 5,
      date: "2025-02-15",
      theme: "관광+휴양,식도락",
      country: '유럽',
      min_people: 10,
      max_people: 20,
    },
    {
      status: "예약중",
      title: "제주도 힐링 여행",
      people: 3,
      date: "2025-03-10",
      theme: "현지문화체험,기차여행",
      country: '대한민국',
      min_people: 10,
      max_people: 80,
    },
    {
      status: "여행확정",
      title: "일본 벚꽃 투어",
      people: 10,
      date: "2025-04-01",
      theme: "골프,SNS핫플",
      country: '일본',
      min_people: 40,
      max_people: 100,
    },
    {
      status: "제안중",
      title: "동남아 배낭 여행",
      people: 7,
      date: "2025-05-20",
      theme: "럭셔리",
      country: '동남아',
      min_people: 10,
      max_people: 20,
    },
  ];

  const [filteredRooms, setFilteredRooms] = useState(cards);

  const handleFilter = (themes, states) => {
    let filtered = cards;
  
    if (!themes.includes('전체보기')) {
      filtered = filtered.filter((room) =>
        themes.some((theme) => room.theme.includes(theme))
      );
    }
  
    if (!states.includes('전체보기')) {
      filtered = filtered.filter((room) =>
        states.includes(room.status)
      );
    }
  
    setFilteredRooms(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onFilter={handleFilter} />
        <CardList cards={filteredRooms} />
      </div>
      <Footer />
    </div>
  );
};

export default SearchRoom;