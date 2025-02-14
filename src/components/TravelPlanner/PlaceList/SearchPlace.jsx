// src/placeList/SearchPlace.jsx
import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const SearchPlace = ({ 
  isLoaded, 
  autocompleteRef, 
  onPlaceChanged, 
  searchedPlace,
  onSelectPlace, 
}) => {
  return (
    <>
      <div>
        <h2>장소 검색</h2>
        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input type="text" placeholder="장소를 입력해주세요" />
          </Autocomplete>
        ) : (
          <p>지도 로딩중...</p>
        )}
      </div>

      {searchedPlace && (
        <div className="mt-4 p-3 border rounded-lg shadow flex items-center">
          {searchedPlace.photoUrl ? (
            <img
              src={searchedPlace.photoUrl}
              alt={searchedPlace.name}
              className="w-24 h-24 object-cover aspect-square mr-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-sm text-gray-600">No Image</span>
            </div>
          )}

          <div>
            <p className="font-semibold">{searchedPlace.name}</p>
            <p className="text-sm text-gray-600">{searchedPlace.address}</p>
            {searchedPlace.rating && (
              <p className="text-sm text-gray-600">
                평점: ★ {searchedPlace.rating}
              </p>
            )}
          </div>
          <button onClick={() => 
            onSelectPlace({
              id: searchedPlace.id,
              name: searchedPlace.name,
              latitude: searchedPlace.latitude,
              longitude: searchedPlace.longitude,
              photoUrl: searchedPlace.photoUrl,

            })}>
            ✔️
          </button>
        </div>
      )}
    </>
  );
};

export default SearchPlace;
