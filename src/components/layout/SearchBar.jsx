import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import KoreaAirportSelector from '../../services/airport/KoreaAirportSelector';
import WorldAirportSelector from '../../services/airport/WorldAirportSelector';
import CreateRoomModal from '../mainpage/CreateRoomModal';
import { useCookies } from 'react-cookie';

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [searchType, setSearchType] = useState('findRoom'); // ✅ 방 찾기 / 방 만들기 선택 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cookies] = useCookies(['accessToken']); // ✅ 컴포넌트 내부에서 useCookies 사용
  const navigate = useNavigate();
  const isAuthenticated = !!cookies.accessToken; // ✅ accessToken 존재 여부 확인

  const API_KEY = import.meta.env.VITE_APP_AIRPORT_API_KEY;
  const API_BASE_URL = '/api/flight/getIflightScheduleList'; // 프록시 사용

  // ✅ 방 찾기 버튼 클릭 시 검색 조건을 쿼리 파라미터로 전달하며 SearchRoom 페이지로 이동
  const handleFindRoom = () => {
    if (!startDate || !endDate || !departureAirport || !arrivalAirport) {
      alert('출발일, 돌아오는 날, 출발 공항, 도착 공항을 모두 선택해주세요.');
      return;
    }

    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      departureCityId: departureAirport,
      arrivalCityId: arrivalAirport,
      keywords: '',
      status: '전체보기',
    });

    navigate(`/search-room?${queryParams.toString()}`);
  };

  // ✅ 방 만들기 버튼 클릭 시 로그인 여부 확인 후 동작
  const handleCreateRoom = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // ✅ 로그인 페이지로 이동
      return;
    }

    if (!startDate || !endDate || !departureAirport || !arrivalAirport) {
      alert('출발일, 돌아오는 날, 출발 공항, 도착 공항을 모두 선택해주세요.');
      return;
    }

    const depDate = startDate.toISOString().split('T')[0].replace(/-/g, '');
    const arrDate = endDate.toISOString().split('T')[0].replace(/-/g, '');

    try {
      const departureResponse = await axios.get(API_BASE_URL, {
        params: {
          serviceKey: API_KEY,
          schDate: depDate,
          schDeptCityCode: departureAirport,
          schArrvCityCode: arrivalAirport,
          pageNo: 1,
        },
      });

      const returnResponse = await axios.get(API_BASE_URL, {
        params: {
          serviceKey: API_KEY,
          schDate: arrDate,
          schDeptCityCode: arrivalAirport,
          schArrvCityCode: departureAirport,
          pageNo: 1,
        },
      });

      const departureFlights =
        departureResponse.data.response?.body?.items?.item || [];
      const returnFlights =
        returnResponse.data.response?.body?.items?.item || [];

      if (departureFlights.length > 0 && returnFlights.length > 0) {
        setIsModalOpen(true);
      } else {
        alert('❌ 해당 날짜에 왕복 항공편이 없습니다.');
      }
    } catch (error) {
      console.error('🚨 항공권 조회 실패:', error);
      alert('🚨 항공권 조회 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white bg-opacity-30 p-6 rounded-md shadow-lg w-full max-w-3xl backdrop-blur-md">
        <form className="space-y-6">
          {/* ✅ 방 찾기 vs 방 만들기 선택 스위치 */}
          <div className="relative flex justify-between items-center border-gray-300 pb-2">
            <button
              type="button"
              className={`flex-1 text-center py-2 rounded-md ${
                searchType === 'findRoom'
                  ? 'text-white font-bold'
                  : 'text-gray-300'
              }`}
              onClick={() => setSearchType('findRoom')}
            >
              방 찾기
            </button>
            <button
              type="button"
              className={`flex-1 text-center py-2 rounded-md ${
                searchType === 'createGroup'
                  ? 'text-white font-bold'
                  : 'text-gray-300'
              }`}
              onClick={() => setSearchType('createGroup')}
            >
              방 만들기
            </button>
            <div
              className="absolute bottom-0 h-1 w-1/2 bg-dark-green transition-transform duration-300"
              style={{
                transform:
                  searchType === 'findRoom'
                    ? 'translateX(0)'
                    : 'translateX(100%)',
              }}
            />
          </div>

          {/* ✅ 날짜 선택 */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                출발일
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                locale={ko}
                className="w-full px-4 py-2 border bg-transparent border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="언제 떠나시나요?"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                돌아오는 날
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate || new Date()}
                dateFormat="yyyy/MM/dd"
                locale={ko}
                className="w-full px-4 py-2 border bg-transparent border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="언제 돌아오시나요?"
              />
            </div>
          </div>

          {/* ✅ 출발/도착 공항 선택 */}
          <div className="flex space-x-4">
            <KoreaAirportSelector
              selectedAirport={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
            <WorldAirportSelector
              selectedAirport={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>

          {/* ✅ 검색하기 / 방 만들기 버튼 */}
          <div className="text-center">
            {searchType === 'findRoom' ? (
              <button
                type="button"
                onClick={handleFindRoom}
                className="w-full bg-dark-green text-white px-8 py-3 rounded-md font-semibold"
              >
                검색하기
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateRoom}
                className="w-full bg-dark-green text-white px-8 py-3 rounded-md font-semibold"
              >
                방 만들기
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ✅ 방 만들기 모달 (왕복 항공권이 있는 경우에만 오픈) */}
      {isModalOpen && (
        <CreateRoomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
