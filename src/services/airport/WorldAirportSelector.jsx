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
        const response = await publicRequest.get('/geography/continents');
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
            `/geography/continents/${selectedContinent}/countries`,
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
            `/geography/continents/${selectedContinent}/countries/${selectedCountry}/cities`,
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
    if (selectedCity) {
      const filteredAirports =
        cities.find((city) => city.cityId === selectedCity)?.airports || [];
      setAirports(filteredAirports);
    } else {
      setAirports([]);
    }
  }, [selectedCity, cities]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        도착 도시
      </label>
      <select
        value={selectedAirport}
        onChange={(e) => {
          const value = e.target.value;
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
            onChange(value);
          }
        }}
        className="w-full px-4 py-2 bg-transparent border text-white placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:bg-dark-green"
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
              key={`airport-${airport.airport_code}`}
              value={airport.airport_code}
            >
              ─ ─ ─ {airport.airport_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default WorldAirportSelector;
