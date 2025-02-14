import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import logo from '../assets/loading-spinner.png';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import MyRoomCard from '../components/mypage/myroom/MyRoomCard';
const MyPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('전체보기');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await publicRequest.get('/api/v1/travel-plans/my-search');

        console.log('📌 API 응답:', response.data.data.travelPlans); // ✅ 응답 확인 로그

        if(response.status === 200 && response.data?.data?.travelPlans) {
          setRooms(response.data.data.travelPlans);
          setFilteredRooms(response.data.data.travelPlans);
        } else {
          console.error('❌ 응답 데이터가 배열이 아닙니다.', response.data.data.travelPlans);
        }
      } catch (error) {
        console.error('❌ 참여 중인 방 목록 불러오기 실패:', error);
      }
    };

    fetchRooms();
  }, []);

  // ✅ 필터 변경 시 적용
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === '전체보기') {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter((room) => room.status === filter));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container px-6 py-10 mx-auto">

        <div className="flex">
          <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold">필터</h3>
            {['전체보기', '진행중', '입찰중', '예약중', '여행 확정'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`block w-full text-left px-4 py-2 mb-2 rounded ${
                    selectedFilter === filter
                      ? 'bg-brown text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          {/* ✅ 오른쪽 카드 목록 */}
          <div className="grid w-3/4 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(filteredRooms || []).length > 0 ? (
              filteredRooms.map((room) => (
                <MyRoomCard key={room.travelPlanId} room={room} />
              ))
            ): (
              <div className="flex flex-col items-center justify-center w-full h-full mt-16 space-y-4">
                <img src={logo} alt="바나나 로고" className="w-16 h-16" />
                <p className="text-center text-gray-500">
                  검색 결과가 없습니다. <br />
                  다른 조건으로 검색해보세요.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 mt-4 text-white rounded-md bg-brown hover:bg-yellow hover:text-brown hover:font-bold"
                >
                  메인페이지로 가기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
