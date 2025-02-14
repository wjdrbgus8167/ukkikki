// src/placeList/SuggestedPlaceList.jsx
import React, { useState } from 'react';
import { 
    StylePlaceList, 
    StylePlaceContent,
} from './style/SuggestedPlaceListStyle';

const SuggestedPlaceList = ({ places, onSelectPlace, onSelectDay }) => {
  
  const [selectedMap, setSelectedMap] = useState({});

  const handleClick = (place) => {
    onSelectPlace(place);
    setSelectedMap(prev => ({ ...prev, [place.id]: true }));
  };

  return (
      <div>
        {places.map((place, index) => (
          <StylePlaceList key={place.id || index}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {place.photoUrl ? (
                  <img 
                    src={place.photoUrl} 
                    alt={place.name} 
                    className="w-20 h-20 object-cover aspect-square mr-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-sm text-gray-600">No image</span>
                  </div>
                )}
                <StylePlaceContent>
                  <p className="font-semibold">{place.name}</p>
                  <p className="text-sm text-gray-600">{place.address}</p>
                  <p className="text-sm text-gray-600">좋아요 👍: {place.likeCount}</p>
                </StylePlaceContent>

                  <button onClick={() => 
                    handleClick({
                      scheduleName: place.name,
                      latitude: place.latitude,
                      longitude: place.longitude,
                      imageUrl: place.photoUrl,
        
                    })}
                    >
                    {selectedMap[place.id] ? onSelectDay : '✔️'}
                  </button>

              </div>    
            </div>
          </StylePlaceList>
        ))}
      </div>

  );
};

export default SuggestedPlaceList;
