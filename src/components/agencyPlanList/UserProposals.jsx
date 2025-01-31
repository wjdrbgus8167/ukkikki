// 사용자가 제안한 제안 목록

import React,{ useContext} from "react";
import TravelPlanContext from "../../contexts/TravelPlanContext";
import ListCard from "../common/ListCard";


const UserProposals = () => {

  const {proposals, error } = useContext(TravelPlanContext);

  if (error) {
    return <div> {error} </div>
  }
  if (proposals.length === 0) {
    return <div>여행 제안서가 없습니다</div>
  } 

  return(
    <div className="flex flex-col gap-6">
      { proposals.map((proposal) => (
          <ListCard 
          key = {proposal.id}
          trip_name = {proposal.trip_name}
          />

        ))}
    </div>
  )
};

export default UserProposals;
