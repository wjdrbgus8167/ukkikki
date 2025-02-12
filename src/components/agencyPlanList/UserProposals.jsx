import React, { useContext } from "react";
import TravelPlanContext from "../../contexts/travelPlanContext";
import ListCard from "../common/ListCard";

const UserProposals = () => {
  const { proposals, error } = useContext(TravelPlanContext);
  console.log(proposals);

  if (error) {
    return <div>{error}</div>;
  }
  if (!proposals || proposals.length === 0) {
    return <div>여행 제안서가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {proposals.map((proposal) => (
        <ListCard 
          key={proposal.travelPlanId}
          trip_name={proposal.name}
          start_date={proposal.startDate} // dataRange 대신 start_date로 통일
          location={proposal.departureCityId}
          min_people={proposal.minPeople}
          max_people={proposal.maxPeople}
          proposal={proposal}
          navigateType="agency"  // agency-detail 경로로 이동
        />
      ))}
    </div>
  );
};

export default UserProposals;
