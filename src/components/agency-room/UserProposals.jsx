import React,{ useContext} from "react";
import TravelPlanContext from "../../contexts/TravelPlanContext";
import ListCard from "../common/ListCard";


const UserProposals = () => {

  const {proposals, loading, error } = useContext(TravelPlanContext);

  if(loading) {
    return <div> 로딩 스피너 위치 </div>
  }
  if (error) {
    return <div> {error} </div>
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
