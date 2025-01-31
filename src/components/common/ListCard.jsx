// 목록에서 쓰이는 카드 틀 
// 공동 사항 => 사용자 리스트 페이지/ 여행사 리스트 페이지

import React from "react";

const ListCard = ({imageSrc,  trip_name, dataRange, location, min_people, max_people,proposal}) => {
  
  const onhandleDetail = () => {
    navigator(`/agencydetail/${proposal.id}`);
  }

  return(
    <div className="card p-10">
      <div className="flex bg-white rounded-lg border-2 overflow-hidden w-full mb-6">
        {/* 이미지 자동 생성 */}
        <img src= {imageSrc} alt= 'img' className=" w-1/3 object-cover rounded-lg" />

        {/* 카드 본문 */}
        <div className="flex flex-col p-4 w-2/3">
          <h2 className="font-bold leading-snug text-xl mb-2">title: {trip_name}</h2>

          <p className="text-sm text-gray-500 mb-1">총 인원: </p>
          <p className="text-sm text-gray-500 mb-1">여행날짜: {dataRange} </p>
          <p className="text-sm text-gray-500 mb-1">여행지: {location} </p>
          <p className="text-sm text-gray-500 mb-1">최소인원: {min_people} </p>
          <p className="text-sm text-gray-500 mb-1">최대인원: {max_people} </p>

          <button 
          onClick={onhandleDetail} 
          className="mt-auto ml-auto  bg-[#412B2B] text-white px-4 py-2 rounded-md text-sm"
          >
            자세히 보기→
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListCard;