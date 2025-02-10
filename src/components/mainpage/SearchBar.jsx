import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import KoreaAirportModal from '../../services/airport/KoreaAirportSelector';
import WorldAirportModal from '../../services/airport/WorldAirportSelector';
import CreateRoomModal from './CreateRoomModal';
import { useCookies } from 'react-cookie';
import { publicRequest } from '../../hooks/requestMethod';
const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [searchType, setSearchType] = useState('findRoom'); // ✅ 방 찾기 / 방 만들기 선택 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrivalCityId, setArrivalCityId] = useState('');
  const [departureCityId, setDepartureCityId] = useState('');
  const [isKoreaModalOpen, setIsKoreaModalOpen] = useState(false);
  const [isWorldModalOpen, setIsWorldModalOpen] = useState(false);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_APP_AIRPORT_API_KEY;
  const API_BASE_URL = '/api/flight/getIflightScheduleList'; // 프록시 사용

  // ✅ 날짜 포맷 변환 함수
  const formatDate = (date) => {
    if (!date) return ''; // ✅ 날짜가 없을 경우 빈 문자열 반환
    return date.toISOString().split('T')[0]; // ✅ yyyy-MM-dd 형식으로 변환
  };
  // ✅ 방 찾기 버튼 클릭 시 검색 조건을 API에 전달 후 SearchRoom 페이지로 이동
  const handleFindRoom = async () => {
    // 🚀 최종 값 확인 (여기서 값이 `""`라면 문제가 있음)
    console.log('🚀 최종 출발 도시 ID:', departureCityId);
    console.log('🚀 최종 도착 도시 ID:', arrivalCityId);
    console.log('🚀 최종 출발일:', startDate);
    console.log('🚀 최종 도착일:', endDate);
    if (!startDate || !endDate || !departureCityId || !arrivalCityId) {
      alert('출발일, 돌아오는 날, 출발 도시, 도착 도시를 모두 선택해주세요.');
      return;
    }

    if (departureCityId === arrivalCityId) {
      alert('출발지와 도착지는 달라야 합니다.');
      return;
    }

    const endpoint = '/api/v1/travel-plans/search';

    try {
      const response = await publicRequest.get(endpoint, {
        params: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          departureCityId, // ✅ 변경된 부분 (departureAirport → departureCityId)
          arrivalCityId, // ✅ 변경된 부분 (arrivalAirport → arrivalCityId)
        },
      });
      if (response.status === 200) {
        console.log('🔍 검색 결과:', response.data);
        navigate('/search-room', {
          state: { rooms: response.data.data },
        });
      }
    } catch (error) {
      console.log('🔍 요청 URL:', endpoint);
      console.log('📌 요청 파라미터:', {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        departureCityId,
        arrivalCityId,
      });
      console.error('🚨 방 찾기 실패:', error);
      alert('🚨 방 찾기 중 오류가 발생했습니다.');
    }
  };

  //----------------------------------------------
  // ✅ 방 만들기 버튼 클릭 시 로그인 여부 확인 후 동작
  const handleCreateRoom = async () => {
    console.log('🚀 최종 출발 도시 ID:', departureCityId);
    console.log('🚀 최종 도착 도시 ID:', arrivalCityId);
    console.log('🚀 최종 출발일:', startDate);
    console.log('🚀 최종 도착일:', endDate);

    if (!startDate || !endDate || !arrivalCityId || !departureCityId) {
      alert('출발일, 돌아오는 날, 출발 공항, 도착 공항을 모두 선택해주세요.');
      return;
    }

    const depDate = startDate.toISOString().split('T')[0].replace(/-/g, '');
    const arrDate = endDate.toISOString().split('T')[0].replace(/-/g, '');

    // 디버깅: 요청 파라미터 출력
    const departureParams = {
      serviceKey: API_KEY,
      schDate: depDate,
      schDeptCityCode: departureAirport,
      schArrvCityCode: arrivalAirport,
      pageNo: 1,
    };
    const returnParams = {
      serviceKey: API_KEY,
      schDate: arrDate,
      schDeptCityCode: arrivalAirport,
      schArrvCityCode: departureAirport,
      pageNo: 1,
    };

    console.log('🛫 출발 항공편 요청 파라미터:', departureParams);
    console.log('🛬 도착 항공편 요청 파라미터:', returnParams);

    try {
      const departureResponse = await axios.get(API_BASE_URL, {
        params: departureParams,
      });
      const returnResponse = await axios.get(API_BASE_URL, {
        params: returnParams,
      });

      // 디버깅: 전체 응답 객체 출력
      console.log('✈️ 출발 항공편 전체 응답:', departureResponse.data);
      console.log('✈️ 도착 항공편 전체 응답:', returnResponse.data);

      // 항공편 데이터 추출 (항공편 데이터가 단일 객체로 반환될 수도 있으므로 배열 처리)
      let departureFlights =
        departureResponse.data.response?.body?.items?.item || [];
      if (departureFlights && !Array.isArray(departureFlights)) {
        departureFlights = [departureFlights];
      }
      let returnFlights = returnResponse.data.response?.body?.items?.item || [];
      if (returnFlights && !Array.isArray(returnFlights)) {
        returnFlights = [returnFlights];
      }

      console.log('🛫 출발 항공편 데이터:', departureFlights);
      console.log('🛬 도착 항공편 데이터:', returnFlights);

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
      <div className="w-full max-w-3xl p-6 bg-white rounded-md shadow-lg bg-opacity-30 backdrop-blur-md">
        <form className="space-y-6">
          {/* ✅ 방 찾기 vs 방 만들기 선택 스위치 */}
          <div className="relative flex items-center justify-between pb-2 border-gray-300">
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
              className="absolute bottom-0 w-1/2 h-1 transition-transform duration-300 bg-dark-green"
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
                className="w-full px-4 py-2 text-white placeholder-white bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 text-white placeholder-white bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="언제 돌아오시나요?"
              />
            </div>
          </div>

          <div className="w-full max-w-3xl rounded-md">
            <div className="space-y-6">
              {/* 출발지 선택 */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  출발지
                </label>
                <div
                  onClick={() => setIsKoreaModalOpen(true)}
                  className="w-full px-4 py-2 text-white bg-transparent border border-white rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {departureCityId
                    ? `출발지: ${departureCityId} (${departureAirport})`
                    : '출발지 선택'}
                </div>
              </div>

              {/* 도착지 선택 */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  도착지
                </label>
                <div
                  onClick={() => setIsWorldModalOpen(true)}
                  className="w-full px-4 py-2 text-white bg-transparent border border-white rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {arrivalCityId
                    ? `도착지: ${arrivalCityId} (${arrivalAirport})`
                    : '도착지 선택'}
                </div>
              </div>
            </div>

            {/* 출발지 모달 */}
            <KoreaAirportModal
              isOpen={isKoreaModalOpen}
              onClose={() => setIsKoreaModalOpen(false)}
              onSelect={(cityId, airportName, airportCode) => {
                setDepartureCityId(cityId);
                // 여기서는 airportCode를 실제 API 호출에 사용하도록 저장합니다.
                setDepartureAirport(airportCode);
                setIsKoreaModalOpen(false);
              }}
            />

            {/* 도착지 모달 */}
            <WorldAirportModal
              isOpen={isWorldModalOpen}
              onClose={() => setIsWorldModalOpen(false)}
              onSelect={(cityId, airportName, airportCode) => {
                if (!cityId) {
                  console.error(
                    '🚨 도착지 cityId가 없음! 전달된 값:',
                    cityId,
                    airportName,
                  );
                  return;
                }
                console.log('✅ 부모에서 받은 도착 cityId:', cityId);
                setArrivalCityId(cityId);
                // airportCode를 저장하여 API 호출에 사용합니다.
                setArrivalAirport(airportCode);
                setIsWorldModalOpen(false);
              }}
            />
          </div>
          {/* ✅ 검색하기 / 방 만들기 버튼 */}
          <div className="text-center">
            {searchType === 'findRoom' ? (
              <button
                type="button"
                onClick={handleFindRoom}
                className="w-full px-8 py-3 font-semibold text-white rounded-md bg-dark-green"
              >
                검색하기
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateRoom}
                className="w-full px-8 py-3 font-semibold text-white rounded-md bg-dark-green"
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
          travelData={{
            departureCityId,
            arrivalCityId,
            startDate: formatDate(startDate), // "yyyy-MM-dd" 형식
            endDate: formatDate(endDate),
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
