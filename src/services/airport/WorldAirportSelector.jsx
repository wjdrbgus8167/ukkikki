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
        setContinents(response.data);
      } catch (error) {
        console.error('대륙 데이터를 불러오는 중 오류 발생:', error);
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
          setCountries(response.data);
        } catch (error) {
          console.error('나라 데이터를 불러오는 중 오류 발생:', error);
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
            `/categories/continents/${selectedContinent}/countries/${selectedCountry}/cities`,
          );
          setCities(response.data);
        } catch (error) {
          console.error('도시 데이터를 불러오는 중 오류 발생:', error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
      setAirports([]);
    }
  }, [selectedCountry]);

  // 선택된 도시에 따라 공항 데이터 필터링
  useEffect(() => {
    if (selectedCity) {
      const filteredAirports =
        cities.find((city) => city.city_id === selectedCity)?.airports || [];
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
        {continents.map((continent) => (
          <option
            key={continent.continent_id}
            value={`continent-${continent.continent_id}`}
          >
            {continent.continent_name}
          </option>
        ))}
        {countries.map((country) => (
          <option
            key={country.country_id}
            value={`country-${country.country_id}`}
          >
            ─ {country.country_name}
          </option>
        ))}
        {cities.map((city) => (
          <option key={city.city_id} value={`city-${city.city_id}`}>
            ─ ─ {city.city_name}
          </option>
        ))}
        {airports.map((airport) => (
          <option key={airport.airport_code} value={airport.airport_code}>
            ─ ─ ─ {airport.airport_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorldAirportSelector;
