//제안서 디테일
import React, { createContext, useEffect, useState } from "react";
import { AgencyProposalDetail } from "../apis/agency";

const ProposalDetailContext = createContext();

export const ProposalDetailProvider = ({children, travelPlanId}) => {
  const [proposals, setProposals ] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProposalData = async() => {
      try {
        const data = await AgencyProposalDetail(travelPlanId);
        setProposals(data);

        if (data.users) {
          const count = data.users.reduce((sum, user) => sum + user.totalCount, 0);
          setTotalCount(count);
        }
      } catch(error) {
        console.log('error:', error);
      }
    };
    if (travelPlanId) {
      fetchProposalData();
    }
  },[travelPlanId]);

  return (
    <ProposalDetailContext.Provider value={{proposals,totalCount}}>
      {children}
    </ProposalDetailContext.Provider>
  );
};

export default ProposalDetailContext;