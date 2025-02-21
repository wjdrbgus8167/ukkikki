import React, { useState, useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const KoreaAirportModal = ({ isOpen, onClose, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await publicRequest.get(
          '/api/v1/geography/continents/1/countries/1/cities',
        );
        setCities(response.data.data || []);
      } catch (error) {
        console.error('🚨 한국 도시 데이터 오류:', error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    const fetchAirports = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/1/countries/1/cities/${selectedCity}`,
        );
        setAirports(response.data.data || []);
      } catch (error) {
        console.error('🚨 공항 데이터 오류:', error);
      }
    };
    fetchAirports();
  }, [selectedCity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div
        className="relative p-8 transition-all duration-300 transform scale-100 bg-white shadow-2xl rounded-xl 
        w-[400px] h-[450px] flex flex-col justify-center items-center text-center"
      >
        {/* 닫기 버튼 (오른쪽 상단) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute px-2 py-1 text-white rounded-md top-4 right-4 hover:bg-opacity-80"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/154/154616.png"
            className="w-6"
            alt="닫기"
          />
        </button>

        {/* 타이틀 */}
        <h2 className="mb-4 text-2xl font-bold text-gray-800">출발지 선택</h2>

        <div className="flex flex-col items-center justify-center flex-1 w-full overflow-y-auto">
          {/* 1단계: 도시 선택 */}

          {!selectedCity ? (
            <div className="grid w-full grid-cols-2 gap-4 px-6">
              {cities.map((city) => (
                <button
                  key={city.cityId}
                  onClick={() => setSelectedCity(city.cityId)}
                  className="w-full p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {city.name}
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* 2단계: 공항 선택 */}
              <button
                type="button"
                onClick={() => setSelectedCity('')}
                className="px-4 py-2 font-bold rounded-md text-dark-green hover:bg-opacity-80 "
              >
                ⬅️ 뒤로
              </button>
              <div className="grid w-full grid-cols-2 gap-4 px-6">
                {airports.map((airport) => (
                  <button
                    type="button"
                    key={airport.airportCode}
                    onClick={() => {
                      onSelect(selectedCity, airport.name, airport.airportCode);
                      onClose();
                    }}
                    className="w-full p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    {airport.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KoreaAirportModal;
