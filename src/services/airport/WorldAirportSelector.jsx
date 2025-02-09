import React, { useState, useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const WorldAirportSelector = ({ selectedAirport, onChange }) => {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);

  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // 대륙 데이터 가져오기
  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await publicRequest.get(
          '/api/v1/geography/continents',
        );
        const data = response.data.data;
        if (Array.isArray(data)) {
          setContinents(data);
        } else {
          console.error('Unexpected data format for continents:', data);
          setContinents([]);
        }
      } catch (error) {
        console.error('대륙 데이터를 불러오는 중 오류 발생:', error);
        setContinents([]);
      }
    };
    fetchContinents();
  }, []);

  // 선택된 대륙에 따라 나라 데이터 가져오기
  useEffect(() => {
    if (selectedContinent) {
      const fetchCountries = async () => {
        try {
          const response = await publicRequest.get(
            `/api/v1/geography/continents/${selectedContinent}/countries`,
          );
          const data = response.data.data;
          if (Array.isArray(data)) {
            setCountries(data);
          } else {
            console.error(
              'Unexpected data format for countries:',
              response.data,
            );
            setCountries([]);
          }
        } catch (error) {
          console.error('나라 데이터를 불러오는 중 오류 발생:', error);
          setCountries([]);
        }
      };
      fetchCountries();
    } else {
      setCountries([]);
      setCities([]);
      setAirports([]);
    }
  }, [selectedContinent]);

  // 선택된 나라에 따라 도시 데이터 가져오기
  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const response = await publicRequest.get(
            `/api/v1/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities`,
          );
          const data = response.data.data;
          if (Array.isArray(data)) {
            setCities(data);
          } else {
            console.error('Unexpected data format for cities:', response.data);
            setCities([]);
          }
        } catch (error) {
          console.error('도시 데이터를 불러오는 중 오류 발생:', error);
          setCities([]);
        }
      };
      fetchCities();
    } else {
      setCities([]);
      setAirports([]);
    }
  }, [selectedCountry, selectedContinent]);

  // 선택된 도시에 따라 공항 데이터 필터링
  useEffect(() => {
    const fetchAirports = async () => {
      if (!selectedCity) {
        setAirports([]); // ✅ 도시가 선택되지 않으면 공항 목록 초기화
        return;
      }

      try {
        const response = await publicRequest.get(
          `/api/v1/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities/${selectedCity}`,
        );

        console.log('📌 전체 API 응답:', response); // ✅ 응답 확인
        console.log('📌 응답 데이터:', response.data); // ✅ 응답 데이터 확인

        // ✅ 응답 데이터에서 `data`가 존재하고 배열인지 확인 후 `setAirports` 설정
        const data =
          response.data && Array.isArray(response.data.data)
            ? response.data.data
            : [];

        if (data.length > 0) {
          setAirports(data);
          console.log('✅ 공항 데이터 로드 완료:', data);
        } else {
          console.error(
            '🚨 Unexpected data format for airports:',
            response.data,
          );
          setAirports([]);
        }
      } catch (error) {
        console.error('🚨 공항 데이터를 불러오는 중 오류 발생:', error);
        console.error(
          '📌 서버 응답:',
          error.response ? error.response.data : '응답 없음',
        );
        setAirports([]);
      }
    };

    fetchAirports();
  }, [selectedCity, selectedContinent, selectedCountry]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        도착 도시
      </label>
      <select
        value={selectedAirport}
        onChange={(event) => {
          const rawValue = event?.target?.value ?? ''; // ✅ `undefined` 방지
          if (!rawValue) return;

          const value = rawValue.replace(/^[-\s]+/, ''); // ✅ 앞쪽 `---` 제거

          if (value.startsWith('continent-')) {
            setSelectedContinent(value.replace('continent-', ''));
            setSelectedCountry('');
            setSelectedCity('');
            setAirports([]);
          } else if (value.startsWith('country-')) {
            setSelectedCountry(value.replace('country-', ''));
            setSelectedCity('');
            setAirports([]);
          } else if (value.startsWith('city-')) {
            setSelectedCity(value.replace('city-', ''));
            setAirports([]);
          } else {
            // ✅ 선택한 공항 정보 가져오기
            const selectedAirportData = airports.find(
              (airport) => airport.airportCode === value,
            );

            console.log('🚀 선택된 공항 데이터:', selectedAirportData);

            if (typeof onChange === 'function') {
              // ✅ 부모에게 `airportCode` 전달 (이전: `airportId`)
              onChange(
                selectedAirportData ? selectedAirportData.airportCode : value,
              );
            }
          }
        }}
        className="w-full px-4 py-2 text-white placeholder-white bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:bg-dark-green"
      >
        <option value="">도착 공항 선택</option>
        {Array.isArray(continents) &&
          continents.map((continent) => (
            <option
              key={`continent-${continent.continentId}`}
              value={`continent-${continent.continentId}`}
            >
              {continent.name}
            </option>
          ))}
        {Array.isArray(countries) &&
          countries.map((country) => (
            <option
              key={`country-${country.countryId}`}
              value={`country-${country.countryId}`}
            >
              ─ {country.name}
            </option>
          ))}
        {Array.isArray(cities) &&
          cities.map((city) => (
            <option key={`city-${city.cityId}`} value={`city-${city.cityId}`}>
              ─ ─ {city.name}
            </option>
          ))}
        {Array.isArray(airports) &&
          airports.map((airport) => (
            <option
              key={`airport-${airport.airportCode || 'unknown'}`} // ✅ 키가 `undefined` 방지
              value={airport.airportCode ?? ''} // ✅ `undefined` 방지
            >
              {airport.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default WorldAirportSelector;
