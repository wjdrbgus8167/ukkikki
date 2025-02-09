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
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCity) return;
    const fetchAirports = async () => {
      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities/${selectedCity}`,
        );
        setAirports(response.data.data || []);
      } catch (error) {
        console.error('🚨 공항 데이터 오류:', error);
      }
    };
    fetchAirports();
  }, [selectedCity]);

  const handleSelectAirport = (airport) => {
    console.log('🚀 선택된 공항 데이터:', airport); // ✅ 확인용 로그
    if (!airport || !airport.cityId) {
      console.error('🚨 선택된 공항의 cityId가 없음:', airport);
      return;
    }
    onSelect(airport.cityId, airport.name); // ✅ 부모 컴포넌트에 cityId & 공항명 전달
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-md w-96">
        <h2 className="mb-4 text-xl font-bold">도착지 선택</h2>

        {step === 1 && (
          <>
            <h3 className="mb-2 text-lg font-semibold">대륙 선택</h3>
            <div className="grid grid-cols-2 gap-2">
              {continents.map((continent) => (
                <button
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
            <button onClick={() => setStep(1)} className="mb-2 text-blue-500">
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {countries.map((country) => (
                <button
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
            <button onClick={() => setStep(2)} className="mb-2 text-blue-500">
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <button
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
            <button onClick={() => setStep(3)} className="mb-2 text-blue-500">
              ⬅️ 뒤로
            </button>
            <div className="grid grid-cols-2 gap-2">
              {airports.map((airport) => (
                <button
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
