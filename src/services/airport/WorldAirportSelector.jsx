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
    onSelect(airport.cityId, airport.name, airport.airportCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="p-8 w-[400px] h-[450px] transition-all duration-300 transform scale-100 bg-white shadow-2xl rounded-xl w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          도착지 선택
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/154/154616.png"
            className="w-6"
            alt="닫기"
          />
        </button>

        {step === 1 && (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              대륙 선택
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {continents.map((continent) => (
                <button
                  type="button"
                  key={continent.continentId}
                  onClick={() => {
                    setSelectedContinent(continent.continentId);
                    setStep(2);
                  }}
                  className="p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {continent.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              나라 선택
            </h3>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-4 font-bold text-blue-500 text-dark-green hover:underline"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-4">
              {countries.map((country) => (
                <button
                  type="button"
                  key={country.countryId}
                  onClick={() => {
                    setSelectedCountry(country.countryId);
                    setStep(3);
                  }}
                  className="p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {country.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              도시 선택
            </h3>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mb-4 text-blue-500 hover:underline"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-4">
              {cities.map((city) => (
                <button
                  type="button"
                  key={city.cityId}
                  onClick={() => {
                    setSelectedCity(city.cityId);
                    setStep(4);
                  }}
                  className="p-3 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              공항 선택
            </h3>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="mb-4 text-blue-500 hover:underline"
            >
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-4">
              {airports.map((airport) => (
                <button
                  type="button"
                  key={airport.airportCode}
                  onClick={() => handleSelectAirport(airport)}
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

export default WorldAirportModal;
