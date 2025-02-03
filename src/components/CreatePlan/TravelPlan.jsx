// 장소 선택 및 등록 하는 컴포넌트 인데 (작성중)

import React from "react";
import SearchBar from "./SearchBar";

const TravelPlan = () => {
  return (
    <div>
      <h1>여행지: ex) 일본</h1>
      <p>여행 일자: ex) 2025.03.18 ~ 2025.03.24</p>
      <SearchBar />
      <button className="border-2 ">우랑이 pick!</button>
      <ul>
        <li>목록 리스트1</li>
        <li>목록 리스트2</li>
      </ul>
    </div>
  );
};
export default TravelPlan;