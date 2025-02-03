import React from 'react';

const KoreaAirportSelector = ({ selectedAirport, onChange }) => {
  // ✅ 하드코딩된 한국 출발 도시 목록
  const koreaAirports = [
    { code: 'ICN', name: '인천국제공항' },
    { code: 'GMP', name: '김포국제공항' },
    { code: 'PUS', name: '김해국제공항' },
    { code: 'CJU', name: '제주국제공항' },
    { code: 'TAE', name: '대구국제공항' },
    { code: 'KWJ', name: '광주공항' },
    { code: 'USN', name: '울산공항' },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        출발 도시
      </label>

      <select
        value={selectedAirport}
        onChange={onChange}
        className="w-full px-4 py-2 bg-transparent border text-white placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:bg-dark-green"
      >
        <option value="">출발 공항 선택</option>
        {koreaAirports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default KoreaAirportSelector;
