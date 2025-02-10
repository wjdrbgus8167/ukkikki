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
      <div className="relative p-8 transition-all duration-300 transform scale-100 bg-white shadow-2xl rounded-xl w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          출발지 선택
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none"
        >
          ❌
        </button>

        {/* 1단계: 도시 선택 */}
        {!selectedCity ? (
          <div className="grid grid-cols-2 gap-4">
            {cities.map((city) => (
              <button
                key={city.cityId}
                onClick={() => setSelectedCity(city.cityId)}
                className="p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
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
              className="mb-4 text-blue-500 hover:underline"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-4">
              {airports.map((airport) => (
                <button
                  type="button"
                  key={airport.airportCode}
                  onClick={() => {
                    onSelect(selectedCity, airport.name, airport.airportCode);
                    onClose();
                  }}
                  className="p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {airport.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KoreaAirportModal;
