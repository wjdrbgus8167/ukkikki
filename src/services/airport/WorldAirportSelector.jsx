import React, { useState, useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const WorldAirportModal = ({ isOpen, onClose, onSelect }) => {
  const [step, setStep] = useState(1);
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);

  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await publicRequest.get(
          '/api/v1/geography/continents',
        );
        setContinents(response.data.data || []);
      } catch (error) {
        console.error('🚨 대륙 데이터 오류:', error);
      }
    };
    fetchContinents();
  }, []);

  useEffect(() => {
    if (!selectedContinent) return;
    const fetchCountries = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/${selectedContinent}/countries`,
        );
        setCountries(response.data.data || []);
      } catch (error) {
        console.error('🚨 나라 데이터 오류:', error);
      }
    };
    fetchCountries();
  }, [selectedContinent]);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCities = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities`,
        );
        setCities(response.data.data || []);
      } catch (error) {
        console.error('🚨 도시 데이터 오류:', error);
      }
    };
    fetchCities();
  }, [selectedCountry, selectedContinent]);

  useEffect(() => {
    if (!selectedCity) return;
    const fetchAirports = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities/${selectedCity}`,
        );
        // 각 공항 객체에 selectedCity를 cityId로 추가 (원하는 경우)
        const airportsData = (response.data.data || []).map((airport) => ({
          ...airport,
          cityId: selectedCity,
        }));
        setAirports(airportsData);
        if (airportsData.length > 0) {
          console.log('✅ 공항 데이터 로드 완료:', airportsData);
        } else {
          console.error(
            '🚨 Unexpected data format for airports:',
            response.data,
          );
        }
      } catch (error) {
        console.error('🚨 공항 데이터를 불러오는 중 오류 발생:', error);
        setAirports([]);
      }
    };
    fetchAirports();
  }, [selectedCity, selectedContinent, selectedCountry]);

  const handleSelectAirport = (airport) => {
    console.log('🚀 선택된 공항 데이터:', airport);
    if (!airport || !airport.cityId) {
      console.error('🚨 선택된 공항의 cityId가 없음:', airport);
      return;
    }
    // onSelect에 airport.cityId, airport.name, airport.airportCode 전달
    onSelect(airport.cityId, airport.name, airport.airportCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="relative p-6 bg-white rounded-md w-96">
        <h2 className="mb-4 text-xl font-bold">도착지 선택</h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3"
        >
          ❌
        </button>

        {step === 1 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">대륙 선택</h3>
            <div className="grid grid-cols-2 gap-2">
              {continents.map((continent) => (
                <button
                  type="button"
                  key={continent.continentId}
                  onClick={() => {
                    setSelectedContinent(continent.continentId);
                    setStep(2);
                  }}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  {continent.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">나라 선택</h3>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-2 text-blue-500"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {countries.map((country) => (
                <button
                  type="button"
                  key={country.countryId}
                  onClick={() => {
                    setSelectedCountry(country.countryId);
                    setStep(3);
                  }}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  {country.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">도시 선택</h3>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mb-2 text-blue-500"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <button
                  type="button"
                  key={city.cityId}
                  onClick={() => {
                    setSelectedCity(city.cityId);
                    setStep(4);
                  }}
                  className="p-2 bg-gray-200 rounded-md"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">공항 선택</h3>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="mb-2 text-blue-500"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {airports.map((airport) => (
                <button
                  type="button"
                  key={airport.airportCode}
                  onClick={() => handleSelectAirport(airport)}
                  className="p-2 bg-gray-200 rounded-md"
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

export default WorldAirportModal;
