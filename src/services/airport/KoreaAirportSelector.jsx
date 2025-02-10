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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-md w-96">
        <h2 className="mb-4 text-xl font-bold">출발지 선택</h2>
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3"
        >
          ❌
        </button>

        {/* 도시 선택 */}
        {!selectedCity ? (
          <div className="grid grid-cols-2 gap-2">
            {cities.map((city) => (
              <button
                key={city.cityId}
                onClick={() => setSelectedCity(city.cityId)}
                className="p-2 bg-gray-200 rounded-md"
              >
                {city.name}
              </button>
            ))}
          </div>
        ) : (
          // 공항 선택
          <div className="grid grid-cols-2 gap-2">
            {airports.map((airport) => (
              <button
                key={airport.airportCode}
                onClick={() => onSelect(selectedCity, airport.name)}
                className="p-2 bg-gray-200 rounded-md"
              >
                {airport.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KoreaAirportModal;
