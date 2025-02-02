import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale'; // 한국어 로케일 임포트
import KoreaAirportSelector from '../../services/airport/KoreaAirportSelector';
import WorldAirportSelector from '../../services/airport/WorldAirportSelector';

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null); // 출발일
  const [endDate, setEndDate] = useState(null); // 돌아오는(도착) 일
  const [departureAirport, setDepartureAirport] = useState(''); // 출발 공항
  const [arrivalAirport, setArrivalAirport] = useState(''); // 도착 공항

  const [koreaAirports, setKoreaAirports] = useState([]); // 대한민국 공항 목록
  const [worldAirports, setWorldAirports] = useState([]); // 전 세계 공항 목록

  const [searchType, setSearchType] = useState('findRoom'); // 방 찾기 / 방 만들기
  const [searchResult, setSearchResult] = useState(null); // 검색 결과 (편도 검색 시)
  const [roundTripResult, setRoundTripResult] = useState({
    departure: [],
    arrival: [],
  }); // 왕복 조회 결과

  const apiKey = import.meta.env.VITE_APP_AIRPORT_API_KEY;

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const worldResponse = await fetch(
          `https://api.odcloud.kr/api/3051587/v1/uddi:007305db-cbc2-4554-8988-f9109b2dad10?page=1&perPage=100&serviceKey=${apiKey}`,
        );
        const koreaResponse = await fetch(
          `https://api.odcloud.kr/api/3051587/v1/uddi:47338db4-719b-4162-9cc1-f7efd0bad374?page=1&perPage=100&serviceKey=${apiKey}`,
        );

        const worldData = await worldResponse.json();
        const krData = await koreaResponse.json();

        const koreaAirports = krData.data
          .filter(
            (airport) =>
              airport['국가명_한글'] === '대한민국' &&
              airport['한글명'].includes('국제'),
          )
          .map((airport) => airport['한글명'])
          .sort();

        const worldAirports = worldData.data
          .map((airport) => airport['한글공항'])
          .sort();

        setKoreaAirports(koreaAirports);
        setWorldAirports(worldAirports);
      } catch (error) {
        console.error('공항 데이터 가져오기 실패:', error);
      }
    };

    fetchAirports();
  }, []);

  // ✈️ 편도 항공편 검색 (기존 로직)
  const handleOneWaySearch = async (event) => {
    event.preventDefault();
    if (!startDate || !departureAirport || !arrivalAirport) {
      alert('모든 검색 조건(출발일/출발공항/도착공항)을 입력해주세요.');
      return;
    }

    const formattedDate = startDate
      .toISOString()
      .split('T')[0]
      .replace(/-/g, ''); // yyyyMMdd 형식

    try {
      const response = await fetch(
        `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList` +
          `?serviceKey=${apiKey}` +
          `&schDate=${formattedDate}` +
          `&schDeptCityCode=${departureAirport}` +
          `&schArrvCityCode=${arrivalAirport}`,
      );

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      const data = await response.json();
      setSearchResult(data.response.body.items.item || []);
    } catch (error) {
      console.error('항공편 데이터 검색 실패:', error);
      setSearchResult(null);
    }
  };

  // ✈️ 왕복 항공편 검색
  const handleRoundTripSearch = async (event) => {
    event.preventDefault();
    if (!startDate || !endDate || !departureAirport || !arrivalAirport) {
      alert('모든 검색 조건(출발일/도착일/출발공항/도착공항)을 입력해주세요.');
      return;
    }

    const depDate = startDate.toISOString().split('T')[0].replace(/-/g, '');
    const arrDate = endDate.toISOString().split('T')[0].replace(/-/g, '');

    try {
      // 1) 출발편 조회
      const depResponse = await fetch(
        `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList` +
          `?serviceKey=${apiKey}` +
          `&schDate=${depDate}` +
          `&schDeptCityCode=${departureAirport}` +
          `&schArrvCityCode=${arrivalAirport}`,
      );

      if (!depResponse.ok) {
        throw new Error(`왕복 - 출발편 API 실패: ${depResponse.status}`);
      }
      const depData = await depResponse.json();
      const departureFlights = depData.response.body.items.item || [];

      // 2) 도착편(돌아오는 편) 조회
      const arrResponse = await fetch(
        `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList` +
          `?serviceKey=${apiKey}` +
          `&schDate=${arrDate}` +
          `&schDeptCityCode=${arrivalAirport}` + // 반대
          `&schArrvCityCode=${departureAirport}`,
      );

      if (!arrResponse.ok) {
        throw new Error(`왕복 - 도착편 API 실패: ${arrResponse.status}`);
      }
      const arrData = await arrResponse.json();
      const arrivalFlights = arrData.response.body.items.item || [];

      // 왕복 결과 업데이트
      setRoundTripResult({
        departure: departureFlights,
        arrival: arrivalFlights,
      });

      // 항공권이 하나라도 없으면 알림창
      if (departureFlights.length === 0 || arrivalFlights.length === 0) {
        alert('해당 날짜/도시로 왕복 항공권이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('왕복 항공편 조회 실패:', error);
      setRoundTripResult({ departure: [], arrival: [] });
      alert('왕복 항공편 조회 중 오류가 발생했습니다.');
    }
  };

  // ✈️ 폼 제출 핸들러 (검색하기 / 방 만들기)
  const handleSubmit = (event) => {
    if (searchType === 'findRoom') {
      handleOneWaySearch(event);
    } else {
      handleRoundTripSearch(event);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white bg-opacity-30 p-6 rounded-md shadow-lg w-full max-w-3xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex justify-between items-center">
            <div
              className={`flex-1 text-center py-2 rounded-md cursor-pointer ${
                searchType === 'findRoom' ? 'text-white' : 'text-gray-300'
              }`}
              onClick={() => setSearchType('findRoom')}
            >
              방 찾기
            </div>
            <div
              className={`flex-1 text-center py-2 rounded-md cursor-pointer ${
                searchType === 'createGroup' ? 'text-white' : 'text-gray-300'
              }`}
              onClick={() => setSearchType('createGroup')}
            >
              방 만들기
            </div>
            <div
              className="absolute h-1 w-1/2 bg-dark-green transition-transform duration-300"
              style={{
                transform:
                  searchType === 'findRoom'
                    ? 'translateX(0)'
                    : 'translateX(100%)',
                bottom: 0,
              }}
            ></div>
          </div>

          {/* 날짜 선택 */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                출발일
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (endDate && date > endDate) {
                    setEndDate(null);
                  }
                }}
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                locale={ko}
                className="w-full px-4 py-2 border bg-transparent placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border bg-transparent placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="언제 돌아오시나요?"
              />
            </div>
          </div>

          {/* 출발 공항 */}
          <div className="flex space-x-4">
            <KoreaAirportSelector
              koreaAirports={koreaAirports}
              selectedAirport={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>

          {/* 도착 공항 */}
          <div className="flex space-x-4">
            <WorldAirportSelector
              worldAirports={worldAirports}
              selectedAirport={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>

          {/* 검색/방 만들기 버튼 */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full font-bold bg-white text-dark-green px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300 hover:text-white"
            >
              {searchType === 'findRoom' ? '검색하기' : '방 만들기'}
            </button>
          </div>
        </form>

        {/* 편도 결과 */}
        {searchType === 'findRoom' && searchResult && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">검색 결과 (편도)</h3>
            {searchResult.length > 0 ? (
              <ul>
                {searchResult.map((flight, index) => (
                  <li key={index}>
                    {flight.airline} - {flight.flightNum} (
                    {flight.departureTime} → {flight.arrivalTime})
                  </li>
                ))}
              </ul>
            ) : (
              <p>검색된 항공편이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
