import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';

const MyPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('전체보기');

  useEffect(() => {
    // ✅ 참여 중인 방 목록 가져오기 (API 요청)
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/v1/rooms/mypage');
        console.log('📌 API 응답:', response.data); // ✅ 응답 확인 로그

        if (Array.isArray(response.data)) {
          setRooms(response.data);
          setFilteredRooms(response.data);
        } else {
          console.error('❌ 응답 데이터가 배열이 아닙니다.', response.data);
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
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">마이페이지</h2>

        <div className="flex">
          {/* ✅ 왼쪽 필터 사이드바 */}
          <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">필터</h3>
            {['전체보기', '진행중', '제안중', '예약중', '여행 확정'].map(
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
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredRooms || []).length > 0 ? (
              filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold">{room.title}</h3>
                  <p className="text-sm text-gray-600">{room.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 text-sm text-white bg-blue-500 rounded">
                    {room.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">참여 중인 방이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
