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
            <input
              type="text"
              placeholder="장소를 입력해주세요"
              className="w-full p-2 border rounded"
            />
          </Autocomplete>
        ) : (
          <p>지도 로딩중...</p>
        )}
      </div>

      {searchedPlace && (
        <div className="flex items-center p-3 mt-4 border rounded-lg shadow">
          {searchedPlace.photoUrl ? (
            <img
              src={searchedPlace.photoUrl}
              alt={searchedPlace.name}
              className="object-cover w-24 h-24 mr-4 aspect-square"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 mr-4 bg-gray-200">
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
          <button
            onClick={() =>
              onSelectPlace({
                scheduleName: searchedPlace.name,
                latitude: searchedPlace.latitude,
                longitude: searchedPlace.longitude,
                imageUrl: searchedPlace.photoUrl,
              })
            }
          >
            ✔️
          </button>
        </div>
      )}
    </>
  );
};

export default SearchPlace;
