//제안서 디테일(계획)

import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/proposalDetailContext";

const ProposalContent = () => {
  const { proposal, totalCount } = useContext(ProposalDetailContext);

  if(!proposal) {
    return <div>제안서 불러오는 중,,</div>
  }

  return (
    <div className="container">
      <div className="travel-plan">
        <h2 className="travel-title"> 여행타이틀: {proposal.data.travelPlan.name}</h2>
        <p>출발: {proposal.travelPlan.departureCityName}</p>
        <p>도착: {proposal.travelPlan.arrivalCityName}</p>
        <p>여행 예상 날짜: {proposal.travelPlan.startDate} ~ {proposal.data.travelPlan.endDate}</p>
        <p>테마:{proposal.travelPlan.keyword.join(",")}</p>
        <p>총 참여인원: {totalCount}</p>
        <p>내용: </p>
      </div>

      <div className="message">
        <h3>메세지</h3>
        <ul>
          {proposal.messages.map((message, index) => (
            <li key={index}>
              <p>{message.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProposalContent;