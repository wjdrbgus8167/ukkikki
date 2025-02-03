import React from 'react';

const WorldAirportSelector = ({ selectedAirport, onChange }) => {
  // ✅ 하드코딩된 세계 도착 도시 목록
  const worldAirports = [
    { code: 'NRT', name: '도쿄 나리타공항' },
    { code: 'HND', name: '도쿄 하네다공항' },
    { code: 'LAX', name: '로스앤젤레스 국제공항' },
    { code: 'JFK', name: '뉴욕 JFK공항' },
    { code: 'SIN', name: '싱가포르 창이공항' },
    { code: 'BKK', name: '방콕 수완나품공항' },
    { code: 'CDG', name: '파리 샤를드골공항' },
    { code: 'LHR', name: '런던 히드로공항' },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        도착 도시
      </label>
      <select
        value={selectedAirport}
        onChange={onChange}
        className="w-full px-4 py-2 bg-transparent border text-white placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:bg-dark-green"
      >
        <option value="">도착 공항 선택</option>
        {worldAirports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorldAirportSelector;
