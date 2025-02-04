import React, { useState } from 'react';

const PlaceSelection = ({
  destinationCity,
  travelStart,
  travelEnd,
  placeList,
  onAddPlace,
}) => {
  const [isSortedByLikes, setIsSortedByLikes] = useState(false);

  // 정렬 상태에 따라 리스트 정렬 (좋아요 수 내림차순)
  const sortedPlaceList = isSortedByLikes
    ? [...placeList].sort((a, b) => b.likes - a.likes)
    : placeList;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{destinationCity}</h1>
      <h3 className="text-lg mb-4">
        {travelStart} ~ {travelEnd}
      </h3>
      <h2 className="text-xl font-bold mb-4">여행 장소 목록</h2>
      <button
        onClick={() => setIsSortedByLikes((prev) => !prev)}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isSortedByLikes ? '원래 순서' : '좋아요 순으로 정렬'}
      </button>
      <ul>
        {sortedPlaceList.map((place) => (
          <li key={place.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{place.name}</p>
              <p className="text-sm text-gray-600">{place.address}</p>
              <p className="text-sm text-gray-600">좋아요: {place.likes}</p>
            </div>
            <button
              onClick={() => onAddPlace(place)}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceSelection;
