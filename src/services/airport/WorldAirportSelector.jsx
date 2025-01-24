import React from 'react';

const WorldAirportSelector = ({ worldAirports, selectedAirport, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">도착 공항</label>
      <select
        value={selectedAirport}
        onChange={onChange}
        className="w-full px-4 py-2 bg-transparent border text-white placeholder-white border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">도착 공항 선택</option>
        {worldAirports.map((airport) => (
          <option key={airport} value={airport}>
            {airport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorldAirportSelector;
