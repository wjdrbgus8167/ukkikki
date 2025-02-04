// 장소 선택 및 등록 하는 컴포넌트 인데 (작성중)

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UserWishPlaces from "./place-list/UserWishPlaces";

const TravelPlan = () => {
  
  const [showWishlist, setShowWishlist] = useState(false);
  const [showGooglePlace, setsShowGooglePlace] = useState(false);

  //클릭 시 사용자 위시 리스트 
  const handleWishlistClick = () => {
    setShowWishlist(!showWishlist);
  };

  const handleGooglePlaceClick= () => {
    setsShowGooglePlace(!showGooglePlace);
  };
  
  return (
    <div>
      <h1 className="travel-country text-lg mt-4 mb-2">영국(스코틀랜드)</h1>
      <p className="travel-dates text-x text-gray-600 mb-2">2025.03.10 ~ 2025.03.20</p>
      <SearchBar />
      <div className="btn mt-2">
        <button 
        onClick={handleWishlistClick}
        className="user-wishlist border-2 rounded-md border-gray-300 mx-1"
        >
          우랑이 pick!
        </button>

        <button 
        onClick={handleGooglePlaceClick}
        className='Google-place border-2 rounded-md border-gray-300'
        >
          구글 추천
        </button>


        {showWishlist && <UserWishPlaces />}
      </div>
      
      
    </div>
  );
};
export default TravelPlan;