import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import CardList from '../components/searchroom/CardList';
import Sidebar from '../components/searchroom/SideBar';
import { publicRequest } from '../hooks/requestMethod';
import Swal from 'sweetalert2';

const SearchRoom = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 여기서 navigate를 선언합니다.

  console.log('🔍 location.state:', location.state); // ✅ 추가

  // 수정: travelPlans 프로퍼티 없이 바로 rooms 배열 사용
  const initialRooms = location.state?.rooms?.travelPlans || [];

  // 🚀 디버깅 로그
  console.log('✅ rooms 데이터 확인:', initialRooms);

  const [rooms, setRooms] = useState(initialRooms);
  // 필터링 결과를 관리하는 상태 (초기값을 rooms 배열로 설정)
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);

  // state가 없는 경우 API 호출하여 데이터 불러오기
  useEffect(() => {
    if (rooms.length === 0) {
      const fetchTravelPlans = async () => {
        try {
          const response = await publicRequest.get('/api/v1/travel-plans');
          if (response.status === 200 && response.data?.data?.travelPlans) {
            setRooms(response.data.data.travelPlans);
            setFilteredRooms(response.data.data.travelPlans);
          } else {
            console.error('🚨 여행방 데이터 형식 오류:', response.data);
          }
        } catch (error) {
          console.error('🚨 여행방 전체 조회 실패:', error);
          Swal.fire(
            '알림',
            '🚨 여행방 데이터를 불러오는 중 오류가 발생했습니다.',
            'error',
          );
        }
      };
      fetchTravelPlans();
    }
  }, [rooms]);

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
